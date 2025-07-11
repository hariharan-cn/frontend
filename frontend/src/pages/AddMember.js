import React, { useEffect, useState } from "react";
import axios from "axios";

const AddMember = () => {
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/members`
      );
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to fetch members:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/members`, { name });
      setName("");
      fetchMembers();
    } catch (err) {
      console.error("Failed to add member:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error("Failed to delete member:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Add Member</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="flex-1 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <h3 className="text-lg font-medium mb-2 text-gray-700">Existing Members</h3>
      <ul className="divide-y border rounded">
        {members.map((m) => (
            <li key={m._id} className="flex items-center justify-between p-2">
              <span className="text-gray-800">{m.name}</span>
              <button
                onClick={() => handleDelete(m._id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AddMember;
