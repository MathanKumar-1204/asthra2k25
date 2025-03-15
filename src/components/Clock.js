import { useState, useEffect } from "react";
import { Clock, Calendar, Hourglass } from "lucide-react";

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
    <div className="relative w-full max-w-2xl">
      {/* Glow Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-3xl transform -skew-y-6"></div>

      <div className="relative bg-gray-900/90 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 shadow-[0_0_30px_rgba(147,51,234,0.1)]">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          Countdown to Symposium
        </h2>

        {/* Timer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timeUnits.map(({ label, value, icon }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center justify-center p-6 bg-gray-800/50 rounded-xl border border-purple-500/20 transition-all duration-500 hover:scale-105 hover:border-purple-500/50"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

              {/* Countdown Values */}
              <div className="relative">
                <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
                  {value.toString().padStart(2, "0")}
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-300/80">
                  {icon}
                  <span className="text-sm tracking-widest">{label}</span>
                </div>
              </div>

              {/* Subtle Pulsing Border */}
              <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-purple-500/30 transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownClock;