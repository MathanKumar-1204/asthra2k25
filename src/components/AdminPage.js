import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';

const AdminPage = () => {
  const [searchId, setSearchId] = useState("");
  const [searchEvent, setSearchEvent] = useState("");
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.sheetbest.com/sheets/b0b06cc5-a1ef-41ee-b7c0-a123d92d771e');
        if (response.ok) {
          const data = await response.json();
          const organizedData = data.reduce((acc, entry) => {
            if (!acc[entry.eventName]) {
              acc[entry.eventName] = [];
            }
            acc[entry.eventName].push(entry);
            return acc;
          }, {});
          setEventData(organizedData);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const downloadCSV = (data, eventName) => {
    const csvContent = [
      "TEAM NAME,TEAM LEAD,TEAM MEMBERS,CONTACT,COLLEGE,EMAIL",
      ...data.map(entry =>
        `"${entry.teamName}","${entry.teamLead}","${entry.teamMembers}","${entry.contact}","${entry.college}","${entry.email}"`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${eventName}.csv`;
    link.click();
  };

  const downloadPDF = (data, eventName) => {
    const doc = new jsPDF();
    const tableColumn = ["TEAM NAME", "TEAM LEAD", "TEAM MEMBERS", "CONTACT", "COLLEGE", "EMAIL"];
    const tableRows = [];

    doc.setFontSize(18);
    doc.text(eventName, 14, 22);
    doc.setFontSize(12);

    let startY = 30;
    tableColumn.forEach((col, index) => {
      doc.text(col, 14 + index * 25, startY);
    });

    data.forEach((entry, index) => {
      const tempData = [entry.teamName, entry.teamLead, entry.teamMembers, entry.contact, entry.college, entry.email];
      tempData.forEach((text, i) => {
        doc.text(text, 14 + i * 25, startY + (index + 1) * 10);
      });
    });

    doc.save(`${eventName}.pdf`);
  };

  const downloadAllData = (format) => {
    const allEventsData = Object.entries(eventData);

    if (format === 'csv') {
      let csvContent = "EVENT NAME,TEAM NAME,TEAM LEAD,TEAM MEMBERS,CONTACT,COLLEGE,EMAIL\n";
      allEventsData.forEach(([eventName, data]) => {
        data.forEach(entry => {
          csvContent += `"${eventName}","${entry.teamName}","${entry.teamLead}","${entry.teamMembers}","${entry.contact}","${entry.college}","${entry.email}"\n`;
        });
      });

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `AllEvents.csv`;
      link.click();
    } else if (format === 'pdf') {
      const doc = new jsPDF();
      let startY = 20;

      allEventsData.forEach(([eventName, data]) => {
        doc.setFontSize(18);
        doc.text(eventName, 14, startY);
        startY += 10;

        const tableColumn = ["TEAM NAME", "TEAM LEAD", "TEAM MEMBERS", "CONTACT", "COLLEGE", "EMAIL"];
        tableColumn.forEach((col, index) => {
          doc.text(col, 14 + index * 25, startY);
        });

        startY += 10;
        data.forEach((entry, index) => {
          const tempData = [entry.teamName, entry.teamLead, entry.teamMembers, entry.contact, entry.college, entry.email];
          tempData.forEach((text, i) => {
            doc.text(text, 14 + i * 25, startY + (index + 1) * 10);
          });
        });

        startY += (data.length + 1) * 10;
        doc.addPage();
      });

      doc.save(`AllEvents.pdf`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-r from-green-600 to-yellow-800 p-5">
      <div className="bg-white bg-opacity-20 backdrop-blur-lg shadow-2xl p-8 rounded-3xl text-white w-full max-w-7xl flex flex-col items-center">

        <input
          type="text"
          value="Admin Dashboard"
          className="w-72 p-3 rounded-lg text-blue-900 bg-white bg-opacity-90 outline-none shadow-lg placeholder-gray-600 font-extrabold text-xl text-center uppercase tracking-wide"
          readOnly
        />

        <div className="flex flex-col items-center gap-4 mb-4 mt-5">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-96 p-3 rounded-lg text-black bg-white bg-opacity-90 outline-none shadow-lg placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />

          <input
            type="text"
            placeholder="Event Name"
            className="w-72 p-3 rounded-lg text-black bg-white bg-opacity-90 outline-none shadow-lg placeholder-gray-600 focus:ring-2 focus:ring-blue-400"
            value={searchEvent}
            onChange={(e) => setSearchEvent(e.target.value)}
          />

          <button
            className="w-40 bg-gradient-to-r from-green-500 to-yellow-600 text-white font-bold px-4 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:from-green-700 hover:to-yellow-800">
            Search
          </button>
        </div>

        {Object.keys(eventData).map((eventName, idx) => (
          <div key={idx} className="bg-white bg-opacity-30 p-5 rounded-lg mt-6 shadow-lg overflow-x-auto w-full">
            <h2 className="text-xl font-bold text-white mb-4">{eventName}</h2>
            <table className="w-full text-black text-sm md:text-base font-semibold border-collapse border border-white">
              <thead>
                <tr className="border-b-2 border-white text-left bg-white bg-opacity-20">
                  <th className="py-3 px-4 border border-white">TEAM NAME</th>
                  <th className="py-3 px-4 border border-white">TEAM LEAD</th>
                  <th className="py-3 px-4 border border-white">TEAM MEMBERS</th>
                  <th className="py-3 px-4 border border-white">CONTACT</th>
                  <th className="py-3 px-4 border border-white">COLLEGE</th>
                  <th className="py-3 px-4 border border-white">EMAIL</th>
                </tr>
              </thead>
              <tbody>
                {eventData[eventName].map((entry, index) => (
                  <tr key={index} className="border-b border-gray-400 hover:bg-white hover:bg-opacity-40 transition">
                    <td className="py-3 px-4 border border-white">{entry.teamName}</td>
                    <td className="py-3 px-4 border border-white">{entry.teamLead}</td>
                    <td className="py-3 px-4 border border-white">{entry.teamMembers}</td>
                    <td className="py-3 px-4 border border-white">{entry.contact}</td>
                    <td className="py-3 px-4 border border-white">{entry.college}</td>
                    <td className="py-3 px-4 border border-white">{entry.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => downloadCSV(eventData[eventName], eventName)}
              >
                Download CSV
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => downloadPDF(eventData[eventName], eventName)}
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => downloadAllData('csv')}
          >
            Download All as CSV
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => downloadAllData('pdf')}
          >
            Download All as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
