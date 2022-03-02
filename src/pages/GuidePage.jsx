// import map from './img/map.png';
import ReactPlayer from 'react-player';
import background from './img/book1.jpg';
import blog from 'components/parts/image/blog.png';
import hopeBook from 'components/parts/image/hopeBook.png';

function GuidePage() {
  const Item = ({ text }) => {
    return (
      <div>
        {text.split('\n').map((txt, index) => (
          <p key={index}>
            {txt}
            <br />
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-3">
      <div className="relative  bg-blueGray-50">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${background})` }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-40 bg-white"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1
                    className="backdrop-blur-lg text-black font-semibold text-5xl mb-10 select-none
                  ring-4 ring-blue-600 py-2 rounded-lg mb-14"
                  >
                    도서 이용 안내
                  </h1>

                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=mBQ53W-iX94"
                    playing
                    controls
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          //   style="transform: translateZ(0px)"
        >
          <polygon
            className="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </div>
      </div>
      <div className="bg-blue-100 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div className="px-4 py-5 flex-auto">
                  <div
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">🤴</p>
                  </div>

                  <h6 className="text-xl font-semibold select-none">
                    이달의 독서왕은 나야나
                  </h6>
                  <div className="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '이제 수기로 작성하던 기록은 No! \n 내가 빌린 책이 데이터로 남아 \n 이달의 독서왕도 도전할 수 있어요.'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-4/12 px-4 text-center">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div className="px-4 py-5 flex-auto">
                  <div
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">📖</p>
                  </div>
                  <h6 className="text-xl font-semibold select-none">
                    내가 읽고 싶은 책은..
                  </h6>
                  <div className="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '읽고 싶고 필요한 책은 많은데.. \n 이런 고민이 있었다면 이제는 도서 신청을 \n 적극 활용해봐요!'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mt-4 mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div className="px-4 py-5 flex-auto">
                  <div
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">📃</p>
                  </div>
                  <h6 className="text-xl font-semibold select-none">
                    나의 독서 기록
                  </h6>
                  <div className="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '내가 이번 달에 책을 얼마나 읽었지? \n 이제는 마이페이지를 통해 \n 빌린 내역의 통계를 볼 수 있어요.'
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center p-5 w-full h-full bg-blue-100 mt-4">
          <div className=" grid grid-cols-2 gap-4 m-auto">
            <div className="flex flex-col justify-start">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2240.320380004432!2d127.44264815233345!3d36.3274535222694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565494830b9e129%3A0x242d1a163ecf4103!2z64yA7KCE7KeA7Iud7IKw7JeF7IS87YOA!5e0!3m2!1sko!2skr!4v1646012324942!5m2!1sko!2skr"
                width="600"
                height="450"
                className=""
                loading="lazy"
              />
            </div>
            <div className="flex flex-col ml-20 mt-20">
              <div className="flex flex-col gap-1">
                <h1 className="capitalize text-2xl font-extrabold select-none">
                  Address
                </h1>
                <p
                  className="text-lg text-black select-none
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  대전 동구 계족로 151 대전지식산업센터 601호 유클리드 소프트
                </p>
                <h1 className="capitalize text-2xl font-extrabold select-none">
                  Tel
                </h1>
                <p
                  className="text-lg text-black select-none
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  042-488-6589
                </p>
                <h1 className="capitalize text-2xl font-extrabold select-none">
                  E-mail
                </h1>

                <p
                  className="text-lg text-black select-none 
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  euclidsoft.lab@gmail.com
                </p>
                <div className="flex items-center mt-3">
                  <div
                    className=" gap-4 my-6 cursor-pointer
                transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100"
                  >
                    <button
                      onClick={() =>
                        window.open(
                          'https://blog.naver.com/euclidsoft',
                          '_blank',
                        )
                      }
                    >
                      <img src={blog} alt="블로그" className="w-16 h-16 ml-1" />
                      <h1 className="bg-indigo-600 px-3 py-2 text-white rounded-full text-center hover:bg-indigo-700 mt-2">
                        블로그
                      </h1>
                    </button>
                  </div>
                  <div className=" inline-block">
                    <div className="ml-7 transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100">
                      <svg
                        onClick={() =>
                          window.open(
                            'https://www.facebook.com/euclidsoft.lab/',
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="w-20 h-20 ml-1 cursor-pointer"
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
                      <h1 className="bg-indigo-600 px-2 py-2 text-white rounded-full text-center hover:bg-indigo-700 mb-2.5 select-none cursor-pointer">
                        페이스북
                      </h1>
                    </div>
                  </div>
                  <div
                    className="ml-6 transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100"
                    onClick={() =>
                      window.open('http://djbook.or.kr/', '_blank')
                    }
                  >
                    <img
                      src={hopeBook}
                      alt="희망의책"
                      className="ml-3 w-16 h-16 bg-contain cursor-pointer inline-block rounded-full"
                    />
                    <h1 className="bg-indigo-600 ml-1.5 px-2 py-2 text-white rounded-full text-center hover:bg-indigo-700 mt-1.5 select-none cursor-pointer">
                      희망의책
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuidePage;
