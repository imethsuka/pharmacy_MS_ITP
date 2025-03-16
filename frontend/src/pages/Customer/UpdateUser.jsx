import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { motion } from "framer-motion";
import Input from "../../components/Customer/Input";
import { User, Mail } from "lucide-react";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5555/getUser/${id}`)
      .then(result => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill all the fields.");
      return;
    }

    try {
      await axios.put(`http://localhost:5555/updateUser/${id}`, { name, email });
      navigate('/');
    } catch (err) {
      console.log(err);
      setError("Failed to update user. Please try again.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='max-w-md w-full bg-white bg-opacity-95 border border-blue-500 rounded-2xl shadow-xl overflow-hidden'
      >
        <div className='p-8'>
          <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text'>
            Update User
          </h2>

          {error && (
            <div className='mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded'>
              {error}
            </div>
          )}

          <form onSubmit={Update}>
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <Input
                id='name'
                icon={User}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email Address
              </label>
              <Input
                id='email'
                icon={Mail}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
            <motion.button
              className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type='submit'
            >
              Update
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default UpdateUser;