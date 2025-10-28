// core logic
// import { useEffect, useState } from "react"
// import { sockets } from "../sockets/ws"
// import { useLocation } from "react-router-dom";
// export default function Results(){
//     const location = useLocation();
//     const roomId = location.state;    
//     const [topPeople,setTopPeople] = useState([]);
//     const [Payload,setPayload] = useState<any>();
//     const [socket,setSocket] = useState<WebSocket>();
//     useEffect(()=>{
//         setSocket(sockets);
//     },[])

//     if(!socket) return;
//     socket.send(JSON.stringify({
        
//   "type": "finalResult",
//   "roomId": roomId

//     }));

//     socket.onmessage = (data : any) =>{
//         console.log("data",data);
//         console.log("second data",data.data);
//         const payload = JSON.parse(data.data);
//         setPayload(payload)
//         console.log("****************** PAYLOAD *****************************************",payload)
//         const msg = payload.top3;
//         setTopPeople(msg);
//         console.log("****************** msg ",msg)

//     }
//     return <div>
//         <h1>Results</h1>
//         {topPeople && topPeople.length > 0 ? <>{topPeople.map((top:any)=>{
//             <>
//             <h1>---------------------------------------------</h1>
//             <h1 className="text-4xl text-amber-400">{top.name}</h1>
//             <h1 className="text-4xl text-red-400">{top.time}</h1>
//             <br />
//             <h1>---------------------------------------------</h1>
//             </>
//         })}</> : ""}
//     </div>
// }

// import { useEffect, useState } from "react"
// import { Star } from "lucide-react"
// import { useLocation } from "react-router-dom"
// import { sockets } from "../sockets/ws"

// export default function Results() {
//     const location = useLocation();
//     const roomId = location.state;
//     const [topPeople, setTopPeople] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [socket, setSocket] = useState<WebSocket>();

//     useEffect(() => {
//         setSocket(sockets);
//     }, []);

//     useEffect(() => {
//         if (!socket) return;
        
//         socket.send(JSON.stringify({
//             "type": "finalResult",
//             "roomId": roomId
//         }));

//         const handleMessage = (data: any) => {
//             console.log("data", data);
//             const payload = JSON.parse(data.data);
//             console.log("PAYLOAD", payload);
            
//             if (payload.top3) {
//                 setTopPeople(payload.top3);
//                 setIsLoading(false);
//             }
//         };

//         socket.addEventListener('message', handleMessage);
        
//         return () => {
//             socket.removeEventListener('message', handleMessage);
//         };
//     }, [socket, roomId]);

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-400 mx-auto mb-4"></div>
//                     <p className="text-white text-xl">Loading Results...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!topPeople || topPeople.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-white text-2xl">No results yet</p>
//                 </div>
//             </div>
//         );
//     }

//     // Add some dummy wrong answer participants
//     const allParticipants = [
//         ...topPeople.slice(0, 3).map((p: any) => ({ ...p, correct: true })),
//         { name: "Rahul Sharma", time: "0", correct: false },
//         { name: "Priya Singh", time: "0", correct: false },
//         ...topPeople.slice(3).map((p: any) => ({ ...p, correct: true })),
//         { name: "Amit Patel", time: "0", correct: false },
//         { name: "Sneha Reddy", time: "0", correct: false }
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black py-12 px-4">
//             {/* Header */}
//             <div className="text-center mb-16 animate-fadeIn">
//                 <div className="flex items-center justify-center gap-3 mb-4">
//                     <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
//                     <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
//                         LEADERBOARD
//                     </h1>
//                     <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
//                 </div>
//                 <p className="text-yellow-300 text-xl font-semibold">Results</p>
//             </div>

//             {/* Results List */}
//             <div className="w-full px-4 space-y-3">
//                 {allParticipants.map((person: any, index: number) => {
//                     const isCorrect = person.correct !== false;
                    
//                     return (
//                         <div 
//                             key={index}
//                             className="animate-slideIn relative flex items-center w-full"
//                             style={{ animationDelay: `${index * 100}ms` }}
//                         >
//                             {/* Left golden line - extends to edge */}
//                             <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 mr-6"></div>
                            
//                             <div className={`relative flex items-center justify-between px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 ${
//                                 !isCorrect 
//                                     ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-2 border-purple-600'
//                                     : 'bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 border-2 border-yellow-400'
//                             }`} style={{
//                                 clipPath: 'polygon(40px 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 40px 100%, 0 50%)',
//                                 width: '800px',
//                                 maxWidth: '60vw'
//                             }}>
                                
//                                 {/* Name */}
//                                 <div className="flex-1" style={{ marginLeft: '30px' }}>
//                                     <h2 className={`text-2xl font-bold tracking-wide ${
//                                         !isCorrect ? 'text-white' : 'text-black'
//                                     }`} style={{ textShadow: !isCorrect ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
//                                         {person.name || 'Anonymous'}
//                                     </h2>
//                                 </div>

//                                 {/* Time */}
//                                 <div className={`text-2xl font-bold px-6 py-1 rounded-full ${
//                                     !isCorrect 
//                                         ? 'bg-purple-700 text-white' 
//                                         : 'bg-lime-600 text-white'
//                                 }`} style={{ minWidth: '120px', textAlign: 'center', marginRight: '30px' }}>
//                                     {person.time || 'N/A'}
//                                 </div>

//                                 {/* Shine effect for green bars */}
//                                 {isCorrect && (
//                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{
//                                         clipPath: 'polygon(40px 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 40px 100%, 0 50%)'
//                                     }}></div>
//                                 )}
//                             </div>
                            
//                             {/* Right golden line - extends to edge */}
//                             <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 ml-6"></div>
//                         </div>
//                     );
//                 })}
//             </div>

//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(-30px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 @keyframes slideIn {
//                     from { opacity: 0; transform: translateX(-50px); }
//                     to { opacity: 1; transform: translateX(0); }
//                 }
//                 @keyframes shimmer {
//                     0% { transform: translateX(-100%) skewX(-15deg); }
//                     100% { transform: translateX(200%) skewX(-15deg); }
//                 }
//                 .animate-fadeIn {
//                     animation: fadeIn 1s ease-out;
//                 }
//                 .animate-slideIn {
//                     animation: slideIn 0.6s ease-out forwards;
//                     opacity: 0;
//                 }
//                 .animate-shimmer {
//                     animation: shimmer 3s infinite;
//                 }
//             `}</style>
//         </div>
//     );
// }

// import { useEffect, useState } from "react"
// import { Star } from "lucide-react"
// import { useLocation } from "react-router-dom"
// import { sockets } from "../sockets/ws"

// export default function Results() {
//     const location = useLocation();
//     const roomId = location.state;
//     const [topPeople, setTopPeople] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [socket, setSocket] = useState<WebSocket>();

//     useEffect(() => {
//         setSocket(sockets);
//     }, []);

//     useEffect(() => {
//         if (!socket) return;
        
//         socket.send(JSON.stringify({
//             "type": "finalResult",
//             "roomId": roomId
//         }));

//         const handleMessage = (data: any) => {
//             console.log("data", data);
//             const payload = JSON.parse(data.data);
//             console.log("PAYLOAD", payload);
            
//             if (payload.students) {
//                 // Keep the raw order - don't sort
//                 setTopPeople(payload.students);
//                 setIsLoading(false);
//             }
//         };

//         socket.addEventListener('message', handleMessage);
        
//         return () => {
//             socket.removeEventListener('message', handleMessage);
//         };
//     }, [socket, roomId]);

//     if (isLoading) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-400 mx-auto mb-4"></div>
//                     <p className="text-white text-xl">Loading Results...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!topPeople || topPeople.length === 0) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
//                 <div className="text-center">
//                     <p className="text-white text-2xl">No results yet</p>
//                 </div>
//             </div>
//         );
//     }

//     // No need for dummy data anymore - using real student data
//     const allParticipants = topPeople.map((student: any) => ({
//         ...student,
//         correct: student.time !== 0 // If time is 0, answer is wrong
//     }));

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black py-12 px-4">
//             {/* Header */}
//             <div className="text-center mb-16 animate-fadeIn">
//                 <div className="flex items-center justify-center gap-3 mb-4">
//                     <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
//                     <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
//                         LEADERBOARD
//                     </h1>
//                     <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
//                 </div>
//                 <p className="text-yellow-300 text-xl font-semibold">Top Performers</p>
//             </div>

//             {/* Results List */}
//             <div className="w-full px-4 space-y-3">
//                 {allParticipants.map((person: any, index: number) => {
//                     const isCorrect = person.correct !== false;
                    
//                     return (
//                         <div 
//                             key={index}
//                             className="animate-slideIn relative flex items-center w-full"
//                             style={{ animationDelay: `${index * 100}ms` }}
//                         >
//                             {/* Left golden line - extends to edge */}
//                             <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 mr-6"></div>
                            
//                             <div className={`relative flex items-center justify-between px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 ${
//                                 !isCorrect 
//                                     ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-2 border-purple-600'
//                                     : 'bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 border-2 border-yellow-400'
//                             }`} style={{
//                                 clipPath: 'polygon(40px 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 40px 100%, 0 50%)',
//                                 width: '800px',
//                                 maxWidth: '60vw'
//                             }}>
                                
//                                 {/* Name */}
//                                 <div className="flex-1" style={{ marginLeft: '30px' }}>
//                                     <h2 className={`text-2xl font-bold tracking-wide ${
//                                         !isCorrect ? 'text-white' : 'text-black'
//                                     }`} style={{ textShadow: !isCorrect ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
//                                         {person.name || 'Anonymous'}
//                                     </h2>
//                                 </div>

//                                 {/* Time */}
//                                 <div className={`text-2xl font-bold px-6 py-1 rounded-full ${
//                                     !isCorrect 
//                                         ? 'bg-purple-700 text-white' 
//                                         : 'bg-lime-600 text-white'
//                                 }`} style={{ minWidth: '120px', textAlign: 'center', marginRight: '30px' }}>
//                                     {isCorrect ? (person.time ? person.time.toFixed(2) : 'N/A') : '0'}
//                                 </div>

//                                 {/* Shine effect for green bars */}
//                                 {isCorrect && (
//                                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{
//                                         clipPath: 'polygon(40px 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 40px 100%, 0 50%)'
//                                     }}></div>
//                                 )}
//                             </div>
                            
//                             {/* Right golden line - extends to edge */}
//                             <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 ml-6"></div>
//                         </div>
//                     );
//                 })}
//             </div>

//             <style>{`
//                 @keyframes fadeIn {
//                     from { opacity: 0; transform: translateY(-30px); }
//                     to { opacity: 1; transform: translateY(0); }
//                 }
//                 @keyframes slideIn {
//                     from { opacity: 0; transform: translateX(-50px); }
//                     to { opacity: 1; transform: translateX(0); }
//                 }
//                 @keyframes shimmer {
//                     0% { transform: translateX(-100%) skewX(-15deg); }
//                     100% { transform: translateX(200%) skewX(-15deg); }
//                 }
//                 .animate-fadeIn {
//                     animation: fadeIn 1s ease-out;
//                 }
//                 .animate-slideIn {
//                     animation: slideIn 0.6s ease-out forwards;
//                     opacity: 0;
//                 }
//                 .animate-shimmer {
//                     animation: shimmer 3s infinite;
//                 }
//             `}</style>
//         </div>
//     );
// }

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { useLocation } from "react-router-dom"
import { sockets } from "../sockets/ws"

export default function Results() {
    const location = useLocation();
    const roomId = location.state;
    const [topPeople, setTopPeople] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        setSocket(sockets);
    }, []);

    useEffect(() => {
        if (!socket) return;
        
        socket.send(JSON.stringify({
            "type": "finalResult",
            "roomId": roomId
        }));

        const handleMessage = (data: any) => {
            console.log("data", data);
            const payload = JSON.parse(data.data);
            console.log("PAYLOAD", payload);
            
            if (payload.students) {
                // Keep the raw order - don't sort
                setTopPeople(payload.students);
                setIsLoading(false);
            }
        };

        socket.addEventListener('message', handleMessage);
        
        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket, roomId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-lime-400 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading Results...</p>
                </div>
            </div>
        );
    }

    if (!topPeople || topPeople.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-2xl">No results yet</p>
                </div>
            </div>
        );
    }

    // No need for dummy data anymore - using real student data
    const allParticipants = topPeople.map((student: any) => ({
        ...student,
        correct: student.time !== 0 // If time is 0, answer is wrong
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black py-12 px-4">
            {/* Header */}
            <div className="text-center mb-16 animate-fadeIn">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
                    <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
                        LEADERBOARD
                    </h1>
                    <Star className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
                <p className="text-yellow-300 text-xl font-semibold">Top Performers</p>
            </div>

            {/* Results List */}
            <div className="w-full px-4 space-y-3">
                {allParticipants.map((person: any, index: number) => {
                    const isCorrect = person.correct !== false;
                    
                    return (
                        <div 
                            key={index}
                            className="animate-slideIn relative flex items-center w-full"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Left golden line - extends to edge */}
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 mr-6"></div>
                            
                            <div className={`relative flex items-center justify-between px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                                !isCorrect 
                                    ? 'bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 border-2 border-purple-600'
                                    : 'bg-gradient-to-r from-lime-500 via-lime-400 to-lime-500 border-2 border-yellow-400'
                            }`} style={{
                                clipPath: 'polygon(40px 0, calc(100% - 40px) 0, 100% 50%, calc(100% - 40px) 100%, 40px 100%, 0 50%)',
                                width: '800px',
                                maxWidth: '60vw'
                            }}>
                                
                                {/* Name */}
                                <div className="flex-1" style={{ marginLeft: '30px' }}>
                                    <h2 className={`text-2xl font-bold tracking-wide ${
                                        !isCorrect ? 'text-white' : 'text-black'
                                    }`} style={{ textShadow: !isCorrect ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none' }}>
                                        {person.name || 'Anonymous'}
                                    </h2>
                                </div>

                                {/* Time */}
                                <div className={`text-2xl font-bold px-6 py-1 rounded-full ${
                                    !isCorrect 
                                        ? 'bg-purple-700 text-white' 
                                        : 'bg-lime-600 text-white'
                                }`} style={{ minWidth: '120px', textAlign: 'center', marginRight: '30px' }}>
                                    {isCorrect ? (person.time ? person.time.toFixed(2) : 'N/A') : '0'}
                                </div>


                            </div>
                            
                            {/* Right golden line - extends to edge */}
                            <div className="flex-1 h-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 ml-6"></div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }
                .animate-slideIn {
                    animation: slideIn 0.6s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
}