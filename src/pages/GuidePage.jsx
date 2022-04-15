import ReactPlayer from 'react-player';
import background from './img/book1.jpg';
import blog from 'components/parts/image/blog.png';
import hopeBook from 'components/parts/image/hopeBook.png';
import guide from 'components/parts/image/guide.gif';

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
    <>
      <div className="border-b-4 border-sky-600 w-[1140px] relative left-[200px]">
        <h2 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
          유클리드 북스 이용 안내
        </h2>
      </div>
      <div className="h-[1100px] w-[600px]">
        <div className="absolute top-[100px] left-[200px] select-none">
          <img src={guide} alt="이용안내 동영상" className="shadow-xl" />
        </div>
        <div className="absolute left-[820px] top-[110px]">
          <div className="text-white px-3 py-1.5 inline-flex rounded-full bg-rose-400">
            <p className="select-none font-bold">🤴 이달의 독서왕은 나야나</p>
          </div>
          <div className="mt-2 mb-4 text-blueGray-500 select-none">
            <Item
              text={
                '이제 수기 기록은 No! 도서 대출 데이터로 유클리드 독서왕에 도전할 수 있어요.'
              }
            />
          </div>
        </div>
        <div className="relative left-[820px] top-[150px]">
          <div className="text-white px-3 py-1.5 text-center inline-flex rounded-full bg-blue-400">
            <p className="select-none font-bold">📖 내가 읽고 싶은 책은</p>
          </div>
          <div className="mt-2 mb-4 text-blueGray-500 select-none">
            <Item
              text={
                '읽고 싶고 필요한 책에 대한 고민이 있다면, 도서 신청을 적극 활용해봐요!'
              }
            />
          </div>
        </div>
        <div className="relative left-[820px] top-[150px]">
          <div className="text-white px-3 py-1.5 text-center inline-flex rounded-full bg-emerald-400">
            <p className="select-none font-bold">🎲 다양한 보드게임은</p>
          </div>
          <div className="mt-2 mb-4 text-blueGray-500 select-none">
            <Item
              text={
                '점심시간 또는 특별한 순간에 보드게임 대여를 통해 모두가 함께 즐길 수 있어요!'
              }
            />
          </div>
        </div>
        <div className="relative left-[820px] top-[150px]">
          <div className="text-white px-3 py-1.5 text-center inline-flex rounded-full bg-amber-400">
            <p className="select-none font-bold">📃 나의 독서 기록</p>
          </div>
          <div className="mt-2 mb-4 text-blueGray-500 select-none">
            <Item
              text={
                '나의 이번달 독서량이 궁금하다면? 마이페이지를 통해 통계를 확인해 볼 수 있어요.'
              }
            />
          </div>
        </div>

        <div className="absolute left-[200px] top-[580px]">
          <h1 className="text-3xl font-bold relative bottom-[20px] left-[20px] select-none">
            찾아오는 길
          </h1>
          <div className="absolute top-[40px] select-none shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2240.320380004432!2d127.44264815233345!3d36.3274535222694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565494830b9e129%3A0x242d1a163ecf4103!2z64yA7KCE7KeA7Iud7IKw7JeF7IS87YOA!5e0!3m2!1sko!2skr!4v1646012324942!5m2!1sko!2skr"
              width="600"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="absolute left-[650px] top-[95px]">
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

            <div className="flex relative top-[20px] w-[300px]">
              <div
                className="gap-4 my-6 cursor-pointer select-none
                transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100"
              >
                <button
                  onClick={() =>
                    window.open('https://blog.naver.com/euclidsoft', '_blank')
                  }
                >
                  <img src={blog} alt="블로그" className="w-16 h-16 ml-1" />
                  <h1 className="text-center mt-2 text-xl font-bold border-b-4 border-sky-600">
                    블로그
                  </h1>
                </button>
              </div>

              <div
                className="gap-4 my-6 cursor-pointer relative left-[50px] bottom-[16px] select-none
                transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100"
              >
                <button
                  onClick={() =>
                    window.open(
                      'https://www.facebook.com/euclidsoft.lab/',
                      '_blank',
                    )
                  }
                >
                  <svg
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
                  <h1 className="text-center mt-2 text-xl font-bold border-b-4 border-sky-600">
                    페이스북
                  </h1>
                </button>
              </div>
              <div
                className="gap-4 my-6 cursor-pointer relative left-[100px] bottom-[1px] select-none
                transition duration-500 ease-in-out hover:-translate-y-3 hover:scale-100"
              >
                <button
                  onClick={() => window.open('http://djbook.or.kr/', '_blank')}
                >
                  <img
                    src={hopeBook}
                    alt="희망의책"
                    className="ml-3 w-16 h-16 bg-contain cursor-pointer inline-block rounded-full"
                  />
                  <h1 className="text-center mt-2 text-xl font-bold border-b-4 border-sky-600">
                    희망의책
                  </h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuidePage;
