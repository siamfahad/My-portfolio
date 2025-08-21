'use client';

import React, { useState, useRef, useEffect } from 'react';

// ----------------------
// Prop Types
// ----------------------
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPending: boolean;
}

// ----------------------
// Input Component
// ----------------------
const Input: React.FC<InputProps> = ({ label, id, ...props }) => (
  <div className="mb-4 font-mono">
    <label htmlFor={id} className="block text-sm font-medium text-green-500 mb-1">
      {label}
    </label>
    <input
      id={id}
      className="w-full px-4 py-2 border border-green-500 bg-black rounded-lg text-white placeholder-neutral-700
      focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors
      [text-shadow:_0_0_5px_rgba(0,255,0,0.5)] [box-shadow:_0_0_10px_rgba(0,255,0,0.5)]
      bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 text-transparent bg-clip-text"
      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      {...props}
    />
  </div>
);

// ----------------------
// Textarea Component
// ----------------------
const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => (
  <div className="mb-4 font-mono">
    <label htmlFor={id} className="block text-sm font-medium text-green-500 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      className="w-full px-4 py-2 border border-green-500 bg-black rounded-lg text-white placeholder-neutral-700
      focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors
      [text-shadow:_0_0_5px_rgba(0,255,0,0.5)] [box-shadow:_0_0_10px_rgba(0,255,0,0.5)]
      bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 text-transparent bg-clip-text"
      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
      {...props}
    />
  </div>
);

// ----------------------
// Button Component
// ----------------------
const Button: React.FC<ButtonProps> = ({ text, isPending, ...props }) => {
  const [animatedText, setAnimatedText] = useState('');
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPending) {
      const fullText = '> Submitting_form...';
      let charIndex = 0;
      setAnimatedText('');

      animationRef.current = setInterval(() => {
        if (charIndex >= fullText.length) {
          if (animationRef.current) clearInterval(animationRef.current);
          return;
        }
        setAnimatedText(fullText.slice(0, charIndex + 1));
        charIndex++;
      }, 75);
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      setAnimatedText('');
    }

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isPending]);

  return (
    <button
      type="submit"
      className="w-full py-3 px-6 rounded-lg text-black font-semibold font-mono transition-all duration-300 transform bg-gradient-to-r from-green-400 to-green-500 hover:scale-105 active:scale-95 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed
      [text-shadow:_0_0_5px_rgba(0,0,0,0.8)] [box-shadow:_0_0_15px_rgba(0,255,0,0.8)]"
      disabled={isPending}
      {...props}
    >
      {isPending ? animatedText : text}
    </button>
  );
};

// ----------------------
// Contact Form
// ----------------------
const ContactForm: React.FC = () => {
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
  const [showSubmissionEffect, setShowSubmissionEffect] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const formUrl = 'https://formspree.io/f/meozbdoy';

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setStatus({ success: true, message: 'Message sent successfully!' });
        event.currentTarget.reset();
      } else {
        const errorData = await response.json();
        setStatus({ success: false, message: errorData.error || 'Failed to send message.' });
      }
    } catch {
      setStatus({ success: false, message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsPending(false);
    }
  };

  // Matrix Rain Effect
  useEffect(() => {
    let animationFrameId: number;

    if (isPending && canvasRef.current) {
      setShowSubmissionEffect(true);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const characters =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?/~';
      const fontSize = 16;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    } else {
      cancelAnimationFrame(animationFrameId);
      setShowSubmissionEffect(false);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPending]);

  useEffect(() => {
    if (status?.success) {
      setShowSuccessModal(true);
      const timeout = setTimeout(() => {
        setShowSuccessModal(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [status]);

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setStatus(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${
          showSubmissionEffect ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        } transition-all duration-300`}
      >
        <Input label="Full name" id="name" name="name" placeholder="Your name here" required />
        <Input
          label="Email address"
          id="email"
          type="email"
          name="_replyto"
          placeholder="Your email address here"
          required
        />
        <Input label="Subject" id="subject" name="_subject" placeholder="Your subject here" />
        <Textarea
          label="Message"
          id="message"
          name="message"
          placeholder="Your message here"
          rows={7}
          required
        />
        {status?.message && !status?.success && (
          <p className="my-2 font-light text-red-600">{status.message}</p>
        )}
        <Button text="Submit" isPending={isPending} />
      </form>

      {showSubmissionEffect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-500">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="relative text-white z-10 text-center animate-fade-in">
            <h2 className="text-4xl font-bold font-mono text-green-500 [text-shadow:0_0_8px_rgba(0,255,0,0.8)]">
              &gt; SUBMISSION_IN_PROGRESS...
            </h2>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-green-500 rounded-lg p-8 shadow-[0_0_20px_rgba(0,255,0,0.5)] text-center relative max-w-sm w-full animate-pop-in">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-4 text-3xl text-green-500 hover:text-white"
            >
              &times;
            </button>
            <p className="text-green-500 text-6xl mb-4 [text-shadow:0_0_10px_rgba(0,255,0,0.8)]">
              &gt;_
            </p>
            <h3 className="text-2xl font-bold font-mono text-white mb-2">GRANTED.</h3>
            <p className="text-green-500 font-mono">
              Message_Transmitted_Successfully. Standby_for_response.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
