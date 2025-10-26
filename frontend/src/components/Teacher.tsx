// import { useEffect, useState } from "react";
// import {useNavigate} from "react-router-dom"
// import { sockets } from "../sockets/ws";

// export default function Teacher(){
//     const [socket,setSocket] = useState<WebSocket>();
//     useEffect(()=>{
//         setSocket(sockets);
//         console.log("socket connected....!");
//     },[])
//     const navigate = useNavigate();
//     const [teacherName,setTeachername] = useState<string>('');
//     const [roomId,setRoomId] = useState<string>('');

//     function handleTeacherRoom(){
//         socket?.send(JSON.stringify({ 
//             "role" : "teacher",
//             "roomId" : roomId,
//             "name" : teacherName
//         }));
//         navigate('/teacherDashboard',{state : roomId,});
//     }
//     return <div>
//         <h1>Enter Teacher Name : </h1>
        
//         <input type="text" onChange={(e)=>{setTeachername(e.target.value)}} />
        
//         <h1>Enter Room Name : </h1>
        
//         <input type="text" onChange={(e)=>{setRoomId(e.target.value)}}/>
        
       
//        <button onClick={handleTeacherRoom}> Create Room</button>
//     </div>
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sockets } from "../sockets/ws";

export default function Teacher() {
    const [socket, setSocket] = useState<WebSocket>();
    const navigate = useNavigate();
    const [teacherName, setTeachername] = useState<string>('');
    const [roomId, setRoomId] = useState<string>('');
    
    useEffect(() => {
        setSocket(sockets);
        console.log("socket connected....!");
    }, []);

    function handleTeacherRoom() {
        if (!teacherName || !roomId) {
            alert("Please fill all fields!");
            return;
        }

        socket?.send(JSON.stringify({
            
            "role": "teacher",
            "roomId": roomId,
            "name": teacherName
        }));
        navigate('/teacherDashboard', { state: roomId });
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Logo/Title Section */}
                <div className="text-center mb-8">
                    <div className="inline-block">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-8 border-yellow-300 shadow-2xl animate-pulse">
                            <span className="text-6xl">👨‍🏫</span>
                        </div>
                    </div>
                    <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                        KBC Quiz
                    </h1>
                    <p className="text-yellow-300 text-2xl font-semibold">Teacher Portal</p>
                </div>

                {/* Form Card */}
                <div className="bg-gradient-to-br from-purple-800 to-purple-900 border-4 border-yellow-500 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white font-bold">1</span>
                            </div>
                            <label className="text-yellow-300 text-xl font-semibold">
                                Your Name
                            </label>
                        </div>
                        <input
                            type="text"
                            value={teacherName}
                            onChange={(e) => setTeachername(e.target.value)}
                            className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-30 transition-all"
                            placeholder="Enter your name..."
                        />
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-white font-bold">2</span>
                            </div>
                            <label className="text-yellow-300 text-xl font-semibold">
                                Room ID
                            </label>
                        </div>
                        <input
                            type="text"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            className="w-full bg-purple-700 border-3 border-yellow-400 rounded-lg px-6 py-4 text-white text-lg focus:outline-none focus:border-yellow-300 focus:ring-4 focus:ring-yellow-500 focus:ring-opacity-30 transition-all"
                            placeholder="Create a unique room ID..."
                        />
                    </div>

                    <button
                        onClick={handleTeacherRoom}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-4 border-green-300 rounded-xl py-5 text-white text-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                        <span>🚀</span>
                        Create Room
                    </button>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-purple-800 bg-opacity-50 border-2 border-yellow-400 rounded-lg p-4">
                    <p className="text-yellow-300 text-center text-sm">
                        💡 Share your Room ID with students to let them join your quiz session
                    </p>
                </div>
            </div>
        </div>
    );
}