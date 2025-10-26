import { WebSocket,WebSocketServer } from "ws";

const wss = new WebSocketServer({ port : 8080 });

interface Student {
    id : string;
    name : string;
    socket : WebSocket;
}

interface Session {
    teacherSocket : WebSocket | null ;
    students : Student[];
    correctOption : number | null;
    responses : {id : string; name : string; option : number; time : number}[];
}

const sessions : Record<string,Session> | any= {};

const BROADCAST_TO_STUDENTS  = (sessionId : string, payload : any) =>{
    const session = sessions[sessionId];
    if(!session) return;

    session?.students?.forEach((student: Student , )=> {
        if(student.socket.readyState === WebSocket.OPEN){
            student.socket.send(JSON.stringify({payload}));
        }
    });
}
wss.on('connection',(ws : WebSocket)=>{
    ws.on('error',console.error);
    
    ws.on('message',function Message(data:any,isBinary){
        wss.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN){
                console.log(data);
                const msg = JSON.parse(data);
                console.log("Message : ",msg);

                if(msg.role === "teacher"){
                    const {roomId,name} = msg;

                    sessions[roomId] = {
                        teacherSocket : ws,
                        students : [],
                        correctOption : null,
                        responses : []


                    }
                    ws.send(JSON.stringify({ type: "welcome", message: "Teacher Connected!" }));
                return;
                } 
                
                if(msg.type === "joinSession"){

                    const {roomId,uucms,name} = msg;
                    let session =  sessions[roomId];
                    if(!session){
                        return ws.send(JSON.stringify({ error : "session not exists!"}));
                    }
                    session.students.push({ id : uucms, name : name, socket : ws});

                    session.teacherSocket.send(JSON.stringify({ type : "student-joined",name , id : uucms}));
                    return;
                   
                }
                
                
                // teacher sends question to students
                if(msg.type === "createQuiz"){
                    const {question, roomId , options , correctOption} = msg;
                    const session = sessions[roomId];
                    if(!session){
                        return ws.send(JSON.stringify({ error : "session not exists!"}));
                    }

                    session.correctOption = correctOption;
                    session.responses = []

                    BROADCAST_TO_STUDENTS(roomId , {
                        type : "question",
                        question,
                        options
                    })

                    return;
                }

                if(msg.type === "submitAnswer"){
                    const {roomId, uucms,name,selectedOption,time} = msg;
                    const session = sessions[roomId];
                    if(!session) return;
                    const existRecord = session.responses.find((r:any)=>r.id === uucms);
                    console.log("Exist Record : ",existRecord);
                    if(!existRecord){
                        session.responses.push({ id : uucms, name : name, option : selectedOption, time : time});
                    }

                    ws.send(JSON.stringify({ msg : "answer submitted successfully"}))
                }





                if(msg.type === "finalResult"){
                    const { roomId } = msg;
                    const session = sessions[roomId];
                    if(!session) return;
                   console.log("ALL SESSIONS",session.responses);
                console.log('correctOPtion',session.correctOption);
        const x = session.responses.filter((d:any)=>d.option === session.correctOption);
        console.log("filter",x);
        const ranked = x.sort((a:any,b:any)=>a.time-b.time);
        console.log("sor",ranked);


                    console.log("top3 ::::",ranked.slice(0,3));
                    
                        session.teacherSocket?.send(JSON.stringify({
                type: "result",
                top3 : ranked.slice(0,3),
            }));

            return;
                }
                
            }
        })
    });

    

    ws.send("Hello from Socket Server..!");

})