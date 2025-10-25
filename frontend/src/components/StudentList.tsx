import { useEffect, useState } from "react"
import { sockets } from "../sockets/ws"

export default function StudentList(){
    const [socket,setSocket] = useState<WebSocket>();
    const [names,setNames] = useState();
    useEffect(()=>{
            setSocket(sockets);
            console.log("socket connected");
    },[])

    if(!socket) return;
    socket.onmessage = (data:any) =>{
        const datax : any= JSON.parse(data.data);
        if(datax.type === "student-joined"){
            const name = datax.name;
            // setNames((prev)=>[...prev,name]);
            setNames(name);
            console.log(`${name} joined the quiz session.`);
        }
        


        
    }
return <div>
    {names ? <> <h1>{names} Joined The Quiz....</h1></> : ""}
    </div>
}