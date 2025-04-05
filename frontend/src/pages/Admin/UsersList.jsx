import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../../styles/Admin/UsersList.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo || !userInfo.token) {
                    toast.error('You must be logged in as an admin');
                    navigate('/login');
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                };

                const response = await axios.get('/api/users', config);
                setUsers(response.data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to fetch users. You may not have permission.');
                console.error(error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                };

                await axios.delete(`/api/users/${userId}`, config);
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully');
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to delete user');
                console.error(error);
            }
        }
    };

    // Sort users by column
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filter users by search term
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig.key) return 0;
        
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    // Get sort icon 
    const getSortIcon = (name) => {
        if (sortConfig.key !== name) return '⇅';
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    if (loading) return (
        <div className="loading-spinner">
            <div className="spinner"></div>
        </div>
    );

    return (
        <div className="users-container">
            {/* Header section with gradient background */}
            <div className="users-header">
                <div className="users-header-content">
                    <div>
                        <h1 className="users-title">User Management</h1>
                        <p className="users-subtitle">Manage your system users</p>
                    </div>
                    <Link to="/admin/users/add" className="add-user-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New User
                    </Link>
                </div>
            </div>

            {/* Search bar */}
            <div className="users-search-container">
                <svg className="users-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input 
                    type="text" 
                    className="users-search-input"
                    placeholder="Search users by name, email, or role..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Users table */}
            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('name')}>
                                Name <span className="sort-icon">{getSortIcon('name')}</span>
                            </th>
                            <th onClick={() => requestSort('email')}>
                                Email <span className="sort-icon">{getSortIcon('email')}</span>
                            </th>
                            <th onClick={() => requestSort('role')}>
                                Role <span className="sort-icon">{getSortIcon('role')}</span>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.length > 0 ? (
                            sortedUsers.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="user-info">
                                            <div className="user-avatar">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="user-name">{user.name}</div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className={`role-badge role-${user.role}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <Link to={`/admin/users/edit/${user._id}`} className="edit-btn">
                                                <svg className="action-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(user._id)} className="delete-btn">
                                                <svg className="action-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">
                                    <div className="empty-state">
                                        <svg className="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        <p className="empty-text">No users found</p>
                                        {searchTerm && (
                                            <button 
                                                onClick={() => setSearchTerm('')} 
                                                className="clear-search-btn"
                                            >
                                                Clear search
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* User count info */}
            <div className="users-footer">
                Showing {sortedUsers.length} of {users.length} users
            </div>
        </div>
    );
};

export default UsersList;