const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://divfolios.herokuapp.com"
    : "http://localhost:8080";

export default baseUrl;
