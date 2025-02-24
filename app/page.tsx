"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, DollarSign, Gift, LineChart, Star, Trophy, Users, Activity, Zap, Award, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Interactive cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Interactive demo state
  const [demoStep, setDemoStep] = useState(1);
  const [demoAnswers, setDemoAnswers] = useState<string[]>([]);
  const [calculatedReward, setCalculatedReward] = useState(0);
  const [surveyCount, setSurveyCount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const surveysPerPage = 6;

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Regular Surveyor",
      content: "I've earned over $500 in my first month! The surveys are engaging and the rewards are real.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      name: "Michael R.",
      role: "Power User",
      content: "SurveyX has the best survey selection I've seen. The platform is intuitive and rewards are instant.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      name: "Emily T.",
      role: "Student",
      content: "Perfect for earning extra cash between classes. The mobile experience is fantastic!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  const allSurveys = [
    {
      title: "Tech Preferences Survey",
      reward: "$5.00",
      time: "10 mins",
      category: "Technology",
      spots: "150 spots left"
    },
    {
      title: "Gaming Experience",
      reward: "$8.50",
      time: "15 mins",
      category: "Entertainment",
      spots: "75 spots left"
    },
    {
      title: "Future of AI",
      reward: "$12.00",
      time: "20 mins",
      category: "Technology",
      spots: "50 spots left"
    },
    {
      title: "Online Shopping Habits",
      reward: "$6.50",
      time: "12 mins",
      category: "Consumer",
      spots: "200 spots left"
    },
    {
      title: "Social Media Usage",
      reward: "$7.00",
      time: "15 mins",
      category: "Technology",
      spots: "100 spots left"
    },
    {
      title: "Fitness & Wellness",
      reward: "$9.00",
      time: "18 mins",
      category: "Health",
      spots: "80 spots left"
    },
    {
      title: "Remote Work Experience",
      reward: "$11.00",
      time: "20 mins",
      category: "Professional",
      spots: "90 spots left"
    },
    {
      title: "Digital Payment Methods",
      reward: "$8.00",
      time: "15 mins",
      category: "Finance",
      spots: "120 spots left"
    },
    {
      title: "Streaming Services",
      reward: "$7.50",
      time: "14 mins",
      category: "Entertainment",
      spots: "160 spots left"
    },
    {
      title: "Smart Home Technology",
      reward: "$10.00",
      time: "18 mins",
      category: "Technology",
      spots: "70 spots left"
    },
    {
      title: "Food Delivery Apps",
      reward: "$6.00",
      time: "12 mins",
      category: "Consumer",
      spots: "180 spots left"
    },
    {
      title: "Cryptocurrency Awareness",
      reward: "$13.00",
      time: "22 mins",
      category: "Finance",
      spots: "40 spots left"
    }
  ];

  // Demo questions for the interactive survey
  const demoQuestions = [
    {
      question: "How often do you participate in online surveys?",
      options: ["Daily", "Weekly", "Monthly", "Rarely"]
    },
    {
      question: "What motivates you to take surveys?",
      options: ["Extra Income", "Share Opinion", "Pass Time", "Learn New Things"]
    },
    {
      question: "Which reward type do you prefer?",
      options: ["Cash", "Gift Cards", "Crypto", "Points"]
    }
  ];

  const handleDemoAnswer = (answer: string) => {
    setDemoAnswers([...demoAnswers, answer]);
    if (demoStep < demoQuestions.length) {
      setDemoStep(demoStep + 1);
    } else {
      // Complete demo
      setDemoStep(1);
      setDemoAnswers([]);
      alert("Great job! You've completed the demo survey. In a real survey, you would earn rewards for your participation.");
    }
  };

  const calculateRewards = () => {
    setIsCalculating(true);
    const baseReward = 5 + (surveyCount * 0.5);
    const animateValue = (start: number, end: number, duration: number) => {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCalculatedReward(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setIsCalculating(false);
        }
      };
      window.requestAnimationFrame(step);
    };
    animateValue(0, baseReward, 1500);
  };

  // Calculate current surveys for pagination
  const indexOfLastSurvey = currentPage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const currentSurveys = allSurveys.slice(indexOfFirstSurvey, indexOfLastSurvey);
  const totalPages = Math.ceil(allSurveys.length / surveysPerPage);

  // Navigation functions
  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-pattern">
      <motion.div
        className="interactive-cursor"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />

      {/* Navigation */}
      <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-blue-500 glow" />
              <span className="ml-2 text-xl font-bold text-blue-500 glow-text">SurveyX</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#why" className="text-gray-300 hover:text-blue-400 transition-colors">Why SurveyX?</a>
              <a href="#surveys" className="text-gray-300 hover:text-blue-400 transition-colors">Surveys</a>
              <a href="#rewards" className="text-gray-300 hover:text-blue-400 transition-colors">Rewards</a>
              <Button className="bg-blue-600 hover:bg-blue-700 glow">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 glow-text">
              Turn Your Opinion Into
              <span className="text-blue-500"> Digital Rewards</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the next generation of survey takers earning rewards in our cutting-edge platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 glow">
                Start Earning Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500/50 hover:bg-blue-500/10">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Surveys Section */}
      <section id="surveys" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">
            Available <span className="text-blue-500">Surveys</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentSurveys.map((survey, index) => (
              <motion.div
                key={index}
                className="survey-card rounded-xl p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-blue-400">{survey.title}</h3>
                  <span className="text-green-400 font-bold">{survey.reward}</span>
                </div>
                <div className="space-y-2 text-gray-400">
                  <p>⏱ {survey.time}</p>
                  <p>📊 {survey.category}</p>
                  <p className="text-blue-500">{survey.spots}</p>
                </div>
                <Button className="w-full mt-4 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50">
                  Take Survey
                </Button>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 1}
              variant="outline"
              className="border-blue-500/50 hover:bg-blue-500/10"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              className="border-blue-500/50 hover:bg-blue-500/10"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">
            What Our <span className="text-blue-500">Users Say</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card rounded-xl p-6"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-blue-400">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Experience Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl font-bold text-center mb-12 glow-text">
            Interactive <span className="text-blue-500">Experience</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Survey Simulator */}
            <motion.div
              className="survey-card rounded-xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Survey Simulator</h3>
              <div className="min-h-[200px]">
                {demoStep <= demoQuestions.length ? (
                  <>
                    <p className="text-gray-300 mb-4">
                      Question {demoStep} of {demoQuestions.length}:
                    </p>
                    <p className="text-xl text-blue-400 mb-6">
                      {demoQuestions[demoStep - 1].question}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {demoQuestions[demoStep - 1].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleDemoAnswer(option)}
                          className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-green-400 mb-4">Survey Complete!</p>
                    <Button
                      onClick={() => {
                        setDemoStep(1);
                        setDemoAnswers([]);
                      }}
                      className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Reward Calculator */}
            <motion.div
              className="survey-card rounded-xl p-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold text-blue-400 mb-4">Reward Calculator</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">
                    How many surveys can you complete per week?
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={surveyCount}
                    onChange={(e) => setSurveyCount(parseInt(e.target.value) || 0)}
                    className="w-full bg-blue-900/20 border border-blue-500/50 rounded-lg p-2 text-blue-400"
                  />
                </div>
                <Button
                  onClick={calculateRewards}
                  disabled={isCalculating}
                  className="w-full bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50"
                >
                  Calculate Potential Earnings
                </Button>
                {calculatedReward > 0 && (
                  <div className="text-center">
                    <p className="text-gray-300">Estimated weekly earnings:</p>
                    <p className="text-3xl font-bold text-green-400">
                      ${calculatedReward.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-blue-500/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Zap className="h-8 w-8 text-blue-500 glow" />
                <span className="ml-2 text-xl font-bold text-blue-500 glow-text">SurveyX</span>
              </div>
              <p className="text-gray-400">
                Your gateway to the future of survey rewards.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-500/20 text-center text-gray-400">
            <p>&copy; 2024 SurveyX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}