import React, { useState } from "react";

const LunchForm = ({ members, onSubmit }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState([]);

  const toggleParticipant = (id) => {
    setParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date, amount, paidBy, participants });
    setDate("");
    setAmount("");
    setPaidBy("");
    setParticipants([]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount (₹)
        </label>
        <input
          id="amount"
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount paid"
        />
      </div>

      <div>
        <label htmlFor="paidBy" className="block text-sm font-medium text-gray-700 mb-1">
          Paid By
        </label>
        <select
          id="paidBy"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select payer
          </option>
          {members.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">Participants</span>
        <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
          {members.map((m) => (
            <label
              key={m._id}
              className="inline-flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={m._id}
                checked={participants.includes(m._id)}
                onChange={() => toggleParticipant(m._id)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="text-gray-800">{m.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
};

export default LunchForm;
