'use client';
import { useState } from 'react';
import useRoleSwitcher from '@/hooks/useRoleSwitcher';
import useRotatingAnimation from '@/hooks/useRotatingAnimation';
import Image from 'next/image';
import { HeroImage } from '../../utils/images';
import Ellipse from './Ellipse';

// Import social media icons from the correct libraries
import { FaFacebook, FaLinkedin, FaWhatsapp, FaInstagram, FaXTwitter, FaConnectdevelop } from 'react-icons/fa6';
import { FaSnapchatGhost } from 'react-icons/fa';

const Hero = () => {
  const [modalContent, setModalContent] = useState(null);
  const ellipseRef = useRotatingAnimation();
  const role = useRoleSwitcher({
    roles: [
      'FULLSTACK DEVELOPER',
      'PRODUCT DESIGNER',
      'SOLOPRENEUR',
      'CLOUD SOLUTIONS ARCHITECT',
    ],
  });

  const handleModalOpen = (content) => {
    setModalContent(content);
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  const coursesList = [
    'Communications for Media Studies',
    'Mathematics I for Computer Studies',
    'The Art of Script Programming',
    'Software Development',
    'Database Essentials',
    'Web Authoring Fundamentals',
    'Communications for Project Development',
    'The IT Entrepreneur',
    'Mathematics II for Computer Studies',
    'Client Server Web Solutions',
    'Object Oriented Software Development',
    'Contemporary Storage Systems Programming',
    'Contemporary Social Issues',
    'Graphically-Driven Project Planning and Design',
    'Rapid Application Development (RAD) Client-Server Project',
    'Operating System Administration & Networking Fundamentals',
    'Design Patterns for Enterprise Development',
    'Critical Thinking',
    'Statistics for Computer Programmers',
    'Community Sponsored Project',
    'Mobile and Windows Store Development',
    'Network Security and Large Data Solutions',
    'Positive Psychology',
  ];

  const skillsList = [
    'JavaScript',
    'Data Entry',
    'C#',
    'SQL Server Management Studio',
    'Microsoft Power Apps',
    'SQL',
    'Software Development',
    'Microsoft Power BI',
    'PostgreSQL',
    'Database Design',
    'React.js',
    'SharePoint',
    'WebSocket',
    'Django',
    'Databases',
    'Web Development',
    'Object-Oriented Programming (OOP)',
    'Object Oriented Design',
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <FaLinkedin size={24} />, url: 'https://www.linkedin.com/in/fahadsiam' },
    { name: 'WhatsApp', icon: <FaWhatsapp size={24} />, url: 'https://wa.me/17803640343' },
    { name: 'X', icon: <FaXTwitter size={24} />, url: 'https://x.com/siamfahad58?s=21' },
    { name: 'Facebook', icon: <FaFacebook size={24} />, url: 'https://www.facebook.com/share/1ZQ83Vf7CA/?mibextid=wwXIfr' },
    { name: 'Instagram', icon: <FaInstagram size={24} />, url: 'https://www.instagram.com/fahad__._.__?igsh=d3c1MW5jZXAzcG55&utm_source=qr' },
    { name: 'Snapchat', icon: <FaSnapchatGhost size={24} />, url: 'https://t.snapchat.com/Obd4aGwG' },
  ];

  return (
    <>
      <style jsx>{`
        .liquid-button {
          position: relative;
          overflow: hidden;
          transition: color 0.3s ease;
          z-index: 1;
        }
        .liquid-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 80px;
          height: 80px;
          background-color: #37d65b; /* Accent color */
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s ease-out;
          z-index: -1;
        }
        .liquid-button:hover::before {
          transform: translate(-50%, -50%) scale(1.5);
        }
      `}</style>
      <section className={`bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat transition-filter duration-300 ${modalContent ? 'blur-sm' : ''}`}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
          <div className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]">
            <h1>
              <span className="text-neutral mb-2 block text-3xl font-bold">
                Hi - I'm Fahad Hasan Siam
              </span>
              <span className="text-accent block text-[1.75rem] font-bold">
                {role}
              </span>
            </h1>

            <h2 className="text-neutral mt-3">
              Crafting innovative solutions to solve real-world problems
            </h2>

            <div className="mt-6 flex flex-wrap gap-6">
              <button
                onClick={() => handleModalOpen('socials')}
                aria-label="Connect with me"
                className="bg-accent min-w-32 cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E] transition-transform duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                <FaConnectdevelop className="text-xl" /> Connect
              </button>
              <a
                href="https://github.com/siamfahad"
                aria-label="View GitHub Profile"
                className="text-neutral bg-secondary cursor-pointer rounded-lg px-[14px] py-[10px] text-sm transition-transform duration-300 hover:scale-105 hover:bg-neutral hover:text-primary"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center min-h-[18.75rem] lg:min-h-[35rem] flex-wrap md:flex-nowrap">
            {/* Image Container */}
            <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem] flex-shrink-0">
              <Image
                src={HeroImage}
                fill={true}
                priority={true}
                sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
                alt="Fahad Hasan Siam - Full Stack Developer"
                className="object-contain p-7"
              />
              <Ellipse
                ref={ellipseRef}
                className="absolute top-0 left-0 size-56 transition-transform duration-500 ease-out sm:size-60 md:size-[20rem] lg:size-[25.75rem]"
              />
            </div>
            {/* Study Details Container */}
            <div className="text-neutral mt-8 md:mt-0 md:ml-8 text-center md:text-left flex-shrink-0">
              <p className="font-bold text-base mb-1">EDUCATION</p>
              <a href="https://www.niagaracollege.ca/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/1/12/Niagara-college_vectorized.svg"
                  alt="Niagara College Logo"
                  width={90}
                  height={25}
                  className="mx-auto md:mx-0 mb-2"
                />
              </a>
              <p className="text-xs mb-1">
                <strong>Degree:</strong> Advance Diploma in Computer programming
              </p>
              <div className="flex justify-center md:justify-start gap-1">
                <button
                  onClick={() => handleModalOpen('skills')}
                  className="liquid-button bg-secondary text-neutral rounded-md px-2 py-1 text-xs cursor-pointer hover:text-primary"
                >
                  <span className="relative z-10">Skills</span>
                </button>
                <button
                  onClick={() => handleModalOpen('courses')}
                  className="liquid-button bg-secondary text-neutral rounded-md px-2 py-1 text-xs cursor-pointer hover:text-primary"
                >
                  <span className="relative z-10">Courses</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={handleModalClose}
          ></div>
          <div className="bg-primary p-6 rounded-lg shadow-lg relative z-10 w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-accent mb-4">
              {modalContent === 'skills' ? 'Skills' : modalContent === 'courses' ? 'Courses' : 'Connect with me'}
            </h3>
            {modalContent === 'courses' ? (
              <ul className="list-disc list-inside text-neutral text-sm">
                {coursesList.map((course, index) => (
                  <li key={index} className="mb-1">{course}</li>
                ))}
              </ul>
            ) : modalContent === 'skills' ? (
              <ul className="list-disc list-inside text-neutral text-sm">
                {skillsList.map((skill, index) => (
                  <li key={index} className="mb-1">{skill}</li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-secondary text-neutral flex items-center justify-center gap-2 rounded-lg py-3 px-4 transition-transform duration-300 hover:scale-105 hover:bg-accent hover:text-primary"
                  >
                    {link.icon}
                    <span className="text-sm font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            )}
            <button
              onClick={handleModalClose}
              className="mt-6 bg-accent text-[#00071E] px-4 py-2 rounded-lg text-sm transition-transform duration-300 hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;