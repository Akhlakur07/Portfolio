/* eslint-disable no-unused-vars */
// components/Projects.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import Shuffle from "./Shuffle";

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      title: "Learnly - Learn by Building",
      description:
        "An interactive learning platform where users learn programming concepts by building real projects with hands-on coding exercises and instant feedback.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://learnly-auth.web.app/",
      githubLink: "https://github.com/Akhlakur07/learnly",
      technologies: ["React", "Firebase", "Tailwind", "MongoDB"],
      category: "Education",
    },
    {
      title: "StackVault - Tech Product Discovery",
      description:
        "A platform where developers and creators can discover, share, and showcase their tech products including web apps, AI tools, software, games, and mobile applications.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://stack-web-6def0.web.app/",
      githubLink: "https://github.com/Akhlakur07/StackSphere-client-side",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      category: "Tech Community",
    },
    {
      title: "VolunteerHub – Volunteer Management",
      description:
        "A platform connecting volunteers with organizations, featuring event management, scheduling, and real-time communication tools.",
      image:
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://volunteer-auth-e1a75.web.app/",
      githubLink: "https://github.com/Akhlakur07/volunteer-client-side",
      technologies: ["React", "Firebase", "CSS3", "JavaScript"],
      category: "Social Good",
    },
    {
      title: "TaskForce - Freelance Task Management",
      description:
        "A comprehensive platform for freelancers to manage projects, track time, invoice clients, and collaborate with team members efficiently.",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://freelance-auth-96883.web.app/",
      githubLink: "https://github.com/Akhlakur07/freelance-web-client",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "Productivity",
    },
    {
      title: "Green Fork",
      description:
        "Sustainable food delivery platform connecting eco-conscious consumers with local restaurants that prioritize environmental responsibility.",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://green-fork-17647.web.app/",
      githubLink: "https://github.com/Akhlakur07/Green-Fork",
      technologies: ["React", "Firebase", "Tailwind", "API"],
      category: "Food Tech",
    },
    {
      title: "Law BD - Legal Services Platform",
      description:
        "A digital platform connecting clients with legal professionals, featuring case management, document sharing, and virtual consultations.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      liveLink: "https://matt-murdock.netlify.app/",
      githubLink: "https://github.com/Akhlakur07/Law-BD",
      technologies: ["React", "Netlify", "CSS3", "JavaScript"],
      category: "Legal Tech",
    },
  ];

  useEffect(() => {
    if (isInView) {
      const tl = gsap.timeline();

      // Animate project cards
      tl.fromTo(
        ".project-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationY: 10,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
        }
      );
    }
  }, [isInView]);

  const ProjectCard = ({ project, index }) => {
    return (
      <motion.div
        className="project-card relative group"
        onHoverStart={() => setHoveredProject(project.title)}
        onHoverEnd={() => setHoveredProject(null)}
        whileHover={{
          y: -10,
          transition: { duration: 0.3 },
        }}
      >
        {/* Main Card */}
        <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl overflow-hidden h-full">
          {/* Animated Border - Fixed: Moved behind content */}
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            animate={{
              scale: hoveredProject === project.title ? 1.02 : 1,
            }}
          >
            <div className="absolute inset-[2px] rounded-3xl bg-gray-900/95"></div>
          </motion.div>

          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.5 },
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-purple-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                {project.category}
              </span>
            </div>

            {/* Action Buttons */}
            <motion.div
              className="absolute top-4 right-4 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={{ y: -20 }}
              whileHover={{ y: 0 }}
            >
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink className="w-4 h-4 text-white" />
              </motion.a>

              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-4 h-4 text-white" />
              </motion.a>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6 relative z-10">
            <motion.h3
              className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              {project.title}
            </motion.h3>

            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full text-gray-300 text-xs font-medium"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(168, 85, 247, 0.2)",
                    borderColor: "rgba(168, 85, 247, 0.5)",
                    color: "#e9d5ff",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + techIndex * 0.1,
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Project Links */}
            <div className="flex items-center justify-between">
              <motion.a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium text-sm group/btn"
                whileHover={{ x: 5 }}
              >
                Live Demo
                <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
              </motion.a>

              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm group/code"
                whileHover={{ x: -5 }}
              >
                <Github className="w-4 h-4 group-hover/code:scale-110 transition-transform" />
                Source Code
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen pt-25 pb-20 px-6 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

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
            initial={false}
          >
            <Shuffle
              text="projects"
              shuffleDirection="left"
              duration={1}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={false}
              respectReducedMotion={true}
              className="bg-clip-text"
            />
            <br />
            <Shuffle
              text="& creations"
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
              className="text-purple-500"
            />
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            A collection of my recent work showcasing innovative solutions and
            modern web technologies
          </motion.p>
        </motion.div>

        {/* Projects Grid - Unconventional Masonry-like Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View More Projects */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.a
            href="https://github.com/Akhlakur07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Projects</span>
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
