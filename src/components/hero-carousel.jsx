'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.avif';
import p4 from '../assets/p4.png';
import p5 from '../assets/p5.png';
import p6 from '../assets/p6.png';
import Modal from './modal';

const slides = [
  {
    title: "Optimizes Clinical Data Management for Cost-Effective Trials and Research Analysis.",
    metric: "50%",
    metricLabel: "Cut In clinical trial data processing",
    image: p1
  },
  {
    title: "Streamlines and Accelerates Processes in Drug Research and Development.",
    description: "AI-powered document analysis for legal teams",
    metric: "60%",
    metricLabel: "Boost In drug discovery speed",
    image: p2
  },
  {
    title: "Drives Cost-Efficiency in Drug Development Through AI-Driven Innovation.",
    description: "Streamline pharmaceutical research and development",
    metric: "30%",
    metricLabel: "Reduction In drug development costs",
    image: p3
  },
  {
    title: "Simplifies Compliance Documentation to Enhance Regulatory Efficiency and Accuracy.",
    description: "Automated contract review and risk assessment",
    metric: "70%",
    metricLabel: "Speeds up In compliance documentation ",
    image: p4
  },
  {
    title: "Enhances Pharmacovigilance by Automating Adverse Event Detection and Reporting.",
    description: "Saves 40% in adverse event reporting time",
    metric: "40%",
    metricLabel: "Saving in adverse event reporting time",
    image: p5
  },
  {
    title: "Boosts Research and Development Efficiency Through Advanced AI Integration.",
    description: "Improves R&D efficiency by 45%",
    metric: "45%",
    metricLabel: "Improvement In R&D efficiency",
    image: p6
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
        toggleIsPlaying();
    };

    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_id', 'template_id', e.target, 'user_id')
          .then((result) => {
              toast.success("We'll get in touch with you shortly.")
              toggleModal();
          }, (error) => {
              toast.warning("Couldn't connect! How about Trying our cell?")
          });
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection)
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length)
  }, [])

  const toggleIsPlaying = () => {
    setIsPlaying((prev) => !prev)
  }

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => paginate(1), 5000)
    return () => clearInterval(timer)
  }, [isPlaying, paginate])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white">
     
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="relative container mx-auto px-4 pt-24 pb-20">
        
        <div className=" mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight"
          >
            Revolutionizing Biopharma with
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Data Analysis
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Create value on day one with our AI-powered solutions.
          </motion.p>
        </div>

        <div className="relative max-w-[6xl] mx-auto h-[700px] lg:h-[600px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute inset-0 grid lg:grid-cols-2 gap-12"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-200 shadow-2xl order-1 lg:order-2 h-[300px] lg:h-full">
                <motion.img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20" />
              </div>
              <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1 h-full">
              <div className="pt-4">
                  <div className="text-7xl md:text-9xl font-bold text-blue-600">
                    {slides[currentSlide].metric}
                  </div>
                  <div className="text-sm font-semibold text-gray-500 mt-2">
                    {slides[currentSlide].metricLabel.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {slides[currentSlide].title}
                </h3>

                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleModal}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors shadow-md hover:shadow-lg max-w-[250px] text-sm rounded-[10px]"
            >
                Book A Demo
            </motion.button>
                
                
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute left-0 right-0 bottom-4 flex justify-between items-center px-4">
            <button
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => paginate(-1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2 z-10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center z-20 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentSlide ? 1 : -1)
                      setCurrentSlide(index)
                    }}
                    className={`w-3 h-3 rounded-full transition-colors focus:outline-none ${
                      index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center z-20 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => paginate(1)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ margin: "0px" }}
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 h-[100vh]"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
                        >
                            <div className="relative">
                                <button
                                    onClick={toggleModal}
                                    className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Book a Demo</h2>
                                <form onSubmit={sendEmail} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
    </div>
  )
}


