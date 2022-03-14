function CancelIcon() {
  return (
    <button className="text-white transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-100">
      <svg
        fill="currentColor"
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z" />
        <path d="M0 0h48v48h-48z" fill="none" />
      </svg>
    </button>
  );
}

export default CancelIcon;
