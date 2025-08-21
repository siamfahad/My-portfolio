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

type ModalContent = 'skills' | 'courses' | 'socials';

const Hero = () => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);
  const ellipseRef = useRotatingAnimation();
  const role = useRoleSwitcher({
    roles: [
      'FULLSTACK DEVELOPER',
      'PRODUCT DESIGNER',
      'SOLOPRENEUR',
      'CLOUD SOLUTIONS ARCHITECT',
    ],
  });

  const handleModalOpen = (content: ModalContent) => {
    setModalContent(content);
  };

  const handleModalClose = () => {
    setModalContent(null);
  };

  const coursesList: string[] = [
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

  const skillsList: string[] = [
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

  const socialLinks: { name: string; icon: JSX.Element; url: string }[] = [
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
          background-color: #37d65b;
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s ease-out;
          z-index: -1;
        }
        .liquid-button:hover::before {
          transform: translate(-50%, -50%) scale(1.5);
        }
      `}</style>

      <section className={`bg-primary ... ${modalContent ? 'blur-sm' : ''}`}>
        {/* ... rest of your layout unchanged ... */}
      </section>

      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleModalClose}></div>
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
