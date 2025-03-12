import React from 'react';
import NavBar from '../components/home/navBar';
import CircleCard from '../components/home/CircleCard';

const Home = () => {
  return (
    <div>
      <NavBar />
      <CircleCard
        imageUrl="https://via.placeholder.com/150" // Replace with your image URL
        title="Circle Title" // title
      />
    </div>
  );
};

export default Home;
