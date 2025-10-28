import { Trophy, User, BookOpen, Zap, Crown, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    const handleTeacherClick = () => {
        navigate('/teacher');
    };

    const handleStudentClick = () => {
        navigate('/student')
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-black relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Header with Crown */}
                <div className="text-center mb-8 animate-fadeIn">
                    <div className="flex items-center justify-center mb-6">
                        <Crown className="w-20 h-20 text-yellow-400 animate-bounce" />
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4 drop-shadow-2xl tracking-tight">
                        DBMS KA SIKANDAR
                    </h1>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                        <p className="text-2xl md:text-3xl text-yellow-300 font-bold italic">
                            Kaun Banega Database Master?
                        </p>
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                    </div>
                </div>

                {/* Description */}
                <div className="max-w-3xl mx-auto text-center mb-16 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
                        Test your Database Management System knowledge in this exciting quiz competition! 
                        Race against time, answer questions correctly, and prove you're the ultimate DBMS champion!
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <div className="bg-purple-800/30 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6">
                            <Zap className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">Lightning Fast</h3>
                            <p className="text-gray-300 text-sm">Answer questions in real-time and compete with others!</p>
                        </div>
                        <div className="bg-purple-800/30 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6">
                            <BookOpen className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">DBMS Mastery</h3>
                            <p className="text-gray-300 text-sm">Questions covering SQL, transactions, normalization & more!</p>
                        </div>
                        <div className="bg-purple-800/30 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-6">
                            <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-white mb-2">Leaderboard Glory</h3>
                            <p className="text-gray-300 text-sm">Top performers get featured on the champion board!</p>
                        </div>
                    </div>
                </div>

                {/* Role Selection */}
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center text-white mb-12 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                        Choose Your Role
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                        {/* Teacher Card */}
                        <div 
                            onClick={handleTeacherClick}
                            className="group cursor-pointer animate-slideUp"
                            style={{ animationDelay: '0.5s' }}
                        >
                            <div className="relative bg-gradient-to-br from-lime-500 to-lime-600 rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 transform transition-all duration-300 hover:scale-105 hover:shadow-yellow-400/50 overflow-hidden">
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="bg-lime-700 rounded-full p-6 shadow-xl">
                                            <BookOpen className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-black text-black text-center mb-4">
                                        TEACHER
                                    </h3>
                                    <p className="text-black text-center text-lg font-semibold mb-6">
                                        Create quizzes, manage rooms, and watch your students compete in real-time!
                                    </p>
                                    <ul className="space-y-2 text-black font-medium">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            Create unlimited quiz rooms
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            Add custom DBMS questions
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            Monitor live results
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-black rounded-full"></div>
                                            View leaderboard rankings
                                        </li>
                                    </ul>
                                    <div className="mt-8 bg-black text-lime-400 text-center py-3 rounded-full font-bold text-xl group-hover:bg-lime-700 group-hover:text-white transition-colors">
                                        Start as Teacher →
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student Card */}
                        <div 
                            onClick={handleStudentClick}
                            className="group cursor-pointer animate-slideUp"
                            style={{ animationDelay: '0.7s' }}
                        >
                            <div className="relative bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-8 shadow-2xl border-4 border-purple-400 transform transition-all duration-300 hover:scale-105 hover:shadow-purple-400/50 overflow-hidden">
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:animate-shimmer"></div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="bg-purple-800 rounded-full p-6 shadow-xl">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-black text-white text-center mb-4">
                                        STUDENT
                                    </h3>
                                    <p className="text-white text-center text-lg font-semibold mb-6">
                                        Join quiz rooms, answer questions, and climb to the top of the leaderboard!
                                    </p>
                                    <ul className="space-y-2 text-white font-medium">
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                            Join with room code
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                            Answer DBMS questions
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                            Race against time
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                            Compete for top spot
                                        </li>
                                    </ul>
                                    <div className="mt-8 bg-white text-purple-600 text-center py-3 rounded-full font-bold text-xl group-hover:bg-purple-800 group-hover:text-white transition-colors">
                                        Join as Student →
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-16 animate-fadeIn" style={{ animationDelay: '0.9s' }}>
                    <p className="text-gray-400 text-lg">
                        Ready to prove your DBMS skills? Choose your role and let's begin! 🚀
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out forwards;
                    opacity: 0;
                }
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                    opacity: 0;
                }
                .group:hover .group-hover\\:animate-shimmer {
                    animation: shimmer 1.5s ease-in-out;
                }
            `}</style>
        </div>
    );
}