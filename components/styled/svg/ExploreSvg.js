import { useRouter } from "next/router";

function ExploreSvg() {
  const router = useRouter();

  const path = router.pathname;
  
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill={path === "/explore" ? "var(--deep-green)" : "var(--mobileNavSvg)"}
    >
      <title>Explore</title>
      <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM3 16c0-7.18 5.82-13 13-13 3.424 0 6.538 1.325 8.86 3.488l-12.86 5.512-5.512 12.86c-2.164-2.322-3.488-5.436-3.488-8.86zM18.286 18.286l-8.003 3.43 3.43-8.003 4.573 4.573zM16 29c-3.424 0-6.539-1.325-8.86-3.488l12.86-5.512 5.512-12.86c2.164 2.322 3.488 5.436 3.488 8.86 0 7.18-5.82 13-13 13z"></path>
    </svg>
  );
}

export default ExploreSvg;
