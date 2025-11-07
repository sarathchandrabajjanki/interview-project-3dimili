'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedSubtext, setDisplayedSubtext] = useState('');
  const fullText = 'Discover, Buy, and Sell\nDigital Products';
  const fullSubtext = 'Your one-stop digital platform for 3D models and digital creations.\nJoin our community of creators and collectors today.';
  const typingIndexRef = useRef(0);
  const subtextTypingIndexRef = useRef(0);

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.fromTo(
        backgroundRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' }
      );
    }

    particleRefs.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: Math.sin(index) * 20,
          x: Math.cos(index) * 15,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2,
        });
      }
    });
  }, []);

  useEffect(() => {
    typingIndexRef.current = 0;
    subtextTypingIndexRef.current = 0;
    const typingSpeed = 100;
    const subtextTypingSpeed = 50;

    const typeSubtext = () => {
      if (subtextTypingIndexRef.current < fullSubtext.length) {
        setDisplayedSubtext(fullSubtext.slice(0, subtextTypingIndexRef.current + 1));
        subtextTypingIndexRef.current++;
        setTimeout(typeSubtext, subtextTypingSpeed);
      }
    };

    const typeText = () => {
      if (typingIndexRef.current < fullText.length) {
        setDisplayedText(fullText.slice(0, typingIndexRef.current + 1));
        typingIndexRef.current++;
        setTimeout(typeText, typingSpeed);
      } else {
        setTimeout(() => typeSubtext(), 500);
      }
    };

    const startDelay = setTimeout(() => typeText(), 800);

    return () => {
      clearTimeout(startDelay);
      typingIndexRef.current = 0;
      subtextTypingIndexRef.current = 0;
      setDisplayedText('');
      setDisplayedSubtext('');
    };
  }, [fullText, fullSubtext]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99] as const, 
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99] as const,
      },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-16"
      aria-label="Hero section"
      role="banner"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90"
        aria-hidden="true"
      />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) particleRefs.current[i] = el;
            }}
            className="absolute w-2 h-2 bg-indigo-500/20 rounded-full blur-sm"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.h1
            variants={titleVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight whitespace-pre-line"
          >
            {displayedText}
            {displayedText.length < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.5, 0.5, 1],
                  ease: 'linear',
                }}
                className="inline-block ml-1 text-white"
              >
                |
              </motion.span>
            )}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem]"
          >
            {displayedSubtext}
            {displayedSubtext && displayedSubtext.length < fullSubtext.length && (
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.5, 0.5, 1],
                  ease: 'linear',
                }}
                className="inline-block ml-1 text-gray-300"
              >
                |
              </motion.span>
            )}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.a
              href="/products"
              className="group relative px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg overflow-hidden transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Explore all products"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore all products</span>
            </motion.a>

          </motion.div>

        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

