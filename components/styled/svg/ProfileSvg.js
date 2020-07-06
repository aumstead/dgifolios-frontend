function ProfileSvg({ username, user}) {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill={username === user.username ? "var(--deep-green)" : "var(--mobileNavSvg)"}
    >
      <title>Profile</title>
      <path d="M23.5 31.97c-1.12-1.42-2.1-2.12-4.53-2.359-0.44-0.080-0.76-0.46-0.76-0.91 0-0.33 1.080-1.32 1.069-1.33 1.121-1.131 1.721-2.961 1.721-4.371 0-2.189-1.939-4-4.5-4-2.61 0-4.5 1.811-4.5 4 0 1.42 0.59 3.26 1.71 4.391 0 0 1.080 0.979 1.080 1.31 0 0.47-0.36 0.87-0.84 0.93-2.381 0.24-3.341 0.94-4.45 2.34-0.311 0.41-0.49 1.22-0.5 1.65v1.88c0 0.83 0.689 1.5 1.54 1.5h11.92c0.851 0 1.54-0.67 1.54-1.5v-1.88c-0.010-0.432-0.181-1.241-0.5-1.651zM35.5 21h-5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5zM35.5 30h-5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5h5c1.38 0 2.5-1.12 2.5-2.5s-1.12-2.5-2.5-2.5zM0 42c0 2.21 1.79 4 4 4h40c2.21 0 4-1.79 4-4l-0-32c0-2.21-1.79-4-4-4h-12v-1.8c0-1.22-0.98-2.2-2.2-2.2h-11.6c-1.22 0-2.2 0.98-2.2 2.2v1.8h-12c-2.21 0-4 1.79-4 4v32zM7.2 11h8.8v1.8c0 1.22 0.98 2.2 2.2 2.2h11.6c1.22 0 2.2-0.98 2.2-2.2l-0-1.8h8.8c1.22 0 2.2 0.98 2.2 2.2v25.6c0 1.22-0.98 2.2-2.2 2.2l-33.6-0c-1.22 0-2.2-0.98-2.2-2.2v-25.6c0-1.22 0.98-2.2 2.2-2.2z"></path>
    </svg>
  );
}

export default ProfileSvg;