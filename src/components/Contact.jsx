// components/Contact.jsx
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Briefcase, ArrowUpRight, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  
  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      id: 'email',
      icon: Mail,
      title: "Email",
      description: "For professional inquiries and collaborations",
      value: "ssrmm2000@gmail.com",
      action: "mailto:ssrmm2000@gmail.com",
      color: "from-purple-600 to-blue-600"
    },
    {
      id: 'whatsapp',
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick messages and instant communication",
      value: "+880 1305-685267",
      action: "https://wa.me/8801305685267",
      color: "from-green-600 to-emerald-600"
    },
    {
      id: 'phone',
      icon: Phone,
      title: "Phone",
      description: "Direct communication for urgent matters",
      value: "+880 1305-685267",
      action: "tel:+8801305685267",
      color: "from-blue-600 to-cyan-600"
    },
    {
      id: 'location',
      icon: MapPin,
      title: "Location",
      description: "Based in Dhaka, Bangladesh",
      value: "Mirpur, Dhaka",
      action: "#",
      color: "from-green-600 to-teal-600"
    },
    {
      id: 'github',
      icon: Github,
      title: "GitHub",
      description: "Explore my projects and contributions",
      value: "github.com/Akhlakur07",
      action: "https://github.com/Akhlakur07",
      color: "from-gray-700 to-gray-900"
    },
    {
      id: 'linkedin',
      icon: Linkedin,
      title: "LinkedIn",
      description: "Professional network and career updates",
      value: "linkedin.com/in/akhlakur-rahman",
      action: "https://www.linkedin.com/in/akhlakur-rahman-92ba312bb/",
      color: "from-blue-500 to-blue-700"
    }
  ];

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();
      
      // Animate contact cards
      tl.fromTo(".contact-card",
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          ease: "power3.out",
          stagger: 0.1 
        }
      );

      // Animate form
      tl.fromTo(".contact-form",
        { 
          opacity: 0, 
          x: 50
        },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8, 
          ease: "power3.out"
        },
        "-=0.5"
      );
    }
  }, [isInView]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 2000);
  };

  const ContactCard = ({ method }) => {
    return (
      <motion.a
        href={method.action}
        target={method.id === 'github' || method.id === 'linkedin' || method.id === 'whatsapp' ? '_blank' : '_self'}
        rel={method.id === 'github' || method.id === 'linkedin' || method.id === 'whatsapp' ? 'noopener noreferrer' : ''}
        className="contact-card group"
        onHoverStart={() => setActiveCard(method.id)}
        onHoverEnd={() => setActiveCard(null)}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
      >
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full overflow-hidden hover:border-purple-500/50 transition-all duration-300">
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg`}>
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            </div>
            
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-purple-400" />
            </motion.div>
          </div>

          {/* Contact Value */}
          <motion.p 
            className="text-purple-300 font-medium text-sm"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {method.value}
          </motion.p>

          {/* Hover Border Effect */}
          <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
            animate={{
              scale: activeCard === method.id ? 1.02 : 1,
            }}
          >
            <div className="absolute inset-[1px] rounded-2xl bg-gray-900/95"></div>
          </motion.div>
        </div>
      </motion.a>
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen py-20 px-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Briefcase className="w-12 h-12 text-purple-500" />
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Let's discuss how we can work together to bring your ideas to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Methods */}
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl font-bold text-white mb-8"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Contact Methods
            </motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <ContactCard key={method.id} method={method} />
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Send className="w-6 h-6 text-purple-500" />
                <h3 className="text-2xl font-bold text-white">Send a Message</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ 
                    scale: isSubmitting ? 1 : 1.02,
                    y: isSubmitting ? 0 : -2
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Send className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;