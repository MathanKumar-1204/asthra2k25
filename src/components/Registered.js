import React from "react";
 function Registered() {
  const events = [
    {
      title: "Code Quest",
      type: "Technical",
      description:
        "A competitive programming challenge where participants solve complex algorithmic problems. Test your coding skills against the best!",
      prize: "₹20,000",
      team: "2-3 members",
      venue: "CS Lab Complex",
      time: "10:00 AM - 2:00 PM",
    },
    {
      title: "Design Dynamo",
      type: "Creative",
      description:
        "Showcase your UI/UX design skills by creating innovative solutions for real-world problems. Let your creativity shine!",
      prize: "₹15,000",
      team: "Individual/Team",
      venue: "Design Studio",
      time: "11:00 AM - 3:00 PM",
    },
    {
      title: "Tech Talks",
      type: "Workshop",
      description:
        "Industry experts share insights on emerging technologies, AI, and the future of tech. Network with professionals and gain valuable knowledge.",
      prize: "Certificates",
      team: "Open to All",
      venue: "Main Auditorium",
      time: "2:00 PM - 5:00 PM",
    },
    {
      title: "Hackathon",
      type: "Technical",
      description:
        "24-hour coding marathon to build innovative solutions. Bring your ideas to life and compete for amazing prizes!",
      prize: "₹50,000",
      team: "4 members",
      venue: "Innovation Hub",
      time: "Starts at 9:00 AM",
    },
  ];

  return (
    <div className="min-h-screen h-screen bg-gradient-to-br from-[#2A2D64] to-[#1D1F4A] flex flex-col overflow-hidden">
      <header className="text-center py-6 flex-shrink-0">
        <h1 className="text-white text-4xl font-bold uppercase tracking-wide">TECHNOVATE 2024</h1>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mt-2 px-4">
          Join us for the biggest technical symposium of the year. Showcase your skills, learn from experts, and win exciting prizes!
        </p>
      </header>
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-y-auto max-w-5xl mx-auto w-full">
        {events.map((event, index) => (
          <div key={index} className="bg-white/95 rounded-2xl p-6 transition-transform transform hover:-translate-y-1 shadow-md cursor-pointer">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-[#2A2D64] text-2xl font-semibold flex-grow">{event.title}</h2>
              <span className="bg-[#E5E6FF] text-[#2A2D64] px-4 py-1 rounded-full text-sm font-medium">{event.type}</span>
            </div>
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              <p className="text-gray-600 text-base leading-relaxed flex-1">{event.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-100 p-5 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-[#2A2D64] font-medium text-sm">Prize Pool</span>
                  <span className="text-gray-700 text-base">{event.prize}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#2A2D64] font-medium text-sm">Team Size</span>
                  <span className="text-gray-700 text-base">{event.team}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#2A2D64] font-medium text-sm">Venue</span>
                  <span className="text-gray-700 text-base">{event.venue}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#2A2D64] font-medium text-sm">Time</span>
                  <span className="text-gray-700 text-base">{event.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  
  export default Registered;