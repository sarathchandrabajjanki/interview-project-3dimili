'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [displayedSubtext, setDisplayedSubtext] = useState('');
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
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
    const handleScroll = () => {
      if (!heroSectionRef.current) return;
      
      const rect = heroSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const scrollPosition = window.scrollY;
      const sectionTop = rect.top + scrollPosition;
      const sectionBottom = sectionTop + sectionHeight;
      
      let progress = 0;
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        progress = (scrollPosition - sectionTop) / sectionHeight;
      } else if (scrollPosition > sectionBottom) {
        progress = 1;
      }
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      ref={heroSectionRef}
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

      <div className="absolute inset-0 overflow-visible" aria-hidden="true">
        {[
          { icon: 'cube', color: 'purple', position: { left: '10%', top: '15%' }, delay: 0, title: '3D Models', description: 'Browse thousands of high-quality 3D models for your projects. Filter by category, style, format, and more.' },
          { icon: 'users', color: 'purple', position: { left: '8%', top: '40%' }, delay: 0.2, title: 'Community', description: 'Join a vibrant community of creators and collectors. Share, collaborate, and grow together.' },
          { icon: 'download', color: 'blue', position: { left: '12%', top: '65%' }, delay: 0.4, title: 'Downloads', description: 'Access your purchased models anywhere, anytime. Download instantly after purchase.' },
          { icon: 'heart', color: 'red', position: { left: '15%', top: '85%' }, delay: 0.6, title: 'Favorites', description: 'Save your favorite models to your wishlist. Build your collection of preferred assets.' },
          { icon: 'star', color: 'yellow', position: { left: '35%', top: '80%' }, delay: 0.8, title: 'Featured', description: 'Discover top-rated and featured models. Handpicked quality assets for your projects.' },
          { icon: 'headphones', color: 'gray', position: { left: '55%', top: '82%' }, delay: 1, title: 'Support', description: 'Get help when you need it. Our support team is here 24/7 to assist you.' },
          { icon: 'grid', color: 'orange', position: { left: '85%', top: '88%' }, delay: 1.2, title: 'Pricing', description: 'Flexible pricing options for creators and businesses. Choose the plan that fits you.' },
          { icon: 'upload', color: 'green', position: { left: '88%', top: '60%' }, delay: 1.4, title: 'Upload', description: 'Share your 3D models with the world. Start selling and earning from your creations.' },
          { icon: 'search', color: 'blue', position: { left: '90%', top: '35%' }, delay: 1.6, title: 'Search', description: 'Find exactly what you need. Advanced search filters and smart recommendations.' },
          { icon: 'cart', color: 'green', position: { left: '88%', top: '12%' }, delay: 1.8, title: 'Checkout', description: 'Fast and secure payments for your 3D model purchases. Multiple payment options available.' },
        ].map((item, index) => {
          const colorClasses = {
            purple: 'stroke-purple-500',
            blue: 'stroke-blue-500',
            red: 'stroke-red-500',
            yellow: 'stroke-yellow-500',
            gray: 'stroke-gray-400',
            orange: 'stroke-orange-500',
            green: 'stroke-green-500',
          };

          const iconPaths = {
            cube: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            ),
            users: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            ),
            download: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            ),
            heart: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            ),
            star: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            ),
            headphones: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            ),
            grid: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            ),
            upload: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            ),
            search: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            ),
            cart: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            ),
          };

          const leftPercent = parseFloat(item.position.left.replace('%', '')) || 0;
          const topPercent = parseFloat(item.position.top.replace('%', '')) || 0;
          
          const tooltipPosition = topPercent < 30
            ? { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '12px' }
            : { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '12px' };
          
          const tooltipAlignment = leftPercent > 70
            ? { ...tooltipPosition, right: '0', left: 'auto', transform: 'none' }
            : leftPercent < 30
            ? { ...tooltipPosition, left: '0', transform: 'none' }
            : tooltipPosition;

          const centerX = 50;
          const centerY = 50;
          
          const scrollOffsetX = (centerX - leftPercent) * scrollProgress * 0.8;
          const scrollOffsetY = (centerY - topPercent) * scrollProgress * 0.8;
          const scrollScale = 1 - scrollProgress * 0.3;

          const adjustedLeft = leftPercent + scrollOffsetX;
          const adjustedTop = topPercent + scrollOffsetY;

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${adjustedLeft}%`,
                top: `${adjustedTop}%`,
                transform: `scale(${scrollScale})`,
                transition: 'all 0.1s linear',
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: item.delay },
                  scale: { duration: 0.5, delay: item.delay },
                  y: {
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: item.delay,
                  },
                  rotate: {
                    duration: 4 + index * 0.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: item.delay,
                  },
                }}
                onMouseEnter={() => setHoveredIcon(index)}
                onMouseLeave={() => setHoveredIcon(null)}
              >
                <div className="w-16 h-16 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 flex items-center justify-center hover:bg-gray-700/50 transition-colors duration-300 cursor-pointer">
                <svg
                  className={`w-8 h-8 ${colorClasses[item.color as keyof typeof colorClasses]}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {iconPaths[item.icon as keyof typeof iconPaths]}
                </svg>
              </div>

              <AnimatePresence>
                {hoveredIcon === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute w-72 sm:w-80 bg-gray-800/95 backdrop-blur-md rounded-lg border-2 border-dashed border-gray-600 p-4 shadow-2xl z-50"
                    style={tooltipAlignment}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700/50 flex items-center justify-center">
                        <svg
                          className={`w-6 h-6 ${colorClasses[item.color as keyof typeof colorClasses]}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {iconPaths[item.icon as keyof typeof iconPaths]}
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight whitespace-pre-line"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem]"
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

