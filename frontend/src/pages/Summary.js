import React, { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [summary, setSummary] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/expenses/summary/${month}`)
      .then((res) => setSummary(res.data))
      .catch((err) => console.error(err));
  }, [month]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Monthly Summary</h2>

      <label className="block mb-6">
        <span className="font-medium text-gray-700">Select Month:</span>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="mt-1 block w-40 rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </label>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 rounded-md">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="border border-gray-300 px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Total Paid (₹)
              </th>
              <th className="border border-gray-300 px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Total Share (₹)
              </th>
              <th className="border border-gray-300 px-6 py-3 text-right text-sm font-semibold text-gray-700">
                Net (Paid - Share) (₹)
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(summary).length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="border border-gray-300 px-6 py-4 text-center text-gray-500"
                >
                  No data for this month.
                </td>
              </tr>
            ) : (
              Object.entries(summary).map(([name, data]) => (
                <tr
                  key={name}
                  className="hover:bg-gray-50 even:bg-white odd:bg-gray-50"
                >
                  <td className="border border-gray-300 px-6 py-3 text-gray-800">
                    {name}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-right text-gray-800">
                    {data.paid.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-right text-gray-800">
                    {data.share.toFixed(2)}
                  </td>
                  <td
                    className={`border border-gray-300 px-6 py-3 text-right font-semibold ${
                      data.paid - data.share >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {(data.paid - data.share).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;
