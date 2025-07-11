import React, { useState, useEffect } from "react";
import {
  getExpenses,
  getMembers,
  addExpense,
  deleteExpense,
} from "../services/api";
import LunchForm from "../components/LunchForm";


const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [members, setMembers] = useState([]);

  const load = async () => {
    setExpenses(await getExpenses());
    setMembers(await getMembers());
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (data) => {
    await addExpense(data);
    load();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    load();
  };

  return (
    <div>
      <LunchForm members={members} onSubmit={handleAdd} />
      {/* <LunchModal members={members} onSubmit={addExpense} /> */}
      <div className="overflow-x-auto max-w-4xl mx-auto mt-6">
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden bg-white shadow">
          <thead className="bg-blue-100 text-sm text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Paid By</th>
              <th className="px-4 py-2 border">Participants</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr
                key={exp._id}
                className="even:bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <td className="px-4 py-2 border">
                  {new Date(exp.date).toDateString()}
                </td>
                <td className="px-4 py-2 border">₹{exp.amount}</td>
                <td className="px-4 py-2 border">{exp.paidBy.name}</td>
                <td className="px-4 py-2 border">
                  {exp.participants.map((p) => p.name).join(", ")}
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
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

export default Home;
