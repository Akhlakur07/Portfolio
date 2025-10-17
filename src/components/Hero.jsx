// components/Hero.jsx
import React, { useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  Rocket,
  Globe,
  Database,
  Cloud,
  Terminal,
  Server,
  ExternalLink,
  GitBranch,
  Zap,
  Users,
  Target,
} from "lucide-react";
import { gsap } from "gsap";
import TextType from "./TextType";

const Hero = () => {
  const imageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);
  const sparkleRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

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
      )
      .fromTo(
        leftPanelRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        rightPanelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
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

  const TechFlowItem = ({
    // eslint-disable-next-line no-unused-vars
    icon: Icon,
    text,
    delay = 0,
    color = "from-purple-500 to-pink-500",
  }) => (
    <motion.div
      className="flex items-center gap-3 p-4 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{
        scale: 1.05,
        x: 5,
      }}
    >
      <div
        className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center shadow-lg`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
        {text}
      </span>
    </motion.div>
  );

  const DataStream = ({ items, direction = "up" }) => (
    <div className="relative h-40 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex flex-col gap-3"
        animate={{
          y: direction === "up" ? [0, -100] : [0, 100],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-xs text-gray-400 font-mono"
          >
            <span className="text-green-400">▶</span>
            <span>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );

  const ProjectCard = ({ project, index }) => (
    <motion.div
      className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-700/30 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden"
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      
      {/* Project Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${project.gradient} flex items-center justify-center shadow-lg`}>
            <project.icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
              {project.title}
            </h4>
            <p className="text-gray-400 text-xs">{project.category}</p>
          </div>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
      </div>

      {/* Project Description */}
      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1 mb-3">
        {project.technologies.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded text-xs border border-gray-700/50 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-200 transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Project Stats */}
      <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-700/30 pt-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <GitBranch className="w-3 h-3" />
            <span>{project.stats.commits}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{project.stats.users}</span>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${project.status === 'Live' ? 'text-green-400' : 'text-yellow-400'}`}>
          <div className={`w-2 h-2 rounded-full ${project.status === 'Live' ? 'bg-green-400' : 'bg-yellow-400'}`} />
          <span>{project.status}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
        <motion.div
          className={`h-1 rounded-full bg-gradient-to-r ${project.gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${project.progress}%` }}
          transition={{ duration: 1.5, delay: 1 + index * 0.2 }}
        />
      </div>
    </motion.div>
  );

  const projects = [
    {
      title: "Learnly",
      category: "Education Platform",
      description: "Interactive learning platform with real-time coding exercises and instant feedback.",
      technologies: ["React", "Firebase", "MongoDB", "Tailwind"],
      gradient: "from-purple-500 to-pink-500",
      icon: Target,
      stats: { commits: "1.2k", users: "500+" },
      status: "Live",
      progress: 95
    },
    {
      title: "StackVault",
      category: "Tech Community",
      description: "Platform for discovering and showcasing tech products, tools, and applications.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      gradient: "from-blue-500 to-cyan-500",
      icon: Zap,
      stats: { commits: "890", users: "2.1k" },
      status: "Live",
      progress: 88
    },
    {
      title: "VolunteerHub",
      category: "Social Platform",
      description: "Volunteer management system connecting organizations with passionate individuals.",
      technologies: ["React", "Firebase", "CSS3", "JavaScript"],
      gradient: "from-green-500 to-teal-500",
      icon: Users,
      stats: { commits: "650", users: "1.5k" },
      status: "Live",
      progress: 92
    }
  ];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden"
    >
      <div className="text-center relative z-10 w-full max-w-7xl mx-auto">
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

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Panel - Tech Stack Flow */}
          <motion.div ref={leftPanelRef} className="hidden lg:block pt-[227px] pr-13">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 h-[500px] overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Tech Flow</h3>
              </div>

              <div className="space-y-2">
                <TechFlowItem
                  icon={Rocket}
                  text="Modern Frameworks"
                  delay={0.1}
                  color="from-purple-500 to-pink-500"
                />
                <TechFlowItem
                  icon={Globe}
                  text="Web Technologies"
                  delay={0.2}
                  color="from-blue-500 to-cyan-500"
                />
                <TechFlowItem
                  icon={Database}
                  text="Database Systems"
                  delay={0.3}
                  color="from-green-500 to-teal-500"
                />
                <TechFlowItem
                  icon={Cloud}
                  text="Cloud Platforms"
                  delay={0.4}
                  color="from-orange-500 to-red-500"
                />
                <TechFlowItem
                  icon={Server}
                  text="Backend Services"
                  delay={0.5}
                  color="from-yellow-500 to-orange-500"
                />
              </div>

              {/* Animated Data Stream */}
              <div className="mt-8 border-t border-gray-700/30 pt-4">
                <DataStream
                  items={[
                    "React v18.2.0",
                    "Node.js v20.0.0",
                    "TypeScript v5.0.0",
                    "Tailwind v3.3.0",
                    "MongoDB v6.0.0",
                    "Firebase v10.0.0",
                    "Vercel Platform",
                    "Netlify Edge",
                  ]}
                  direction="up"
                />
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Main Content */}
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center relative z-10">
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
                className="absolute -top-0.5 right-180"
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
                  <TextType
                    text={[
                      "Frontend Developer",
                      "AI Enthusiast",
                      "Full-Stack Developer",
                    ]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                  />
                </motion.p>
                <motion.p
                  className="text-lg text-purple-400 max-w-2xl mx-auto leading-relaxed mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  Crafting digital experiences with modern technologies and
                  creative architecture.
                </motion.p>
              </div>

              {/* Interactive Code Snippet */}
              <motion.div
                className="max-w-md mx-auto mb-4 bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-6 text-left overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(168, 85, 247, 0.6)",
                }}
              >
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <pre className="text-sm text-gray-300 font-mono">
                  <code>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-400">developer</span> = {"{"}
                    {"\n"}
                    {"  "}
                    <span className="text-gray-400">passion:</span>{" "}
                    <span className="text-green-400">
                      "creating digital magic"
                    </span>
                    ,{"\n"}
                    {"  "}
                    <span className="text-gray-400">focus:</span>{" "}
                    <span className="text-green-400">
                      "innovative solutions"
                    </span>
                    ,{"\n"}
                    {"  "}
                    <span className="text-gray-400">tech:</span>{" "}
                    <span className="text-yellow-400">[</span>
                    <span className="text-green-400">"React"</span>
                    <span className="text-yellow-400">, </span>
                    <span className="text-green-400">"Next.js"</span>
                    <span className="text-yellow-400">, </span>
                    <span className="text-green-400">"AI/ML"</span>
                    <span className="text-yellow-400">]</span>
                    {"\n"}
                    {"}"}
                  </code>
                </pre>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.button
                onClick={scrollToAbout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-400 group-hover:text-purple-400 transition-colors">
                    Explore More
                  </span>
                  <ChevronDown className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </div>
              </motion.button>
            </div>
          </div>

          {/* Right Panel - Upgraded Project Highlights */}
          <motion.div ref={rightPanelRef} className="hidden lg:block pt-[227px] pl-13">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 h-[500px] overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-6 h-11 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Featured Projects</h3>
              </div>

              <div className="space-y-4 h-[380px] overflow-y-auto pr-2">
                {projects.map((project, index) => (
                  <ProjectCard key={project.title} project={project} index={index} />
                ))}
              </div>

            </div>
          </motion.div>
        </div>
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