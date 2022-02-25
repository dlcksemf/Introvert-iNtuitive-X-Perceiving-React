import background from './img/book1.jpg';
import map from './img/map.png';
import ReactPlayer from 'react-player';

function GuidePage() {
  const Item = ({ text }) => {
    return (
      <p>
        {text.split('\n').map((txt) => (
          <>
            {txt}
            <br />
          </>
        ))}
      </p>
    );
  };

  return (
    <div className="mt-3">
      <div class="relative  bg-blueGray-50">
        <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            class="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${background})` }}
          >
            <span
              id="blackOverlay"
              class="w-full h-full absolute opacity-40 bg-white"
            ></span>
          </div>
          <div class="container relative mx-auto">
            <div class="items-center flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div class="pr-12">
                  <h1
                    class="backdrop-blur-lg text-black font-semibold text-5xl mb-10 select-none
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
          class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          //   style="transform: translateZ(0px)"
        >
          <polygon
            class="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </div>
      </div>
      <div class="bg-blue-100 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">🤴</p>
                  </div>

                  <h6 class="text-xl font-semibold select-none">
                    이달의 독서왕은 나야나
                  </h6>
                  <p class="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '이제 수기로 작성하던 기록은 No! \n 내가 빌린 책이 데이터로 남아 \n 이달의 독서왕도 도전할 수 있어요.'
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">📖</p>
                  </div>
                  <h6 class="text-xl font-semibold select-none">
                    내가 읽고 싶은 책은..
                  </h6>
                  <p class="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '읽고 싶고 필요한 책은 많은데.. \n 이런 고민이 있었다면 이제는 도서 신청을 \n 적극 활용해봐요!'
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white w-full mt-4 mb-8 shadow-lg rounded-lg
              transition duration-500 ease-in-out hover:-translate-y-6 hover:scale-100"
              >
                <div class="px-4 py-5 flex-auto">
                  <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400
                  transition duration-500 ease-in-out hover:scale-125"
                  >
                    <p className="select-none">📃</p>
                  </div>
                  <h6 class="text-xl font-semibold select-none">
                    나의 독서 기록
                  </h6>
                  <p class="mt-2 mb-4 text-blueGray-500 select-none hover:font-semibold hover:text-gray-600">
                    <Item
                      text={
                        '내가 이번 달에 책을 얼마나 읽었지? \n 이제는 마이페이지를 통해 \n 빌린 내역의 통계를 볼 수 있어요.'
                      }
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center p-5 w-full h-full bg-blue-100 mt-4">
          <div class=" grid grid-cols-2 gap-4 m-auto">
            <div class="flex flex-col justify-start">
              <div
                class="flex flex-col w-full object-cover h-full justify-items-start border rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${map})` }}
              />
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col gap-1">
                <h1 class="capitalize text-2xl font-extrabold select-none">
                  Address
                </h1>
                <p
                  class="text-lg text-black select-none
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  대전 동구 계족로 151 대전지식산업센터 601호 유클리드 소프트
                </p>
                <h1 class="capitalize text-2xl font-extrabold select-none">
                  Tel
                </h1>
                <p
                  class="text-lg text-black select-none
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  042-488-6589
                </p>
                <h1 class="capitalize text-2xl font-extrabold select-none">
                  E-mail
                </h1>
                <p
                  class="text-lg text-black select-none 
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100"
                >
                  이메일
                </p>
                <div class="flex items-center gap-4 my-6 cursor-pointer">
                  <button
                    class="bg-blue-600 px-5 py-3 text-white rounded-lg w-2/4 text-center hover:bg-blue-700
                    transition duration-500 ease-in-out hover:-translate-y-2 hover:scale-100"
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
