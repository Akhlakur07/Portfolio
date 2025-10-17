// components/About.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Clean Code",
      description: "Writing maintainable and scalable code with best practices"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Design",
      description: "Crafting visually stunning and user-friendly interfaces"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast & Optimized",
      description: "Building performant applications with modern tools"
    }
  ];

  return (
    <section id="about" className="min-h-screen py-20 px-6 relative"> {/* Added top padding */}
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate frontend developer who loves to create 
            <span className="text-purple-400"> innovative digital experiences </span>
            with modern technologies. I specialize in React, JavaScript, and 
            creating unconventional yet intuitive user interfaces.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 group hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/20 to-black/30 backdrop-blur-sm border border-purple-500/10 rounded-2xl p-8"
        >
          <p className="text-lg text-gray-300 text-center">
            With expertise in <span className="text-purple-400">React, JavaScript, Python,</span> and various modern technologies, 
            I bring ideas to life through code and creativity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;