import { useState, useEffect } from "react";
import { Clock, Calendar, Hourglass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CountdownClock = () => {
  const deadline = new Date("2025-04-15T23:59:59").getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = deadline - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days, icon: <Calendar className="w-6 h-6" /> },
    { label: "HOURS", value: timeLeft.hours, icon: <Clock className="w-6 h-6" /> },
    { label: "MINUTES", value: timeLeft.minutes, icon: <Clock className="w-6 h-6" /> },
    { label: "SECONDS", value: timeLeft.seconds, icon: <Hourglass className="w-6 h-6" /> },
  ];

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto mb-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Outer Glowing Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-4 border-transparent"
        animate={{
          background: [
            "linear-gradient(90deg, transparent 0%, #00FFFF 50%, transparent 100%)",
            "linear-gradient(90deg, transparent 100%, #00FFFF 50%, transparent 0%)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Countdown Box */}
      <div className="relative bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl border-2 border-cyan-500/30 shadow-[0_0_30px_rgba(0,255,255,0.3)]">
        <motion.h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text"
          animate={{ backgroundPosition: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          style={{ backgroundSize: "200%" }}
        >
          Countdown to Symposium
        </motion.h2>
        <div className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text">17th APRIL 2025</div>

        {/* Timer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeUnits.map(({ label, value, icon }) => (
            <motion.div
              key={label}
              className="group relative flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-cyan-500 shadow-lg shadow-cyan-500 transition-all duration-500 hover:scale-105"
              whileHover={{
                boxShadow: '0 0 30px rgba(0,255,255,0.3)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Subtle Pulsing Glow */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/5 rounded-xl"
                animate={{
                  opacity: [0, 0.1, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Countdown Numbers */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-yellow-400 text-transparent bg-clip-text"
                >
                  {value.toString().padStart(2, "0")}
                </motion.div>
              </AnimatePresence>

              {/* Icon and Label */}
              <motion.div
                className="flex items-center justify-center space-x-2 text-cyan-300/80"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ rotate: label === "SECONDS" ? [0, 180] : 0 }}
                  transition={{
                    duration: label === "SECONDS" ? 1 : 0,
                    repeat: label === "SECONDS" ? Infinity : 0,
                    ease: "linear"
                  }}
                >
                  {icon}
                </motion.div>
                <span className="text-sm tracking-widest">{label}</span>
              </motion.div>

              {/* Hover Border Animation */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-cyan-500/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default CountdownClock;