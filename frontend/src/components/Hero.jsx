import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <br />
        <h1>{title}</h1>
        <p>
          Welcome to DocSchedule — your streamlined solution for booking doctor
          appointments effortlessly. With just a few clicks, connect with
          healthcare professionals, choose convenient appointment times, and
          manage your health journey from one easy-to-use platform. Whether it's
          routine check-ups or specialist consultations, DocSchedule brings care
          closer to you, helping you prioritize your wellness with ease and
          convenience. Say goodbye to long waits and missed appointments.
          Schedule smarter, feel better.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
