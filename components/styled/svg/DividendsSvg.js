import { useRouter } from "next/router";

function DividendsSvg() {
  const router = useRouter();

  const path = router.pathname;

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 28"
      fill={path === "/dividends" ? "var(--deep-green)" : "var(--mobileNavSvg)"}
    >
      <title>Dividends</title>
      <path d="M10 14v8h-4v-8h4zM16 6v16h-4v-16h4zM32 24v2h-32v-24h2v22h30zM22 10v12h-4v-12h4zM28 4v18h-4v-18h4z"></path>
    </svg>
  );
}

export default DividendsSvg;
