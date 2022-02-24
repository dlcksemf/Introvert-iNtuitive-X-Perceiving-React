import hope_book from './image/hope_book.jpg';

function Footer() {
  return (
    <header className="text-gray-600 body-font sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-20 mt-8">
      <div className="flex">
        <div className="inline-block text-semibold select-none mt-3 ml-3">
          (주) EUCLID SOFT - 대전 동구 계족로 151
        </div>

        <div className="absolute right-40 inline-block">
          <div className="mb-8">
            <svg
              className="cursor-pointer"
              onClick={() =>
                window.open('https://www.facebook.com/euclidsoft.lab/')
              }
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="48px"
              height="48px"
            >
              <path
                fill="#039be5"
                d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
              />
              <path
                fill="#fff"
                d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
              />
            </svg>
          </div>
        </div>
        <div
          className="absolute right-10 ml-1 w-28 h-10 bg-contain cursor-pointer inline-block"
          style={{ backgroundImage: `url(${hope_book})` }}
          onClick={() => window.open('http://djbook.or.kr/', '_blank')}
        ></div>
      </div>
    </header>
  );
}

export default Footer;
