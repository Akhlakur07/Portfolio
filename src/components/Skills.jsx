/* eslint-disable no-unused-vars */
// components/Skills.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Cloud, Settings } from 'lucide-react';
import { gsap } from 'gsap';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Skill logos mapping
  const skillLogos = {
    'React': '⚛️',
    'JavaScript': '🟨',
    'HTML/CSS': '🎨',
    'Tailwind CSS': '💨',
    'Node.js': '🟢',
    'Python': '🐍',
    'Django': '🎸',
    'MongoDB': '🍃',
    'Git/GitHub': '📚',
    'Firebase': '🔥',
    'Vercel': '▲',
    'Netlify': '🌐',
    'MySQL': '🐬',
    'Postman': '📬'
  };

  const skills = {
    frontend: {
      icon: Code,
      title: "Frontend",
      color: "from-purple-500 to-pink-500",
      items: [
        { name: "React", logo: "⚛️" },
        { name: "JavaScript", logo: "🟨" },
        { name: "HTML/CSS", logo: "🎨" },
        { name: "Tailwind CSS", logo: "💨" }
      ]
    },
    backend: {
      icon: Database,
      title: "Backend",
      color: "from-blue-500 to-cyan-500",
      items: [
        { name: "Node.js", logo: "🟢" },
        { name: "Python", logo: "🐍" },
        { name: "Django", logo: "🎸" },
        { name: "MongoDB", logo: "🍃" }
      ]
    },
    tools: {
      icon: Settings,
      title: "Tools & Platforms",
      color: "from-green-500 to-teal-500",
      items: [
        { name: "Git/GitHub", logo: "📚" },
        { name: "Firebase", logo: "🔥" },
        { name: "Vercel", logo: "▲" },
        { name: "Netlify", logo: "🌐" }
      ]
    },
    database: {
      icon: Cloud,
      title: "Database",
      color: "from-orange-500 to-red-500",
      items: [
        { name: "MySQL", logo: "🐬" },
        { name: "MongoDB", logo: "🍃" },
        { name: "Postman", logo: "📬" },
        { name: "Firebase", logo: "🔥" }
      ]
    }
  };

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();
      
      // Animate skill cards
      tl.fromTo(".skill-card",
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          stagger: 0.2 
        }
      );

      // Animate skill items
      tl.fromTo(".skill-item",
        { 
          opacity: 0, 
          scale: 0,
          rotation: -10
        },
        { 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 0.6, 
          ease: "back.out(1.7)",
          stagger: 0.1 
        },
        "-=0.5"
      );
    }
  }, [isInView]);

  const SkillItem = ({ skill, categoryKey, index }) => {
    return (
      <motion.div 
        className="skill-item"
        whileHover={{ 
          scale: 1.1,
          y: -5,
          transition: { type: "spring", stiffness: 400 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3 p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 group">
          <motion.span 
            className="text-2xl"
            whileHover={{ 
              scale: 1.2,
              rotate: 5
            }}
          >
            {skill.logo}
          </motion.span>
          <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
            {skill.name}
          </span>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" ref={sectionRef} className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SKILLS
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              & TECHNOLOGIES
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Grid - Unconventional Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(skills).map(([key, category], categoryIndex) => (
            <motion.div
              key={key}
              className="skill-card relative group"
              onHoverStart={() => setHoveredSkill(key)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              {/* Main Card */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 h-full overflow-hidden">
                
                {/* Animated Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Floating Icon */}
                <motion.div
                  className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br ${category.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                  animate={{
                    rotate: hoveredSkill === key ? 10 : 0,
                    scale: hoveredSkill === key ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  {/* Category Header */}
                  <motion.div 
                    className="flex items-center gap-4 mb-8"
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5
                      }}
                    >
                      <category.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">
                      {category.title}
                    </h3>
                  </motion.div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((skill, index) => (
                      <SkillItem
                        key={skill.name}
                        skill={skill}
                        categoryKey={key}
                        index={index}
                      />
                    ))}
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: hoveredSkill === key ? 1.02 : 1,
                  }}
                >
                  <div className="absolute inset-[2px] rounded-3xl bg-gray-900/95"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h4 className="text-lg text-gray-400 mb-6">Also experienced with</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {['Postman', 'Git', 'GitHub', 'Vercel', 'Netlify', 'Firebase', 'Django', 'MySQL'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 text-sm font-medium"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  borderColor: "rgba(168, 85, 247, 0.5)",
                  color: "#e9d5ff"
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 1 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;