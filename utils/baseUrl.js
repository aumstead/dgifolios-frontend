const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://deployment-url.now.sh"
    : "http://localhost:8080";

export default baseUrl;
