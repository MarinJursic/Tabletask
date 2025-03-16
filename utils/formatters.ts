// 🔹 Helper Function to Format Date "retrievalDate" → "04.03.2025."
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE").replace(/\//g, ".") + ".";
};
