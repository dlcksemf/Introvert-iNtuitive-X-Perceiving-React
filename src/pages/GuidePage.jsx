// import map from './img/map.png';
import ReactPlayer from 'react-player';

import background from './img/book1.jpg';

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
                    url="https://www.youtube.com/watch?v=mXZZvpTvtIQ"
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
              {/* <div
                  className="flex flex-col w-full object-cover h-full justify-items-start border rounded-lg overflow-hidden"
                  style={{ backgroundImage: `url(${map})` }}
                /> */}
              <a
                href="https://map.kakao.com/?urlX=599606&urlY=786443&urlLevel=3&map_type=TYPE_MAP&map_hybrid=false"
                target="_blank"
              >
                <img
                  width="504"
                  height="310"
                  src="https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=599606&MY=786443&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo"
                />
              </a>
              <div className="hide">
                <strong>
                  <img
                    src="//t1.daumcdn.net/localimg/localimages/07/2018/pc/common/logo_kakaomap.png"
                    width="72"
                    height="16"
                    alt="카카오맵"
                  />
                </strong>
                <div></div>
              </div>
            </div>
            <div className="flex flex-col">
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
                  이메일
                </p>
                <div className="flex items-center gap-4 my-6 cursor-pointer">
                  <button
                    className="bg-indigo-600 px-5 py-3 text-white rounded-full w-2/4 text-center hover:bg-indigo-700"
                    onClick={() =>
                      window.open('https://blog.naver.com/euclidsoft', '_blank')
                    }
                  >
                    MORE EUCLID SOFT
                  </button>
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
