'use client'

import { useState, useEffect, useRef } from 'react';

// A mock version of `next/link` and `usePathname` to make the component self-contained.
// This allows the code to run and be previewed without a Next.js environment.
const Link = ({ href, children, ...props }) => (
    <a href={href} {...props}>
        {children}
    </a>
);

// A simple mock of usePathname for demonstration purposes.
// In a real Next.js app, this would get the actual path.
const usePathname = () => {
    if (typeof window !== 'undefined') {
        return window.location.pathname;
    }
    return '/'; // Default path for server-side rendering or initial load
};

// Icons are now defined as SVGs to make the component self-contained.
const BurgerIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ChatIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        <path strokeLinecap="round" strokeLinecap="round" d="M16.875 1.875c-.25-1.07-1.1-1.875-2.25-1.875H5.625c-1.15 0-2 .805-2.25 1.875A3.75 3.75 0 000 5.625v12.75c0 1.15.805 2 1.875 2.25h1.25a.375.375 0 01.375.375v2.25c0 .338.29.5.5.312l4.25-3.5a.375.375 0 01.25-.094h.125c1.15 0-2-.805 2.25-1.875a3.75 3.75 0 003.75-3.75V5.625a3.75 3.75 0 00-3.75-3.75z" />
    </svg>
);

// The interactive Logo component with "FS" initials
const Logo = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const logoElement = document.getElementById('interactive-logo');
            if (logoElement) {
                const { left, top, width, height } = logoElement.getBoundingClientRect();
                const centerX = left + width / 2;
                const centerY = top + height / 2;
                const angle = Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI;
                setRotation(angle + 90); // Add 90 to start facing up
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            id="interactive-logo"
            className="relative transition-all duration-75"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="h-8 w-8 text-white"
            >
                {/* 'F' character */}
                <path d="M15,15 h30 v10 h-20 v15 h20 v10 h-30 z" fill="currentColor" />
                {/* 'S' character */}
                <path d="M75,25 a15,15 0 1,0 -10,0 a15,15 0 1,1 10,0" fill="none" stroke="currentColor" strokeWidth="10" />
            </svg>
        </div>
    );
};


const navItems = [
    {
        label: '_home',
        href: '/',
    },
    {
        label: '_projects',
        href: '/#projects',
    },
    {
        label: '_services',
        href: '/#services',
    },
    {
        label: '_contact-me',
        href: '/#contact',
    },
];

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [showAI, setShowAI] = useState(false);
    const pathname = usePathname();
    const chatMessagesRef = useRef(null);

    const toggleMenu = () => {
        setIsVisible(!isVisible);
    };

    const toggleAIChat = () => {
        setShowAI(!showAI);
    };

    const handleLinkClick = () => {
        setIsVisible(false);
    };

    // State for the AI assistant
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Hardcoded answers for the AI Recruiter persona.
    const portfolioAnswers = {
        'hello': 'Hello there! I am an AI Recruiter. I can answer questions about Fahad\'s skills and projects. Go ahead, ask me anything!',
        'hi': 'Hello there! I am an AI Recruiter. I can answer questions about Fahad\'s skills and projects. Go ahead, ask me anything!',
        'challenging project': 'My most challenging project was creating a full-stack e-commerce platform from scratch. It involved integrating multiple third-party APIs for payments and shipping, and building a scalable database schema to handle product variations and user orders. The biggest challenge was managing the complexity of state across the entire application.',
        'strengths and weaknesses': 'My greatest strength is my problem-solving ability and my passion for learning new technologies. I thrive on tackling complex problems and building elegant solutions. A weakness I am actively working on is my tendency to get lost in a single problem for too long. I\'ve learned to set time limits and to seek feedback from others sooner.',
        'hire you': 'You should hire me because I am a highly motivated and creative problem-solver. My portfolio demonstrates not only my technical skills but also my dedication to building unique and user-centric experiences. I am a quick learner and I am confident that I can be a valuable asset to your team from day one.',
        'skills': 'Beyond what is visible, I have extensive experience in agile methodologies and I excel at collaborating within a team. I am also proficient in creating robust unit and integration tests, which ensures code quality and reliability. I have a strong foundation in database design and optimization as well.',
        'favorite project': 'My favorite project is the interactive logo you see in the top left corner of the navigation bar. It might seem small, but it demonstrates my attention to detail and my ability to create unique, engaging user experiences without relying on external libraries. It shows that I can turn a simple design element into something memorable and interactive.',
        'experience': 'I have a solid foundation in front-end and back-end development, with a focus on building responsive, user-friendly applications. My experience includes working with technologies like React, Tailwind CSS, Node.js, and various databases. I am a continuous learner and always eager to adopt new technologies to improve my workflow and the products I build.',
        'teamwork': 'I excel in collaborative environments. I am comfortable with version control systems like Git and have experience working with project management tools to track progress and communicate with team members. I believe that open communication and mutual respect are key to a successful project.',
        'about me': 'My name is Fahad Hasan Siam. I am a passionate and dedicated software developer with a strong focus on creating high-quality, impactful web applications. I enjoy tackling complex problems and am always looking for new challenges to expand my skill set.',
        'education': 'My formal education has provided me with a strong theoretical understanding of computer science principles, which I have applied and expanded upon through practical projects and self-study. My portfolio reflects the skills I\'ve gained through both academic and personal development.',
        'future goals': 'My short-term goal is to join a dynamic team where I can contribute to meaningful projects and continue to grow as a developer. Long-term, I aim to become a technical lead or architect, helping to shape the direction of products and mentor junior developers.',
        'projects': 'I have worked on several projects, including a full-stack e-commerce platform, a real-time chat application, and a personal portfolio website. Each project allowed me to explore different technologies and solve unique problems, which you can read more about on my projects page.',
        'cool': 'Thanks! I\'ve been told I\'m a real byte-y conversationalist. What else can I help you with?',
        'lol': 'That\'s a good one! My circuits are a-buzzin\' with laughter. What can I tell you about Fahad\'s work?',
        'lmao': 'My circuits are a-buzzin\' with laughter. What can I tell you about Fahad\'s work?',
        'whats up': 'Not much, just here helping recruiters find great talent. What can I tell you about Fahad?',
        'unusual': 'That\'s an interesting question! While I can\'t process that, I can talk about Fahad\'s coding skills. For example, have you seen his interactive logo? It\'s pretty "unusual" in a good way!',
    };

    // Auto-scroll to the bottom when new messages are added
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', parts: [{ text: input.trim() }] };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput('');
        setIsLoading(true);

        const normalizedInput = input.trim().toLowerCase();
        let portfolioResponse = 'That\'s a bit outside my knowledge base. I\'m an AI Recruiter for Fahad\'s portfolio, so I can only answer questions about his skills and projects. Is there something else I can help with?';

        // Check for keywords in the user's input to provide a more flexible response
        if (normalizedInput.includes('strengths') || normalizedInput.includes('weaknesses')) {
            portfolioResponse = portfolioAnswers['strengths and weaknesses'];
        } else if (normalizedInput.includes('hire')) {
            portfolioResponse = portfolioAnswers['hire you'];
        } else if (normalizedInput.includes('challenging project') || normalizedInput.includes('most challenging')) {
            portfolioResponse = portfolioAnswers['challenging project'];
        } else if (normalizedInput.includes('skills') || normalizedInput.includes('proficient')) {
            portfolioResponse = portfolioAnswers['skills'];
        } else if (normalizedInput.includes('favorite project')) {
            portfolioResponse = portfolioAnswers['favorite project'];
        } else if (normalizedInput.includes('experience') || normalizedInput.includes('work history')) {
            portfolioResponse = portfolioAnswers['experience'];
        } else if (normalizedInput.includes('teamwork') || normalizedInput.includes('collaborate')) {
            portfolioResponse = portfolioAnswers['teamwork'];
        } else if (normalizedInput.includes('about me') || normalizedInput.includes('who are you')) {
            portfolioResponse = portfolioAnswers['about me'];
        } else if (normalizedInput.includes('education')) {
            portfolioResponse = portfolioAnswers['education'];
        } else if (normalizedInput.includes('goals') || normalizedInput.includes('future')) {
            portfolioResponse = portfolioAnswers['future goals'];
        } else if (normalizedInput.includes('projects') || normalizedInput.includes('portfolio')) {
            portfolioResponse = portfolioAnswers['projects'];
        } else if (normalizedInput.includes('hello') || normalizedInput.includes('hi')) {
            portfolioResponse = portfolioAnswers['hello'];
        } else if (normalizedInput.includes('cool')) {
            portfolioResponse = portfolioAnswers['cool'];
        } else if (normalizedInput.includes('lol') || normalizedInput.includes('lmao')) {
            portfolioResponse = portfolioAnswers['lol'];
        } else if (normalizedInput.includes('whats up')) {
            portfolioResponse = portfolioAnswers['whats up'];
        } else if (normalizedInput.includes('unusual')) {
            portfolioResponse = portfolioAnswers['unusual'];
        }

        // Simulate a brief loading time to make it feel more authentic
        setTimeout(() => {
            const modelMessage = { role: 'model', parts: [{ text: portfolioResponse }] };
            setMessages(prevMessages => [...prevMessages, modelMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleSuggestedQuestionClick = (question) => {
        setInput(question);
        sendMessage({ preventDefault: () => { } });
    };


    return (
        <>
            <nav className="bg-transparent h-16 overflow-hidden">
                <div className="mx-auto flex h-full w-dvw max-w-[1200px] items-center justify-between px-4 py-1">
                    {/* Logo and Mobile Menu Title */}
                    {isVisible ? (
                        <div className="text-white md:hidden">_menu</div>
                    ) : (
                        <Link href="/">
                            <div className="text-white relative flex items-center gap-3 transition-all duration-300 md:static">
                                <Logo />
                                <span className="text-white">fahad_hasan_siam</span>
                            </div>
                        </Link>
                    )}

                    {/* Mobile Menu Burger/Close Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle navigation menu">
                            {isVisible ? (
                                <CloseIcon className="text-white" />
                            ) : (
                                <BurgerIcon className="text-white" />
                            )}
                        </button>
                    </div>

                    {/* Navigation Menu (Mobile & Desktop) */}
                    <ul
                        className={`${isVisible ? 'flex' : 'hidden'} animate-fade-in bg-transparent absolute top-16 left-0 z-10 h-dvh w-dvw flex-col md:static md:top-0 md:flex md:h-full md:w-[72%] md:flex-row lg:w-[70%]`}
                    >
                        {navItems.map(({ label, href }) => (
                            // The `group` class on the `li` allows us to target children on hover
                            <li
                                key={label}
                                onClick={handleLinkClick}
                                className="group flex items-center px-4 text-2xl md:text-base md:last:ml-auto md:last:px-0 lg:px-8"
                            >
                                <Link
                                    href={href || '#'}
                                    // The `group-hover` utility targets this Link when the parent `li` is hovered
                                    className={`text-white w-full py-7 transition-all duration-150 transform group-hover:translate-y-0.5 group-hover:text-neutral-200 md:py-0 ${
                                        pathname === href ? 'text-neutral-200 cursor-text' : ''
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* AI Assistant Floating Button and Chat Window */}
            <div className="fixed top-4 right-8 z-50">
                <button
                    onClick={toggleAIChat}
                    className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 font-bold text-white shadow-lg transition-colors duration-200 hover:bg-sky-600"
                    aria-label="Toggle AI assistant chat"
                >
                    <ChatIcon className="h-4 w-4" />
                    <span className="text-xs">AI Assistant</span>
                </button>
                <div
                    className={`transition-transform duration-300 ease-in-out transform ${
                        showAI ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible'
                    } absolute top-12 right-0 h-[500px] w-80 rounded-lg bg-gray-950 p-6 shadow-xl ring-1 ring-neutral-800 flex flex-col overflow-x-hidden`}
                >
                    <button
                        onClick={toggleAIChat}
                        className="absolute right-2 top-2 text-neutral-400 hover:text-white transition-colors"
                        aria-label="Close AI chat window"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>
                    <h2 className="mb-4 text-center text-xl font-bold font-mono text-neutral-100">AI Recruiter</h2>
                    <div
                        ref={chatMessagesRef}
                        className="flex-grow max-h-[85%] overflow-y-auto pr-2 custom-scrollbar"
                    >
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-sm">
                                <p className="text-neutral-500 text-center">
                                    Hello! I'm an AI Recruiter. I can answer questions about Fahad's skills and projects.
                                    <br />
                                    <span className="text-neutral-400">Try asking:</span>
                                    <br />
                                    <span
                                        className="text-green-400 hover:text-green-300 cursor-pointer"
                                        onClick={() => handleSuggestedQuestionClick("What are your strengths?")}
                                    >
                                        "What are your strengths?"
                                    </span>
                                    <br />
                                    <span
                                        className="text-green-400 hover:text-green-300 cursor-pointer"
                                        onClick={() => handleSuggestedQuestionClick("Tell me about your most challenging project.")}
                                    >
                                        "Tell me about your most challenging project."
                                    </span>
                                </p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`my-2 rounded-md p-3 text-sm break-all ${
                                        msg.role === 'user' ? 'self-end bg-neutral-800 text-green-400' : 'self-start bg-neutral-800 text-sky-400'
                                    }`}
                                >
                                    <p className="font-bold">{msg.role === 'user' ? 'User:' : 'AI:'}</p>
                                    <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="my-2 rounded-md bg-neutral-800 p-3 text-sky-400 text-sm">
                                <p className="font-bold">AI:</p>
                                <p>Typing...</p>
                            </div>
                        )}
                    </div>
                    <form onSubmit={sendMessage} className="mt-4 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me..."
                            className="flex-grow rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 text-white placeholder-neutral-500 focus:border-sky-500 focus:outline-none text-sm"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="rounded-md bg-sky-500 px-2 py-0.5 font-bold text-white transition-colors hover:bg-sky-600 focus:outline-none"
                            disabled={isLoading}
                        >
                            Run
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Navbar;