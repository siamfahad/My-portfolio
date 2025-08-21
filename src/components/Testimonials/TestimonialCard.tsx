'use client'

import { Testimonial } from '@/lib/types'
import { isInViewport } from '@/utils'
import Image from 'next/image'
import { FC, useEffect, useRef, useState } from 'react'

interface TestimonialCardProps {
  testimonial: Testimonial
  handleActiveCard: () => void
}

const TestimonialCard: FC<TestimonialCardProps> = ({
  testimonial: { name, title, feedback, image, skills, link },
  handleActiveCard,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [showTestimonialModal, setShowTestimonialModal] = useState(false)
  const [showSkillsModal, setShowSkillsModal] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver

    if (cardRef.current) {
      observer = isInViewport(cardRef.current, handleActiveCard)
    }

    return () => {
      observer?.disconnect()
    }
  }, [cardRef.current, handleActiveCard])

  const handleTestimonialModalClose = () => {
    setShowTestimonialModal(false);
  };

  const handleSkillsModalClose = () => {
    setShowSkillsModal(false);
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={() => setShowTestimonialModal(true)}
        className="bg-secondary border-border relative z-10 flex cursor-pointer flex-col items-center justify-between gap-4 rounded-2xl border p-4 text-center transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg sm:max-w-[425px]"
      >
        {/* Main Card Content */}
        <p className="text-neutral text-center leading-8 before:content-['“'] after:content-['”']">
          {feedback}
        </p>
        <div>
          <Image
            src={image}
            alt={name}
            // Conditionally set the width and height based on the name
            width={name === 'Pizza' ? 75 : 50}
            height={name === 'Pizza' ? 75 : 50}
            className="mx-auto rounded-full"
          />
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-neutral text-lg font-semibold hover:underline">
              {name}
            </a>
          ) : (
            <p className="text-neutral text-lg font-semibold">{name}</p>
          )}
          <p className="text-neutral/60 text-sm">{title}</p>
        </div>
      </div>

      {/* Main Testimonial Modal (Click-to-open) */}
      {showTestimonialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-secondary border-border relative w-full max-w-lg rounded-lg border p-6 shadow-xl animate-fade-in-up">
            <button
              onClick={handleTestimonialModalClose}
              className="text-neutral/60 absolute right-4 top-4 text-2xl hover:text-red-500 transition-colors"
            >
              &times;
            </button>
            <p className="text-neutral text-base leading-6 before:content-['“'] after:content-['”']">
              {feedback}
            </p>
            <div className="mt-4">
              <Image
                src={image}
                alt={name}
                width={name === 'Pizza' ? 75 : 50}
                height={name === 'Pizza' ? 75 : 50}
                className="mx-auto rounded-full"
              />
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-neutral text-lg font-semibold hover:underline">
                  {name}
                </a>
              ) : (
                <p className="text-neutral text-lg font-semibold">{name}</p>
              )}
              <p className="text-neutral/60 text-sm">{title}</p>
            </div>
             {/* The 'View Skills' button inside the pop-up */}
             {skills && skills.length > 0 && (
              <button
                onClick={() => setShowSkillsModal(true)}
                className="mt-4 text-sm text-accent hover:underline focus:outline-none"
              >
                View Skills
              </button>
            )}
          </div>
        </div>
      )}

      {/* Skills Modal (Opened from within the Testimonial Modal) */}
      {showSkillsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-primary border-border relative w-full max-w-sm rounded-lg border p-6 shadow-xl animate-fade-in-up">
            <button
              onClick={handleSkillsModalClose}
              className="text-neutral/60 absolute right-4 top-4 text-2xl hover:text-red-500 transition-colors"
            >
              &times;
            </button>
            <h3 className="text-neutral text-xl font-bold mb-4">Key Skills</h3>
            <ul className="list-inside space-y-2">
              {skills && skills.map((skill, index) => (
                <li key={index} className="text-neutral text-md font-medium">{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}

export default TestimonialCard