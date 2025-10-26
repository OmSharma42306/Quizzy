// core logic..

// import { useEffect, useState } from "react"
// import { sockets } from "../sockets/ws"

// export default function StudentList(){
//     const [socket,setSocket] = useState<WebSocket>();
//     const [names,setNames] = useState();
//     useEffect(()=>{
//             setSocket(sockets);
//             console.log("socket connected");
//     },[])

//     if(!socket) return;
//     socket.onmessage = (data:any) =>{
//         const datax : any= JSON.parse(data.data);
//         if(datax.type === "student-joined"){
//             const name = datax.name;
//             // setNames((prev)=>[...prev,name]);
//             setNames(name);
//             console.log(`${name} joined the quiz session.`);
//         }
        


        
//     }
// return <div>
//     {names ? <> <h1>{names} Joined The Quiz....</h1></> : ""}
//     </div>
// }


// added beautiful ui stuff...
import { useEffect, useState } from "react";
import { sockets } from "../sockets/ws";

// Student List Component
export default function StudentList() {
    const [names, setNames] = useState<string[]>([]);
    console.log("names : ",names);

    useEffect(() => {
        console.log("socket connected!");

        const socket = sockets;

        const handleMessage = (data: any) => {
            const datax = JSON.parse(data.data);

            if (datax.type === "student-joined") {
                setNames(prev => {
                    // ✅ Avoid duplicates if same student reconnects
                    if (prev.includes(datax.name)) return prev;
                    return [...prev, datax.name];
                });

                console.log(`${datax.name} joined the quiz session.`);
            }
        };

        socket.addEventListener("message", handleMessage);

        // ✅ Cleanup listener on component unmount
        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, []); // ✅ only once after component mount
    
    
    return (
        <div className="bg-gradient-to-b from-purple-900 to-purple-800 border-4 border-yellow-500 rounded-lg p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-yellow-400">Live Students</h2>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                {names.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">Waiting for students to join...</p>
                ) : (
                    names.map((name, index) => (
                        <div 
                            key={index}
                            className="bg-purple-700 border-2 border-yellow-400 rounded-lg p-4 transform hover:scale-105 transition-all duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-bold">{index + 1}</span>
                                </div>
                                <span className="text-white font-semibold text-lg">{name}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
            
            <div className="mt-6 pt-4 border-t-2 border-yellow-500">
                <p className="text-yellow-400 font-bold text-center">
                    Total: {names.length} {names.length === 1 ? 'Student' : 'Students'}
                </p>
            </div>
        </div>
    );
}