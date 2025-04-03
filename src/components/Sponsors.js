import React from "react";
import { motion } from "framer-motion";

const titleSponsor = [
  { id: 1, name: "Title Sponsor", image: "https://via.placeholder.com/300", url: "https://example.com" },
];

const associateSponsors = [
  { id: 2, name: "Shri Meenakshi Associate", image: "./assets/Sponsors/ShriMeenakshiAssociate.png", url: "https://shrimeenakshi.com/" },
  { id: 3, name: "Associate Sponsor 2", image: "https://via.placeholder.com/300", url: "https://example.com" },
  { id: 7, name: "Associate Sponsor 3", image: "https://via.placeholder.com/300", url: "https://example.com" },
];

const coAssociateSponsors = [
  { id: 4, name: "Vignesh Propertees", image: "./assets/Sponsors/CoAssociateSponsor1.jpeg", url: "https://www.vigneshpropertees.com/" },
  { id: 5, name: "Co-Associate Sponsor 2", image: "https://via.placeholder.com/300", url: "https://example.com" },
  { id: 6, name: "Co-Associate Sponsor 3", image: "https://via.placeholder.com/300", url: "https://example.com" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Sponsors = () => {
  return (
    <div className="sponsors-container bg-black">
      <h2 className="sponsors-title text-[#00FFFF]" >Our Sponsors</h2>
      <motion.div
        id="logo-section"
        className="sponsors-logo-section"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        {/* Title Sponsor */}
        <h3 className="sponsor-category">Title Sponsor</h3>
        <div className="sponsor-wrapper">
          {titleSponsor.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} width="w-2/3" />
          ))}
        </div>

        {/* Associate Sponsors */}
        <h3 className="sponsor-category">Associate Sponsors</h3>
        <div className="sponsor-grid">
          {associateSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>

        {/* Co-Associate Sponsors */}
        <h3 className="sponsor-category">Co-Associate Sponsors</h3>
        <div className="sponsor-grid">
          {coAssociateSponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const SponsorCard = ({ sponsor }) => (
  <motion.div
    className="sponsor-card"
    whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #5A3172" }}
    whileTap={{ scale: 0.95 }}
    variants={fadeIn}
  >
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="sponsor-link">
      <img
        src={sponsor.image}
        alt={"YET TO REVEAL"}
        className="sponsor-image"
      />
    </a>
  </motion.div>
);

export default Sponsors;

/* CSS Styles */
const styles = `
.sponsors-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  padding: 2.5rem;
}

.sponsors-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  background-color: black;
  padding: 1rem;
  text-shadow: 2px 2px 5px black;
  margin-bottom: 2rem; /* Add margin to separate from the content below */
}

.sponsors-logo-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 1.5rem;
}

.sponsor-category {
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 1px 1px 3px black;
  margin-bottom: 1rem; /* Add margin to separate categories */
}

.sponsor-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem; /* Add margin to separate from other sections */
}

.sponsor-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.sponsor-card {
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid #5A3172;
  background-color: #3A0150;
  box-shadow: 0px 0px 10px #5A3172;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 200px;
  height: 10rem;
  transition: transform 0.3s ease-in-out;
  overflow: hidden; /* Ensure the image doesn't overflow */
}

.sponsor-card:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 20px #5A3172;
}

.sponsor-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Ensure the entire image is shown */
}

.sponsor-link {
  display: block;
  width: 100%;
  height: 100%;
}

`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
