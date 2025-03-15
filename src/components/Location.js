import React from "react";

const Location = () => {
  return (
    <iframe
      width="80%"
      height="500px"
      style={{ border: 0 ,filter: "invert(90%) hue-rotate(180deg)"}}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6835664325304!2d80.22393577491982!3d13.055802687267327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f499eee457%3A0x4d3f7e677496e707!2sMeenakshi%20Sundararajan%20Engineering%20College!5e0!3m2!1sen!2sin!4v1741962806438!5m2!1sen!2sin"
    ></iframe>
  );
};

export default Location;