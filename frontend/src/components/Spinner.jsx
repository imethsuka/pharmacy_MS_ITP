import React from 'react';

const Spinner = () => {
  const spinnerStyle = {
    width: '4rem', // Equivalent to w-16
    height: '4rem', // Equivalent to h-16
    margin: '2rem', // Equivalent to m-8
    borderRadius: '50%', // Equivalent to rounded-full
    backgroundColor: '#0284c7', // Equivalent to bg-sky-600
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