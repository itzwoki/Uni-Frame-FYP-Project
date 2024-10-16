import React from 'react';
import 'bulma/css/bulma.min.css';
import './DrawerComponent.css';

const DrawerComponent = ({ userData, handleSemesterClick, isOpen, toggleDrawer, isMobile }) => {
  return (
    <div className={`side-nav ${isOpen ? 'open' : ''}`}>
      <div className="drawer-content">
        <p id='fuck' className="title">Uni-Frame</p>
        {isMobile && (
          <div className="info-text-mobile">
            <p>{userData.university && `University: ${userData.university.name}`}</p>
            <p>{userData.degree && `Degree: ${userData.degree.name}`}</p>
          </div>
        )}
        <button
          className="button is-fullwidth is-warning"
          onClick={() => {
            handleSemesterClick(null);
            toggleDrawer();
          }}
        >
          Home
        </button>
        {[...Array(userData.degree ? userData.degree.numberOfSemesters : 0).keys()].map((index) => (
          <button
            key={index + 1}
            className="button is-fullwidth is-warning"
            onClick={() => {
              handleSemesterClick(index + 1);
              toggleDrawer();
            }}
          >
            Semester {index + 1}
          </button>
        ))}
      </div>
      <div className="close-button-container">
        <button className="button is-warning is-fullwidth" onClick={toggleDrawer}>Close</button>
      </div>
    </div>
  );
};

export default DrawerComponent;
