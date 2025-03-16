import axios from "axios";

export const fetchData = async (endpoint: string, params = {}) => {
  const response = await axios.get(endpoint, { params });
  return response.data;
};
