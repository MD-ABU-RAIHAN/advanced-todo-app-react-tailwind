import { toast } from "react-toastify";

const API_BASE = "http://localhost:3000/posts/";

// Helper function to handle HTTP errors
const handleHttpErrors = (res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! Status >> ${res.status}`);
  }
  return res;
};

// Reusable fetch helpers
const apiRequestHelper = async (api_url, option, errorMessage) => {
  try {
    const res = await fetch(api_url, option);
    const checkedResponse = await handleHttpErrors(res);
    return await checkedResponse.json();
  } catch (error) {
    toast.error(`${errorMessage}>> ${error}`);
    throw error;
  }
};

//Get Request
export const getApiData = async () => {
  return apiRequestHelper(API_BASE, {}, "GET request failed >>");
};

//Post Request
export const postApiData = async (data) => {
  return apiRequestHelper(
    API_BASE,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    `POST request failed >>`
  );
};

//Delete Request
export const deleteApiData = async (id) => {
  return apiRequestHelper(
    `${API_BASE}${id}`,
    { method: "DELETE" },
    `DELETE request failed >>`
  );
};

//Update / Edit Request
export const updateApiData = async (data) => {
  return apiRequestHelper(
    `${API_BASE}${data.id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
    `UPDATE request failed >>`
  );
};
