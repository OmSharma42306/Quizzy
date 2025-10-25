import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import { sockets } from "../sockets/ws";
import StudentList from "../components/StudentList"


export default function TeacherDashboard(){
  const location = useLocation();
  const roomId = location.state;
  const [socket,setSocket] = useState<WebSocket>();
  
  const [question,setQuestion] = useState('');
  const [option1,setOption1] = useState('');
  const [option2,setOption2] = useState('');
  const [option3,setOption3] = useState('');
  const [option4,setOption4] = useState('');
  const [correctOption,setCorrectOption] = useState('');
  
  useEffect(()=>{
setSocket(sockets);
  },[])
  

  useEffect(()=>{
    // const socket = new WebSocket('ws://localhost:8080');
    if(!socket)   return;
    socket.onopen = () =>{
      console.log("socket connecting..")
      setSocket(sockets);
      console.log("socket connected..")
    }

    // socket?.send(JSON.stringify({msg : "Socket Connected to Server!"}));
  },[]);
  
  
  if(!socket) return;
  
  if(socket){
    socket.onmessage = (data : any) =>{
    
     
      }
  }

   
    function handleCreateQuiz(){
          socket?.send(JSON.stringify({               
  "type": "createQuiz",
  "roomId": roomId,
  "question": question,
  "options": [option1,option2,option3,option4],
  "correctOption": correctOption


          }));


  


}  
  return <div>

    <div>
      <StudentList/>
    </div>
    
    <h1>Add Questions</h1>

    <h2>Enter Question : </h2>
    <input type="text" onChange={(e)=>{setQuestion(e.target.value)}} />

    <h2>Enter Options Below</h2>
    <h2>Option 1: </h2>
    <input type="text" onChange={(e)=>{setOption1(e.target.value)}} />
<br />
    <h2>Option 2: </h2>
    <input type="text" onChange={(e)=>{setOption2(e.target.value)}} />
<br />
    <h2>Option 3: </h2>
    <input type="text" onChange={(e)=>{setOption3(e.target.value)}} />
<br />
    <h2>Option 4: </h2>
    <input type="text" onChange={(e)=>{setOption4(e.target.value)}} />
<br />
     <h2>Correct Option :  </h2>
    <input type="text" onChange={(e)=>{setCorrectOption(e.target.value)}} />


    <button onClick={handleCreateQuiz}>hifewfwefwe</button>
    
  </div>
}