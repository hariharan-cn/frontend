import axios from 'axios';

const API = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/api` });

export const getMembers = async () => {
  const res = await API.get('/members');
  return res.data;
};

export const getExpenses = async () => {
  const res = await API.get('/expenses');
  return res.data;
};

export const addExpense = async (data) => {
  const res = await API.post('/expenses', data);
  return res.data;
};

export const deleteExpense = async (id) => {
  await API.delete(`/expenses/${id}`);
};
