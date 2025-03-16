// 🔹 Ensure URL is a valid string (handle multiple comma-separated URLs)
export const extractValidUrl = (urlString: string | undefined): string => {
  if (!urlString) return "#";
  const urls = urlString.split(",");
  return urls.length > 0 ? urls[0].trim() : "#";
};
