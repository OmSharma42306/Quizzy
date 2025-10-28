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

// beautiful ui ... some claude..
import { useEffect, useState } from "react"
import { Trophy, Medal, Award, Clock, Star } from "lucide-react"
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
            
            if (payload.top3) {
                setTopPeople(payload.top3);
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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-xl">Loading Results...</p>
                </div>
            </div>
        );
    }

    if (!topPeople || topPeople.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Award className="w-24 h-24 text-gray-500 mx-auto mb-4" />
                    <p className="text-white text-2xl">No results yet</p>
                </div>
            </div>
        );
    }

    const podiumOrder = topPeople.length >= 3 
        ? [topPeople[1], topPeople[0], topPeople[2]] 
        : topPeople.length === 2 
        ? [topPeople[1], topPeople[0]] 
        : [topPeople[0]];

    const getPodiumHeight = (index: number) => {
        if (topPeople.length >= 3) {
            return index === 1 ? 'h-80' : index === 0 ? 'h-64' : 'h-52';
        } else if (topPeople.length === 2) {
            return index === 1 ? 'h-72' : 'h-60';
        }
        return 'h-72';
    };

    const getPodiumColor = (index: number) => {
        if (topPeople.length >= 3) {
            return index === 1 ? 'from-yellow-500 to-yellow-600' : index === 0 ? 'from-gray-400 to-gray-500' : 'from-orange-600 to-orange-700';
        } else if (topPeople.length === 2) {
            return index === 1 ? 'from-yellow-500 to-yellow-600' : 'from-gray-400 to-gray-500';
        }
        return 'from-yellow-500 to-yellow-600';
    };

    const getMedalIcon = (index: number) => {
        if (topPeople.length >= 3) {
            return index === 1 ? <Trophy className="w-16 h-16 text-yellow-300" /> : 
                   index === 0 ? <Medal className="w-14 h-14 text-gray-300" /> : 
                   <Award className="w-12 h-12 text-orange-300" />;
        } else if (topPeople.length === 2) {
            return index === 1 ? <Trophy className="w-16 h-16 text-yellow-300" /> : 
                   <Medal className="w-14 h-14 text-gray-300" />;
        }
        return <Trophy className="w-16 h-16 text-yellow-300" />;
    };

    const getRank = (index: number) => {
        if (topPeople.length >= 3) {
            return index === 1 ? '1st' : index === 0 ? '2nd' : '3rd';
        } else if (topPeople.length === 2) {
            return index === 1 ? '1st' : '2nd';
        }
        return '1st';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4">
            {/* Header */}
            <div className="text-center mb-12 animate-fadeIn">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Quiz Champions
                    </h1>
                    <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                </div>
                <p className="text-gray-300 text-lg">Top Performers of this Round</p>
            </div>

            {/* Podium Display */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex items-end justify-center gap-8 px-4">
                    {podiumOrder.map((person: any, index: number) => {
                        return (
                            <div 
                                key={index} 
                                className="flex flex-col items-center animate-slideUp"
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                {/* Avatar Circle */}
                                <div className="mb-4 relative">
                                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getPodiumColor(index)} flex items-center justify-center shadow-2xl border-4 border-white/20 transform hover:scale-110 transition-transform duration-300`}>
                                        <span className="text-4xl font-bold text-white">
                                            {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                                        </span>
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-purple-600 rounded-full p-2 border-2 border-white shadow-lg">
                                        {getMedalIcon(index)}
                                    </div>
                                </div>

                                {/* Name and Stats */}
                                <div className="mb-4 text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[200px] border border-purple-500/30">
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {person.name || 'Anonymous'}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2 text-gray-300">
                                        <Clock className="w-4 h-4" />
                                        <span className="text-lg font-semibold">
                                            {person.time ? `${person.time}s` : 'N/A'}
                                        </span>
                                    </div>
                                    {person.score !== undefined && (
                                        <div className="mt-2 text-purple-400 font-semibold">
                                            Score: {person.score}
                                        </div>
                                    )}
                                </div>

                                {/* Podium Base */}
                                <div className={`w-48 ${getPodiumHeight(index)} bg-gradient-to-b ${getPodiumColor(index)} rounded-t-xl shadow-2xl border-t-4 border-white/30 flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:shadow-purple-500/50`}>
                                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                                    <span className="text-6xl font-bold text-white/90 z-10">
                                        {getRank(index)}
                                    </span>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shine"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Additional participants */}
            {topPeople.length > 3 && (
                <div className="max-w-4xl mx-auto mt-12">
                    <h3 className="text-2xl font-bold text-white text-center mb-6">Other Participants</h3>
                    <div className="space-y-3">
                        {topPeople.slice(3).map((person: any, index: number) => (
                            <div 
                                key={index} 
                                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-purple-500/20 hover:border-purple-500/50 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl font-bold text-gray-400 w-12">
                                        #{index + 4}
                                    </span>
                                    <span className="text-xl text-white font-semibold">
                                        {person.name || 'Anonymous'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-lg font-semibold">
                                        {person.time ? `${person.time}s` : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shine {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.6s ease-out forwards;
                    opacity: 0;
                }
                .animate-shine {
                    animation: shine 3s infinite;
                }
            `}</style>
        </div>
    );
}