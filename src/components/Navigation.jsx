/* eslint-disable no-unused-vars */
// components/Navigation.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, User, Code, Folder, Mail, FileText } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const isUserScrolling = useRef(true);
  const scrollTimeout = useRef(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, href: '#home' },
    { id: 'about', label: 'About', icon: User, href: '#about' },
    { id: 'skills', label: 'Skills', icon: Code, href: '#skills' },
    { id: 'projects', label: 'Projects', icon: Folder, href: '#projects' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '#contact' },
  ];

  const resumeUrl = "https://drive.google.com/file/d/10KRxVozd2MdTzS67_fZhy51xlE5FBMv5/view?usp=sharing";

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!isUserScrolling.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const scrollPosition = window.scrollY + window.innerHeight / 3;
          let currentSection = 'home';

          navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                currentSection = item.id;
              }
            }
          });

          setActiveSection((prev) =>
            prev !== currentSection ? currentSection : prev
          );

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, id) => {
    setIsOpen(false);
    setActiveSection(id);
    isUserScrolling.current = false;

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isUserScrolling.current = true;
    }, 1000);
  };

  const handleResumeClick = () => {
    setIsOpen(false);
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block ${
          isScrolled
            ? 'backdrop-blur-md bg-gray-900/80 border border-gray-700/50'
            : 'bg-transparent'
        } rounded-2xl transition-all duration-300`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-1 p-2">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href, item.id);
              }}
              className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 group ${
                activeSection === item.id
                  ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>

              {activeSection === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 -z-10"
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          
          {/* Resume Button with Rainbow Border */}
          <motion.button
            onClick={handleResumeClick}
            className="relative px-6 py-3 rounded-xl font-medium text-sm bg-gradient-to-r from-purple-900/80 to-pink-900/80 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 group ml-2 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Rainbow Border Animation */}
            <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-rainbow border-0">
              <div className="w-full h-full rounded-xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 group-hover:from-purple-800/90 group-hover:to-pink-800/90 transition-all duration-300" />
            </div>
            
            <div className="relative flex items-center gap-2 z-10">
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Navigation Button */}
      <motion.button
        className={`fixed top-6 right-6 z-50 lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-md bg-gray-900/80 border border-gray-700/50'
            : 'bg-gray-900/50 backdrop-blur-sm border border-gray-700/30'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-24 right-6 z-40 lg:hidden bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4 min-w-[200px]"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href, item.id);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 group ${
                      activeSection === item.id
                        ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {activeSection === item.id && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      />
                    )}
                  </motion.a>
                ))}
                
                {/* Mobile Resume Button with Rainbow Border */}
                <motion.button
                  onClick={handleResumeClick}
                  className="relative px-4 py-3 rounded-xl font-medium text-sm text-white shadow-lg transition-all duration-300 w-full group overflow-hidden"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  {/* Rainbow Border Animation */}
                  <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 animate-rainbow border-0">
                    <div className="w-full h-full rounded-xl bg-gradient-to-r from-purple-900/80 to-pink-900/80 group-hover:from-purple-800/90 group-hover:to-pink-800/90 transition-all duration-300" />
                  </div>
                  
                  <div className="relative flex items-center gap-3 z-10">
                    <FileText className="w-4 h-4" />
                    <span>Resume</span>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Add rainbow animation to CSS */}
      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow {
          background-size: 400% 400%;
          animation: rainbow 3s ease infinite;
        }
      `}</style>
    </>
  );
};

export default Navigation;