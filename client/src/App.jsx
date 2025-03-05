import React from "react";
import './App.css';


const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Sethsiri Pharmacy</h1>
        <input type="text" placeholder="Search" className="border p-1" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Sign In</button>
      </nav>

      {/* Banner */}
      <div className="relative text-center p-8 bg-gray-200">
        <h2 className="text-2xl font-bold">Health and Wellness for <span className="text-green-500">Everyone</span></h2>
        <p>✔ 20+ licensed pharmacists available 24/7</p>
        <p>✔ Every order double-checked for accuracy and safety</p>
        <p>✔ Refills and auto refills online or in our Web app</p>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-6 my-6">
        {['Skin Care', 'Vitamins', 'Drugs', 'Baby Care', 'Medical Equipment'].map((category) => (
          <div key={category} className="text-center">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <p>{category}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="grid grid-cols-4 gap-4 p-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white p-4 shadow-md text-center">
            <div className="w-full h-40 bg-gray-200"></div>
            <h3 className="font-bold">Medicine {i + 1}</h3>
            <p>Rs. {100 + i * 50}</p>
            <button className="bg-blue-500 text-white px-4 py-1 mt-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
