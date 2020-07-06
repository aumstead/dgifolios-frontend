import { useRouter } from "next/router";

function PortfolioSvg() {
  const router = useRouter();

  const path = router.pathname;
  
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill={path === "/portfolio" ? "var(--deep-green)" : "var(--mobileNavSvg)"}
    >
      <title>Portfolio</title>
      <path d="M14 18v-14c-7.732 0-14 6.268-14 14s6.268 14 14 14 14-6.268 14-14c0-2.251-0.532-4.378-1.476-6.262l-12.524 6.262zM28.524 7.738c-2.299-4.588-7.043-7.738-12.524-7.738v14l12.524-6.262z"></path>
    </svg>
  );
}

export default PortfolioSvg;