// components/Hero.jsx
import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { gsap } from "gsap";

const Hero = () => {
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const sparkleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        sparkleRef.current,
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

    // Floating animation for image and sparkle
    gsap.to(imageRef.current, {
      y: -5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(sparkleRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about").scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6">
      <div className="text-center relative z-10">
        {/* Animated Background Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-900/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Content */}
        <div className="relative">
          {/* Profile Image */}
          <motion.div
            ref={imageRef}
            className="relative mx-auto mb-8 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20"
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(168, 85, 247, 0.6)",
              transition: { duration: 0.3 },
            }}
          >
            <img
              src="https://i.ibb.co.com/rRb0yt6b/132182425.jpg"
              alt="Akhlakur Rahman"
              className="w-full h-full object-cover"
            />

            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div
            ref={sparkleRef}
            className="absolute -top-2 -right-4"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>

          <h1
            ref={nameRef}
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
              AKHLAKUR
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              RAHMAN
            </span>
          </h1>

          <div ref={titleRef} className="mb-8">
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              Frontend Developer
            </motion.p>
            <motion.p
              className="text-lg text-purple-400 max-w-2xl mx-auto leading-relaxed mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Crafting digital experiences with modern technologies and
              unconventional designs
            </motion.p>
          </div>

          {/* Animated Tech Stack Scroll */}
          <motion.div
            className="flex justify-center gap-8 mb-20 opacity-60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {["React", "JavaScript", "Python", "Node.js"].map((tech, index) => (
              <motion.span
                key={tech}
                className="text-sm text-gray-400"
                whileHover={{
                  scale: 1.2,
                  color: "#a855f7",
                  transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator - Moved further down with mt-16 */}
        <motion.button
          onClick={scrollToAbout}
          className="mt-16 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
              Explore More
            </span>
            <ChevronDown className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
          </div>
        </motion.button>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

export default Hero;
