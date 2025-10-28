// core page code...
// import { useEffect, useState } from "react";
// import { sockets } from "../sockets/ws";

// export default function StudentDashboard(){
//     const [socket,setSocket] = useState<WebSocket>();
//     const [question,setQuestion] = useState('');
//     const [options,setOptions] = useState([]);
//     useEffect(()=>{
//         setSocket(sockets);
//        console.log("socket connected....!");
        
//     },[]);

//     if (!socket) return;
    
//     socket.onmessage = (data) =>{
        
//         const payload = JSON.parse(data.data);
//         const msg = payload.payload;

//         const question = msg.question;
//         const option = msg.options;
//         setQuestion(question);
//         setOptions(option);
//     }

//     return <div className="bg-red-400">
//         Student Dashboard....fwe
//         {question ? <div>
//             <h1>{question}</h1>

//         </div>: "quiz yet not created.."}
//         {options ? <div className="bg-red-200">{options}</div> : "quiz yet not created.."}
//     </div>
// }

// written ui using claude....

import { useEffect, useState } from "react";
import { sockets } from "../sockets/ws";
import { useLocation } from "react-router-dom";

export default function StudentDashboard() {
    const [socket, setSocket] = useState<WebSocket>();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState([]);
    const [timer, setTimer] = useState(60);
    const [selectedOption, setSelectedOption] = useState(null);
    const [disableSubmitButton,setDisableSubmitButton] = useState<any>();
    // maintaining state for submission seconds...
    const [questionStartTime,setQuestionStartTime] = useState<number>(0);

    const location = useLocation();
    const {roomId,uucmsNo,studentName} = location.state;
    useEffect(() => {
        setSocket(sockets);
        console.log("socket connected....!");
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => Math.max(0, prev - 1));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    if (!socket) return null;

    socket.onmessage = (data) => {
        const payload = JSON.parse(data.data);
        const msg = payload.payload;
        const question = msg.question;
        const option = msg.options;
        setQuestion(question);
        setOptions(option);
        setTimer(60);
        setQuestionStartTime(performance.now());
        setSelectedOption(null);
    }

    const handleOptionClick = (index:any) => {
        setSelectedOption(index);
    };

    const getTimerDots = () => {
        const dots = [];
        const totalDots = 30;
        const activeDots = Math.ceil((timer / 60) * totalDots);
        
        for (let i = 0; i < totalDots; i++) {
            let color = 'bg-gray-400';
            if (i < activeDots) {
                if (timer > 15) color = 'bg-green-400';
                else if (timer > 8) color = 'bg-yellow-500';
                else color = 'bg-red-500';
            }
            dots.push(
                <div key={i} className={`w-3 h-3 rounded-full ${color} transition-colors duration-300`}></div>
            );
        }
        return dots;
    };

    if (!question) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
                <div className="text-white text-3xl font-bold">Waiting for quiz to start...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 flex flex-col items-center justify-center p-4">
            {/* Timer Bar */}
            <div className="w-full max-w-6xl mb-2 flex items-center justify-center gap-4">
                <div className="flex gap-1.5">
                    {getTimerDots()}
                </div>
                <div className="flex gap-1.5">
                    {getTimerDots()}
                </div>
            </div>

            {/* Question Box with Half Moon Timer */}
            <div className="w-full max-w-5xl mb-8 relative">
                {/* Half Moon Timer positioned above question */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative w-32 h-20">
                        {/* Half Moon Background */}
                        <div className="absolute inset-0 bg-gradient-to-b from-purple-600 to-purple-800 border-4 border-yellow-400 shadow-2xl overflow-hidden" 
                             style={{
                                 borderRadius: '100px 100px 0 0'
                             }}>
                            {/* Progress Bar Fill */}
                            <div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-400 via-yellow-500 to-orange-400 transition-all duration-1000"
                                style={{
                                    height: `${(timer / 60) * 100}%`
                                }}
                            ></div>
                            
                            {/* Timer Number */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-white text-4xl font-bold drop-shadow-lg relative z-10">{timer}</span>
                            </div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-xl" 
                             style={{
                                 borderRadius: '100px 100px 0 0'
                             }}></div>
                    </div>
                </div>

                {/* Question Box */}
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-yellow-500 border-b-[20px] border-b-transparent"></div>
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-l-yellow-500 border-b-[20px] border-b-transparent"></div>
                <div className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 border-4 border-yellow-500 rounded-lg p-8 pt-12 shadow-2xl hover:border-yellow-300 transition-colors duration-300">
                    <h2 className="text-white text-2xl md:text-3xl font-semibold text-center">
                        {question}
                    </h2>
                </div>
            </div>

            {/* Options Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((option, index) => {
                    const labels = ['A', 'B', 'C', 'D'];
                    const isSelected = selectedOption === index;
                    
                    return (
                        <button
                            key={index}
                            onClick={() => handleOptionClick(index)}
                            className="group w-full relative"
                        >
                            {/* Left Arrow Pointer */}
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[25px] border-t-transparent border-r-[20px] border-r-yellow-500 border-b-[25px] border-b-transparent group-hover:border-r-yellow-300 transition-colors duration-300"></div>
                            
                            {/* Right Arrow Pointer */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[25px] border-t-transparent border-l-[20px] border-l-yellow-500 border-b-[25px] border-b-transparent group-hover:border-l-yellow-300 transition-colors duration-300"></div>
                            
                            {/* Main Option Button */}
                            <div
                                className={`relative ${
                                    isSelected 
                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                                        : 'bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800'
                                } border-[3px] border-yellow-500 py-4 px-6 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-yellow-500 group-hover:to-yellow-600 group-hover:border-yellow-300 shadow-lg`}
                                style={{
                                    clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%)'
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-white text-xl md:text-2xl font-bold min-w-[40px]">
                                        {labels[index]}:
                                    </span>
                                    <span className="text-white text-lg md:text-xl font-semibold flex-1 text-left">
                                        {option}
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Submit Button */}
            <div className="mt-8 mb-4">
                <button
                    onClick={() => {
                        if (selectedOption !== null) {
                            const elapsed = ((performance.now() - questionStartTime) / 1000).toFixed(2);


                            console.log('Submitted answer:', options[selectedOption]);
                            // Add your submit logic here
                            socket.send(JSON.stringify({  type : "submitAnswer",roomId : roomId, uucms : uucmsNo, selectedOption : options[selectedOption] ,name : studentName, time : elapsed}));
                            setDisableSubmitButton(true);
                        }
                    }}
                    disabled={selectedOption === null || disableSubmitButton}
                    className={`relative px-12 py-4 text-xl font-bold text-white transition-all duration-300 shadow-2xl ${
                        selectedOption !== null
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-4 border-green-300 hover:scale-105 cursor-pointer'
                            : 'bg-gradient-to-r from-gray-600 to-gray-700 border-4 border-gray-500 cursor-not-allowed opacity-60'
                    }`}
                    style={{
                        clipPath: 'polygon(15px 0%, calc(100% - 15px) 0%, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0% 50%)'
                    }}
                >
                    {selectedOption !== null ? '✓ SUBMIT ANSWER' : 'SELECT AN OPTION'}
                    
                </button>
                
            </div>

            {/* Diamond Separator */}
            <div className="mt-8 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rotate-45 border-4 border-white shadow-xl"></div>
        </div>
    );
}