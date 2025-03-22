import React from "react";
import { getUsers } from "../../store/userStore"; // Import getUsers function

const User = () => {
    const users = getUsers();

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">User List</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Gender</th>
                        <th className="py-2">Date of Birth</th>
                        <th className="py-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className="py-2">{user.name}</td>
                            <td className="py-2">{user.email}</td>
                            <td className="py-2">{user.gender}</td>
                            <td className="py-2">{user.dob}</td>
                            <td className="py-2">{user.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;
