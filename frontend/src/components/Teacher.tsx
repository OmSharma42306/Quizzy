import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { sockets } from "../sockets/ws";

export default function Teacher(){
    const [socket,setSocket] = useState<WebSocket>();
    useEffect(()=>{
        setSocket(sockets);
        console.log("socket connected....!");
    },[])
    const navigate = useNavigate();
    const [teacherName,setTeachername] = useState<string>('');
    const [roomId,setRoomId] = useState<string>('');

    function handleTeacherRoom(){
        socket?.send(JSON.stringify({ 
            "role" : "teacher",
            "roomId" : roomId,
            "name" : teacherName
        }));
        navigate('/teacherDashboard',{state : roomId,});
    }
    return <div>
        <h1>Enter Teacher Name : </h1>
        <br />
        <input type="text" onChange={(e)=>{setTeachername(e.target.value)}} />
        <br />
        <h1>Enter Room Name : </h1>
        <br />
        <input type="text" onChange={(e)=>{setRoomId(e.target.value)}}/>
        <br />
       
       <button onClick={handleTeacherRoom}> Create Room</button>
    </div>
}