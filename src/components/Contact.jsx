/* eslint-disable no-unused-vars */
// components/Contact.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Briefcase,
  ArrowUpRight,
  MessageCircle,
  Calendar,
  Sparkles,
} from "lucide-react";
import { gsap } from "gsap";
import Shuffle from "./Shuffle";

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [activeCard, setActiveCard] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  const contactMethods = [
    {
      id: "email",
      icon: Mail,
      title: "Email",
      description: "For professional inquiries and collaborations",
      value: "akhlak.ur433@gmail.com",
      action: "mailto:akhlak.ur433@gmail.com",
      color: "from-purple-600 to-blue-600",
      copyable: true,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick messages and instant communication",
      value: "+880 1305-685267",
      action: "https://wa.me/8801305685267",
      color: "from-green-600 to-emerald-600",
      copyable: true,
    },
    {
      id: "phone",
      icon: Phone,
      title: "Phone",
      description: "Direct communication for urgent matters",
      value: "+880 1305-685267",
      action: "tel:+8801305685267",
      color: "from-blue-600 to-cyan-600",
      copyable: true,
    },
    {
      id: "location",
      icon: MapPin,
      title: "Location",
      description: "Based in Dhaka, Bangladesh",
      value: "Mirpur, Dhaka",
      action: "#",
      color: "from-green-600 to-teal-600",
      copyable: false,
    },
    {
      id: "github",
      icon: Github,
      title: "GitHub",
      description: "Explore my projects and contributions",
      value: "github.com/Akhlakur07",
      action: "https://github.com/Akhlakur07",
      color: "from-gray-700 to-gray-900",
      copyable: false,
    },
    {
      id: "linkedin",
      icon: Linkedin,
      title: "LinkedIn",
      description: "Professional network and career updates",
      value: "linkedin.com/in/akhlakur-rahman",
      action: "https://www.linkedin.com/in/akhlakur-rahman-92ba312bb/",
      color: "from-blue-500 to-blue-700",
      copyable: false,
    },
  ];

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();

      // Animate contact cards
      tl.fromTo(
        ".contact-card",
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        }
      );

      // Animate CTA section
      tl.fromTo(
        ".cta-section",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }
  }, [isInView]);

  const handleCopy = async (text, itemId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const ContactCard = ({ method }) => {
    return (
      <motion.div
        className="contact-card group"
        onHoverStart={() => setActiveCard(method.id)}
        onHoverEnd={() => setActiveCard(null)}
        whileHover={{
          y: -8,
          transition: { duration: 0.3 },
        }}
      >
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 h-full overflow-hidden hover:border-purple-500/50 transition-all duration-300">
          {/* Gradient Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
          />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-lg`}
              >
                <method.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            </div>

            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {method.action !== "#" ? (
                <a
                  href={method.action}
                  target={method.id === "github" || method.id === "linkedin" || method.id === "whatsapp" ? "_blank" : "_self"}
                  rel={method.id === "github" || method.id === "linkedin" || method.id === "whatsapp" ? "noopener noreferrer" : ""}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              ) : (
                <MapPin className="w-5 h-5 text-gray-500" />
              )}
            </motion.div>
          </div>

          {/* Contact Value with Copy Functionality */}
          <div className="flex items-center justify-between">
            <motion.p
              className="text-purple-300 font-medium text-sm"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {method.value}
            </motion.p>
            
            {method.copyable && (
              <motion.button
                onClick={() => handleCopy(method.value, method.id)}
                className="text-xs text-gray-400 hover:text-purple-400 transition-colors px-2 py-1 rounded-lg hover:bg-purple-500/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedItem === method.id ? (
                  <span className="text-green-400">✓ Copied</span>
                ) : (
                  "Copy"
                )}
              </motion.button>
            )}
          </div>

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
      </motion.div>
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-23 px-6 relative"
    >
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
            initial={false}
          >
            <Shuffle
              text="Get in Touch"
              shuffleDirection="right"
              duration={1}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={false}
              respectReducedMotion={true}
            />
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ready to bring your ideas to life? Let's connect and create something amazing together
          </motion.p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {contactMethods.map((method, index) => (
            <ContactCard key={method.id} method={method} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;