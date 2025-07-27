import React, { useState } from "react";

const users = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    role: "admin",
  },
];

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer", //default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Customer",
    });
  };

  const handleRoleChange = (userId, newRole) => {
    console.log({ userId, newRole });
  };

  const handleUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      console.log("deleting user with id ", userId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* add New User form */}
      <div className="mb-6 p-6 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Add New User</h2>
        <form action=" " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="" className="  block text-gray-700 ">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="  block text-gray-700 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="  block text-gray-700 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full p-2 mt-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="  block text-gray-700 ">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 mt-2 border rounded"
              required
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded  hover:bg-green-600 transition-colors"
            type="submit"
          >
            Add User
          </button>
        </form>
      </div>
      {/* User List Management  */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-300 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4  font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    name=""
                    id=""
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 border rounded"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleUser(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
