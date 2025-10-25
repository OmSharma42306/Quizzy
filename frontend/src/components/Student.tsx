import { useEffect, useState } from "react"
import { sockets } from "../sockets/ws"
import { Navigate, useNavigate } from "react-router-dom";
export default function Student(){
    const [socket,setSocket] = useState<WebSocket>();
    const navigate = useNavigate();
    const [uucmsNo,setUUCMSNo] = useState('');
    const[studentName,setStudentName] = useState('');
    const [roomId,setRoomId] = useState('');

    useEffect(()=>{
        setSocket(sockets);
    },[])

    function handleJoinQuiz(){
        socket?.send(JSON.stringify({
            "type": "joinSession",
            "roomId": roomId,
            "uucms": uucmsNo,
            "name": studentName
        }));

        

    }

    return <div>
        <h1>Enter UUCMS No : </h1>
        <br />
        <input type="text" onChange={(e)=>{setUUCMSNo(e.target.value)}} />
        <br />
        <h1>Enter Student Name : </h1>
        <br />
        <input type="text" onChange={(e)=>{setStudentName(e.target.value)}} />
        <br />
        <h1>Enter Room Name : </h1>
        <br />
        <input type="text"  onChange={(e)=>{setRoomId(e.target.value)}}/>
        <br />
        <button onClick={handleJoinQuiz}>Join Room</button>

    </div>
}