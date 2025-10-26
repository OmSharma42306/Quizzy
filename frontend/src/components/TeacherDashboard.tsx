// import { useEffect, useState } from "react"
// import { useLocation } from "react-router-dom";
// import { sockets } from "../sockets/ws";
// import StudentList from "../components/StudentList"


// export default function TeacherDashboard(){
//   const location = useLocation();
//   const roomId = location.state;
//   const [socket,setSocket] = useState<WebSocket>();
  
//   const [question,setQuestion] = useState('');
//   const [option1,setOption1] = useState('');
//   const [option2,setOption2] = useState('');
//   const [option3,setOption3] = useState('');
//   const [option4,setOption4] = useState('');
//   const [correctOption,setCorrectOption] = useState('');
  
//   useEffect(()=>{
// setSocket(sockets);
//   },[])
  

//   useEffect(()=>{
//     if(!socket)   return;
//     socket.onopen = () =>{
//       console.log("socket connecting..")
//       setSocket(sockets);
//       console.log("socket connected..")
//     }

//   },[]);
  
  
//   if(!socket) return;
  

   
//     function handleCreateQuiz(){
//           socket?.send(JSON.stringify({               
//   "type": "createQuiz",
//   "roomId": roomId,
//   "question": question,
//   "options": [option1,option2,option3,option4],
//   "correctOption": correctOption


//           }));


  


// }  
//   return <div>

//     <div>
//       <StudentList/>
//     </div>
    
//     <h1>Add Questions</h1>

//     <h2>Enter Question : </h2>
//     <input type="text" onChange={(e)=>{setQuestion(e.target.value)}} />

//     <h2>Enter Options Below</h2>
//     <h2>Option 1: </h2>
//     <input type="text" onChange={(e)=>{setOption1(e.target.value)}} />
// <br />
//     <h2>Option 2: </h2>
//     <input type="text" onChange={(e)=>{setOption2(e.target.value)}} />
// <br />
//     <h2>Option 3: </h2>
//     <input type="text" onChange={(e)=>{setOption3(e.target.value)}} />
// <br />
//     <h2>Option 4: </h2>
//     <input type="text" onChange={(e)=>{setOption4(e.target.value)}} />
// <br />
//      <h2>Correct Option :  </h2>
//     <input type="text" onChange={(e)=>{setCorrectOption(e.target.value)}} />


//     <button onClick={handleCreateQuiz}>hifewfwefwe</button>
    
//   </div>
// }


// Main Teacher Dashboard
import StudentList from "./StudentList"
import { useState,useEffect } from "react";
import { sockets } from "../sockets/ws";
import { useLocation, useNavigate } from "react-router-dom";
export default function TeacherDashboard() {
    const location = useLocation();
  const roomId = location.state;
    const [socket, setSocket] = useState<WebSocket>();
    
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctOption, setCorrectOption] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
        // Replace with your actual socket initialization
        setSocket(sockets);
    }, []);

    function handleCreateQuiz() {
        if (!question || !option1 || !option2 || !option3 || !option4 || !correctOption) {
            alert("Please fill all fields!");
            return;
        }

        socket?.send(JSON.stringify({
            "type": "createQuiz",
            "roomId": roomId,
            "question": question,
            "options": [option1, option2, option3, option4],
            "correctOption": correctOption
        }));

        // Clear form
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectOption('');
    }
    function handleResults(){
        navigate('/results',{state : roomId});
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                        KBC Quiz Creator
                    </h1>
                    <p className="text-yellow-300 text-lg">Room ID: {roomId}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quiz Creation Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-gradient-to-br from-purple-800 to-purple-900 border-4 border-yellow-500 rounded-lg p-8 shadow-2xl">
                            <h2 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
                                <span className="text-4xl">📝</span>
                                Create New Question
                            </h2>

                            {/* Question Input */}
                            <div className="mb-6">
                                <label className="block text-yellow-300 text-lg font-semibold mb-3">
                                    Question:
                                </label>
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-yellow-300 transition-colors"
                                    placeholder="Enter your question here..."
                                />
                            </div>

                            {/* Options Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-yellow-300 font-semibold mb-2">
                                        A: Option 1
                                    </label>
                                    <input
                                        type="text"
                                        value={option1}
                                        onChange={(e) => setOption1(e.target.value)}
                                        className="w-full bg-purple-700 border-2 border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-300 transition-colors"
                                        placeholder="Enter option A"
                                    />
                                </div>

                                <div>
                                    <label className="block text-yellow-300 font-semibold mb-2">
                                        B: Option 2
                                    </label>
                                    <input
                                        type="text"
                                        value={option2}
                                        onChange={(e) => setOption2(e.target.value)}
                                        className="w-full bg-purple-700 border-2 border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-300 transition-colors"
                                        placeholder="Enter option B"
                                    />
                                </div>

                                <div>
                                    <label className="block text-yellow-300 font-semibold mb-2">
                                        C: Option 3
                                    </label>
                                    <input
                                        type="text"
                                        value={option3}
                                        onChange={(e) => setOption3(e.target.value)}
                                        className="w-full bg-purple-700 border-2 border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-300 transition-colors"
                                        placeholder="Enter option C"
                                    />
                                </div>

                                <div>
                                    <label className="block text-yellow-300 font-semibold mb-2">
                                        D: Option 4
                                    </label>
                                    <input
                                        type="text"
                                        value={option4}
                                        onChange={(e) => setOption4(e.target.value)}
                                        className="w-full bg-purple-700 border-2 border-yellow-400 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-300 transition-colors"
                                        placeholder="Enter option D"
                                    />
                                </div>
                            </div>

                            {/* Correct Option */}
                            <div className="mb-6">
                                <label className="block text-yellow-300 text-lg font-semibold mb-3">
                                    Correct Answer:
                                </label>
                                <select
                                    value={correctOption}
                                    onChange={(e) => setCorrectOption(e.target.value)}
                                    className="w-full bg-purple-700 border-3 border-green-400 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:border-green-300 transition-colors cursor-pointer"
                                >
                                    <option value="">Select correct option</option>
                                    <option value={option1}>A: {option1 || 'Option 1'}</option>
                                    <option value={option2}>B: {option2 || 'Option 2'}</option>
                                    <option value={option3}>C: {option3 || 'Option 3'}</option>
                                    <option value={option4}>D: {option4 || 'Option 4'}</option>
                                </select>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleCreateQuiz}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-4 border-green-300 rounded-lg py-4 text-white text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                🚀 Launch Question
                            </button>
                              {/* Submit Button */}
                            <button
                                onClick={handleResults}
                                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-4 border-green-300 rounded-lg py-4 text-white text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                🚀 Get Results
                            </button>
                        </div>
                    </div>

                    {/* Student List Sidebar */}
                    <div className="lg:col-span-1">
                        <StudentList/>
                    </div>
                </div>
            </div>
        </div>
    );
}