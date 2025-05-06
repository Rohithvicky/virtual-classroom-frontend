const API_BASE_URL = "http://localhost:8080/api";

// Test connection to backend
export const testBackendConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test/hello`);
    return await response.text();
  } catch (error) {
    console.error("Backend connection failed:", error);
    return "Connection error";
  }
};

// Add more API functions here later