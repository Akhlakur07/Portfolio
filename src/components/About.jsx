// components/About.jsx
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Palette, Zap, Globe } from 'lucide-react';
import { gsap } from 'gsap';

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();
      
      tl.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      cardsRef.current.forEach((card, index) => {
        tl.fromTo(card,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -50 : 50,
            rotation: index % 2 === 0 ? -5 : 5
          },
          { 
            opacity: 1, 
            x: 0, 
            rotation: 0, 
            duration: 0.8, 
            ease: "back.out(1.7)" 
          },
          "-=0.4"
        );
      });
    }
  }, [isInView]);

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable and scalable code with best practices",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Creative Design",
      description: "Crafting visually stunning and user-friendly interfaces",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description: "Optimizing for speed and smooth user experiences",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Globe,
      title: "Modern Tech",
      description: "Using cutting-edge technologies and frameworks",
      color: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Main Content - Unconventional Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div 
            ref={textRef}
            className="relative"
          >
            <motion.div
              className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-transparent rounded-2xl -z-10"
              animate={{
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.h2 
              className="text-5xl md:text-7xl font-bold mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ABOUT
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                ME
              </span>
            </motion.h2>
            
            <motion.div
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                I'm a passionate <span className="text-purple-400 font-semibold">Frontend Developer</span> with expertise in modern web technologies. 
                I love creating digital experiences that are not just functional but also visually captivating.
              </p>
              
              <p>
                My journey in web development started with curiosity and has evolved into a passion for 
                building innovative solutions. I specialize in React ecosystem and enjoy pushing the 
                boundaries of what's possible in the browser.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or designing unconventional user interfaces that challenge traditional web design norms.
              </p>
            </motion.div>

          </motion.div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                ref={el => cardsRef.current[index] = el}
                className="relative group"
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Card Background */}
                <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full overflow-hidden">
                  
                  {/* Animated Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Animated Border */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                    <div className="absolute inset-[2px] rounded-2xl bg-gray-900/95"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default About;