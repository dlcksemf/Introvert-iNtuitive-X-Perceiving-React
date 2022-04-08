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
      <div className="flex justify-center mt-72">
        <div className="w-1/2">
          <div className="bg-white relative rounded-lg p-4 sm:p-4 md:p-8 lg:p-12 shadow-lg border-2 border-gray-200">
            <h1
              className="text-center text-gray-600 font-semibold text-2xl select-none
                 py-2 rounded-lg mb-14"
            >
              도서 이용 안내
            </h1>

            <ReactPlayer
              url="https://www.youtube.com/watch?v=mBQ53W-iX94"
              playing
              controls
            />

            <div className="px-4 py-5">
              <div className="text-white px-3 py-1.5 text-center inline-flex mt-10 mb-3 shadow-lg rounded-full bg-red-400">
                <p className="select-none font-bold">
                  🤴 이달의 독서왕은 나야나
                </p>
              </div>

              <div className="mt-2 mb-4 text-blueGray-500 select-none">
                <Item
                  text={
                    '이제 수기로 작성하던 기록은 No! 내가 빌린 책이 데이터로 남아 이달의 독서왕도 도전할 수 있어요.'
                  }
                />
              </div>
            </div>

            <div className="px-4 py-5">
              <div className="text-white px-3 py-1.5 text-center inline-flex mb-3 shadow-lg rounded-full bg-blue-400">
                <p className="select-none font-bold">📖 내가 읽고 싶은 책은</p>
              </div>

              <div className="mt-2 mb-4 text-blueGray-500 select-none">
                <Item
                  text={
                    '읽고 싶고 필요한 책은 많은데...이런 고민이 있었다면 이제는 도서 신청을 적극 활용해봐요!'
                  }
                />
              </div>
            </div>

            <div className="px-4 py-5">
              <div className="text-white px-3 py-1.5 text-center inline-flex mb-3 shadow-lg rounded-full bg-emerald-400">
                <p className="select-none font-bold">📃 나의 독서 기록</p>
              </div>

              <div className="mt-2 mb-4 text-blueGray-500 select-none">
                <Item
                  text={
                    '내가 이번 달에 책을 얼마나 읽었지? 이제는 마이페이지를 통해 빌린 내역의 통계를 볼 수 있어요.'
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center p-5 w-full h-full bg-white mt-52 mb-10">
          <div className=" grid grid-cols-2 m-auto">
            <div className="flex flex-col justify-right">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2240.320380004432!2d127.44264815233345!3d36.3274535222694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565494830b9e129%3A0x242d1a163ecf4103!2z64yA7KCE7KeA7Iud7IKw7JeF7IS87YOA!5e0!3m2!1sko!2skr!4v1646012324942!5m2!1sko!2skr"
                width="400"
                height="400"
                className=""
                loading="lazy"
              />
            </div>
            <div className="flex flex-col ml-5 mt-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-lg font-semibold select-none">ADDRESS</h1>
                <p
                  className="text-lg text-gray-700 select-none
                pb-3
                "
                >
                  대전 동구 계족로 151 대전지식산업센터 601호 유클리드 소프트
                </p>

                <h1 className="text-lg font-semibold select-none">TEL</h1>
                <p
                  className="text-lg text-gray-700 select-none pb-3
                "
                >
                  042-488-6589
                </p>

                <h1
                  className="text-lg font-semibold select-none 
                "
                >
                  E-MAIL
                </h1>
                <p className="text-lg text-gray-700 select-none pb-3">
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
