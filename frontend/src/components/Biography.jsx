// import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h3>Our Story</h3>
          <p>
            DocSchedule was founded with a simple mission: to make healthcare
            more accessible and stress-free. Recognizing the challenges of
            booking appointments and finding reliable healthcare providers, our
            team set out to design a platform that bridges the gap between
            patients and doctors.
          </p>
          <p>
            With backgrounds in healthcare technology, our founders understood
            the value of time and efficiency in the healthcare journey.
            DocSchedule is more than just a booking tool—it’s a promise to
            provide users with convenient access to quality care when they need
            it most. Our platform brings together trusted medical professionals
            and advanced scheduling technology to give patients the seamless
            experience they deserve.
          </p>
          <p>
            Every day, we work to improve and expand DocSchedule to better serve
            our users, ensuring that they can prioritize their health without
            the hassle of traditional scheduling. Join us in making healthcare
            more connected and more compassionate.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
