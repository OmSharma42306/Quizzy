// import { useEffect, useState } from "react"
// import { sockets } from "../sockets/ws"
// import { Navigate, useNavigate } from "react-router-dom";
// export default function Student(){
//     const [socket,setSocket] = useState<WebSocket>();
//     const navigate = useNavigate();
//     const [uucmsNo,setUUCMSNo] = useState('');
//     const[studentName,setStudentName] = useState('');
//     const [roomId,setRoomId] = useState('');

//     useEffect(()=>{
//         setSocket(sockets);
//     },[])

//     function handleJoinQuiz(){
//         socket?.send(JSON.stringify({
//             "type": "joinSession",
//             "roomId": roomId,
//             "uucms": uucmsNo,
//             "name": studentName
//         }));

//         navigate('/studentDashboard')

        

//     }

//     return <div className="bg-red-950">
//         <h1 className="text-3xl font-bold underline">
//     Hello world!
//   </h1>
//         <h1 className="bg-red-950">Enter UUCMS No : </h1>
        
//         <input type="text" onChange={(e)=>{setUUCMSNo(e.target.value)}} />
        
//         <h1>Enter Student Name : </h1>
        
//         <input type="text" onChange={(e)=>{setStudentName(e.target.value)}} />
        
//         <h1>Enter Room Name : </h1>
        
//         <input type="text"  onChange={(e)=>{setRoomId(e.target.value)}}/>
        
//         <button className="bg-red-950" onClick={handleJoinQuiz}>Join Room</button>

//     </div>
// }

import { useEffect, useState } from "react";
import { sockets } from "../sockets/ws";
import { useNavigate } from "react-router-dom";
export default function Student() {
    const [socket, setSocket] = useState<WebSocket>();
    const [uucmsNo, setUUCMSNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSocket(sockets);
        console.log("socket connected");
    }, []);

    function handleJoinQuiz() {
        if (!uucmsNo || !studentName || !roomId) {
            alert("Please fill all fields!");
            return;
        }

        socket?.send(JSON.stringify({
            "type": "joinSession",
            "roomId": roomId,
            "uucms": uucmsNo,
            "name": studentName
        }));

        navigate('/studentDashboard')
        console.log("Joining room:", roomId);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo/Title Section */}
                <div className="text-center mb-8">
                    <div className="inline-block">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-8 border-yellow-300 shadow-2xl animate-pulse">
                            <span className="text-6xl">🎓</span>
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                        KBC Quiz
                    </h1>
                    <p className="text-yellow-300 text-2xl font-semibold">Student Portal</p>
                </div>

                {/* Form Card */}
                <div className="bg-gradient-to-br from-purple-800 to-purple-900 border-4 border-yellow-500 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <label className="text-yellow-300 text-xl font-semibold">
                                UUCMS Number
                            </label>
                        </div>
                        <input
                            type="text"
                            value={uucmsNo}
                            onChange={(e) => setUUCMSNo(e.target.value)}
                            className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-30 transition-all"
                            placeholder="Enter your UUCMS number..."
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <label className="text-yellow-300 text-xl font-semibold">
                                Your Name
                            </label>
                        </div>
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-30 transition-all"
                            placeholder="Enter your name..."
                        />
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white font-bold">3</span>
                            </div>
                            <label className="text-yellow-300 text-xl font-semibold">
                                Room ID
                            </label>
                        </div>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-30 transition-all uppercase"
                            placeholder="Enter room ID provided by teacher..."
                        />
                    </div>

                    <button
                        onClick={handleJoinQuiz}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-4 border-blue-300 rounded-xl py-5 text-white text-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <span>🎯</span>
                        Join Quiz Room
                    </button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-purple-800 bg-opacity-50 border-2 border-yellow-400 rounded-lg p-4">
                    <p className="text-yellow-300 text-center text-sm">
                        💡 Get the Room ID from your teacher to join the quiz session
                    </p>
                </div>
            </div>
        </div>
    );
}