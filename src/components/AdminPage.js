import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [eventData, setEventData] = useState({});
  const [filteredData, setFilteredData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e"
        );
        if (response.ok) {
          const data = await response.json();
          const organizedData = data.reduce((acc, entry) => {
            if (!acc[entry.eventName]) acc[entry.eventName] = [];
            acc[entry.eventName].push(entry);
            return acc;
          }, {});
          setEventData(organizedData);
          setFilteredData(organizedData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = Object.keys(eventData).reduce((acc, eventName) => {
      const filteredEntries = eventData[eventName].filter(
        (entry) =>
          entry.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.teamLead.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.contact.includes(searchQuery) ||
          entry.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
          eventName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredEntries.length > 0) acc[eventName] = filteredEntries;
      return acc;
    }, {});

    setFilteredData(filtered);
  }, [searchQuery, eventData]);

  // 📜 Download CSV
  const downloadCSV = (data, eventName) => {
    const csvContent = [
      "TEAM NAME,TEAM LEAD,TEAM MEMBERS,CONTACT,COLLEGE,EMAIL",
      ...data.map(
        (entry) =>
          `"${entry.teamName}","${entry.teamLead}","${entry.teamMembers}","${entry.contact}","${entry.college}","${entry.email}"`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${eventName}.csv`;
    link.click();
  };

  // 📄 Download PDF
  const downloadPDF = (data, eventName) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(eventName, 14, 22);
    doc.setFontSize(12);

    let startY = 30;
    data.forEach((entry, index) => {
      doc.text(
        `${index + 1}. ${entry.teamName} | ${entry.teamLead} | ${entry.teamMembers} | ${entry.contact} | ${entry.college} | ${entry.email}`,
        14,
        startY
      );
      startY += 10;
    });

    doc.save(`${eventName}.pdf`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-black relative overflow-hidden">
      {/* Cyberpunk background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-blue-900 opacity-90"></div>
      <div className="absolute inset-0 bg-noise opacity-10"></div>

      <div className="bg-black bg-opacity-40 backdrop-blur-lg shadow-2xl p-4 md:p-8 rounded-3xl text-white w-full max-w-7xl flex flex-col items-center border border-neon-pink">
        <h1 className="text-2xl md:text-4xl font-extrabold text-neon-blue tracking-wide mb-4 md:mb-6 glitch text-center">
          ADMIN DASHBOARD
        </h1>

        <input
          type="text"
          placeholder="Search for a Team, Event, or Contact"
          className="w-full md:w-96 p-3 rounded-lg text-black bg-white bg-opacity-90 outline-none shadow-xl placeholder-gray-400 focus:ring-2 focus:ring-neon-blue transition-all mb-4 md:mb-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {Object.keys(filteredData).map((eventName, idx) => (
          <div key={idx} className="bg-opacity-30 p-4 md:p-5 rounded-lg mt-4 md:mt-6 neon-card border border-neon-pink w-full">
            <h2 className="text-xl md:text-2xl font-bold text-neon-green mb-2 md:mb-4 tracking-wider text-center">{eventName}</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-white text-sm md:text-base font-semibold border-collapse border border-neon-pink">
                <thead>
                  <tr className="border-b border-neon-green text-left bg-opacity-40">
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">TEAM NAME</th>
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">TEAM LEAD</th>
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">TEAM MEMBERS</th>
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">CONTACT</th>
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">COLLEGE</th>
                    <th className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">EMAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData[eventName].map((entry, index) => (
                    <tr key={index} className="border-b border-gray-500 hover:bg-opacity-20 transition">
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.teamName}</td>
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.teamLead}</td>
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.teamMembers}</td>
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.contact}</td>
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.college}</td>
                      <td className="py-2 px-2 md:py-3 md:px-4 border border-neon-blue">{entry.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-2 md:gap-4 mt-2 md:mt-4">
              <button className="neon-button bg-neon-green" onClick={() => downloadCSV(filteredData[eventName], eventName)}>Download CSV</button>
              <button className="neon-button bg-neon-blue" onClick={() => downloadPDF(filteredData[eventName], eventName)}>Download PDF</button>
            </div>
          </div>
        ))}
      </div>

      {/* Cyberpunk Styles */}
      <style>
        {`
          .neon-button {
            padding: 10px 16px;
            font-size: 14px;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.3s;
            border: 2px solid transparent;
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
          }
          .neon-button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(0, 255, 0, 1);
          }
          .neon-card {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(8px);
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          }
          .text-neon-blue { color: #00ffff; }
          .text-neon-green { color: #00ff00; }
          .border-neon-blue { border-color: #00ffff; }
          .border-neon-pink { border-color: #ff00ff; }
        `}
      </style>
    </div>
  );
};

export default AdminPage;
