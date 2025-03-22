import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileUpdateForm = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        password: '',
        // ...existing code...
    });

    useEffect(() => {
        // Fetch the current profile data
        axios.get('/api/profile')
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the profile!', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('/api/profile', profile)
            .then(response => {
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the profile!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={profile.name} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={profile.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={profile.password} onChange={handleChange} />
            </label>
            {/* ...existing code... */}
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default ProfileUpdateForm;
