function LoanedIcon() {
  return (
    <div>
      <button
        type="button"
        className="rounded-full w-10 h-10 p-0 border-2 border-gray-200 inline-flex items-center justify-center text-gray-400 ml-4 hover:text-indigo-500"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="archive"
          className="w-5 h-4"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M144.3 32.04C106.9 31.29 63.7 41.44 18.6 61.29c-11.42 5.026-18.6 16.67-18.6 29.15l0 357.6c0 11.55 11.99 19.55 22.45 14.65c126.3-59.14 219.8 11 223.8 14.01C249.1 478.9 252.5 480 256 480c12.4 0 16-11.38 16-15.98V80.04c0-5.203-2.531-10.08-6.781-13.08C263.3 65.58 216.7 33.35 144.3 32.04zM557.4 61.29c-45.11-19.79-88.48-29.61-125.7-29.26c-72.44 1.312-118.1 33.55-120.9 34.92C306.5 69.96 304 74.83 304 80.04v383.1C304 468.4 307.5 480 320 480c3.484 0 6.938-1.125 9.781-3.328c3.925-3.018 97.44-73.16 223.8-14c10.46 4.896 22.45-3.105 22.45-14.65l.0001-357.6C575.1 77.97 568.8 66.31 557.4 61.29z"
          />
        </svg>
      </button>
    </div>
  );
}

function GameLoanedIcon() {
  return (
    <div>
      <button
        type="button"
        className="rounded-full w-10 h-10 p-0 border-2 border-gray-200 inline-flex items-center justify-center text-gray-400 ml-4 hover:text-indigo-500"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-5"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M432 96h-256c-44 0-80 36-80 80v256c0 44 36 80 80 80h256c44 0 80-36 80-80v-256c0-44-36-80-80-80zM208 448c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zM208 256c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zM304 352c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zM400 448c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zM400 256c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zM414.38 64c-7.465-36.402-39.855-64-78.38-64h-256c-44 0-80 36-80 80v256c0 38.523 27.598 70.915 64 78.38v-318.38c0-17.6 14.4-32 32-32h318.38z"
          />
        </svg>
      </button>
    </div>
  );
}

export { LoanedIcon, GameLoanedIcon };
