import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    width: '4rem', 
    height: '4rem', 
    margin: '2rem', 
    borderRadius: '50%', 
    backgroundColor: '#4CE4D9', 
    animation: 'ping 1s infinite', // Equivalent to animate-ping
  };

  const keyframesStyle = `
    @keyframes ping {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={spinnerStyle}></div>
    </>
  );
};

export default Spinner;