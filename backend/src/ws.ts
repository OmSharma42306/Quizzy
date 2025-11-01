import http from "http";
import { WebSocket, WebSocketServer } from "ws";

const server = http.createServer((req,res)=>{
  res.writeHead(200,{ "Content-Type": "text/plain" });
  res.end("WebSocket Server Running...")
});

const wss = new WebSocketServer({ server });

server.listen(8080, () => console.log("Server running on 8080"));

interface Student {
  id: string;
  name: string;
  socket: WebSocket;
}

interface Session {
  teacherSocket: WebSocket | null;
  students: Student[];
  correctOption: number | null;
  responses: { id: string; name: string; option: number; time: number }[];
}

const sessions: Record<string, Session> | any = {};

const BROADCAST_TO_STUDENTS = (sessionId: string, payload: any) => {
  const session = sessions[sessionId];
  if (!session) return;

  session?.students?.forEach((student: Student) => {
    if (student.socket.readyState === WebSocket.OPEN) {
      student.socket.send(JSON.stringify({ payload }));
    }
  });
};


wss.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", function Message(data: any, isBinary) {
    const msg = JSON.parse(data);
    console.log("Message : ", msg);

    if (msg.role === "teacher") {
      const { roomId } = msg;

      sessions[roomId] = {
        teacherSocket: ws,
        students: [],
        correctOption: null,
        responses: [],
      };
      ws.send(
        JSON.stringify({ type: "welcome", message: "Teacher Connected!" })
      );
      return;
    }

    if (msg.type === "joinSession") {
      const { roomId, uucms, name } = msg;
      let session = sessions[roomId];
      if (!session) {
        return ws.send(JSON.stringify({ error: "session not exists!" }));
      }
      
      session.students.push({ id: uucms, name: name, socket: ws });

      session.teacherSocket.send(
        JSON.stringify({ type: "student-joined", name, id: uucms })
      );
      return;
    }

    // teacher sends question to students
    if (msg.type === "createQuiz") {
      const { question, roomId, options, correctOption } = msg;
      const session = sessions[roomId];
      if (!session) {
        return ws.send(JSON.stringify({ error: "session not exists!" }));
      }

      session.correctOption = correctOption;
      session.responses = [];

      BROADCAST_TO_STUDENTS(roomId, {
        type: "question",
        question,
        options,
      });

      return;
    }

    if (msg.type === "submitAnswer") {
      const { roomId, uucms, name, selectedOption, time } = msg;
      const session = sessions[roomId];
      if (!session) return;
      const existRecord = session.responses.find((r: any) => r.id === uucms);
      console.log("Exist Record : ", existRecord);
      if (!existRecord) {
        session.responses.push({
          id: uucms,
          name: name,
          option: selectedOption,
          time: time,
        });
      }

      ws.send(JSON.stringify({ msg: "answer submitted successfully" }));
    }

    if (msg.type === "finalResult") {
      const { roomId } = msg;
      const session = sessions[roomId];
      if (!session) return;
      console.log("ALL SESSIONS", session.responses);
      console.log("correctOPtion", session.correctOption);
    
      // / ✅ Modify time based on correctness + Sort by name
      const fullList = session.responses
        .map((r: any) => {
          if (r.option === session.correctOption) {
            return { ...r, time: parseFloat(r.time) }; // keep correct response time
          }
          return { ...r, time: 0 }; // wrong → time becomes 0
        })
        .sort((a: any, b: any) => a.name.localeCompare(b.name)); // ✅ alphabetical ordering

      console.log("STUDENT RESULTS ✅", fullList);
      session.teacherSocket?.send(
        JSON.stringify({
          type: "result",
          students: fullList,
        })
      );

      return;
    }
  });

  ws.on("close", () => {
    for (const [roomId, session] of Object.entries(sessions)) {
      const typedSession = session as Session; // TS safety for Object.entries()
      // if student
      typedSession.students = typedSession.students.filter((s) => {
        return s.socket !== ws;
      });

      // if teacher
      if (typedSession.teacherSocket === ws) {
        console.log(`🧹 Teacher left — removing room: ${roomId}`);

        typedSession.students.forEach((student: any) => {
          if (student.socket.readyState === WebSocket.OPEN) {
            student.socket.send(
              JSON.stringify({
                type: "session-ended",
                message: "Teacher left the Room!",
              })
            );
            student.socket.close();
          }
        });

        delete sessions[roomId];
        break;
      }
    }
  });
});