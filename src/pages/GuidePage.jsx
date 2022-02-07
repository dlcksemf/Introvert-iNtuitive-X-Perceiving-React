import background from './img/book.jpg';
import map from './img/map.png';
import ReactPlayer from 'react-player';
import { FaBookOpen } from 'react-icons/fa';
import { FcIdea } from 'react-icons/fc';

function GuidePage() {
  return (
    <div>
      <h2>이용 안내</h2>
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
                  <h1 class="text-black font-semibold text-5xl mb-10">
                    도서 이용 안내
                  </h1>
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=7C2z4GqqS5E"
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
      <div class="bg-blue-200 -mt-24">
        <div class="container mx-auto px-4">
          <div class="flex flex-wrap">
            <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400 ">
                    <i class="fas fa-award">
                      <FcIdea />
                    </i>
                  </div>

                  <h6 class="text-xl font-semibold">이용 방법</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    이용 방법 적을거야 어떤거 적을까
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                    <i class="fas fa-retweet">
                      <FaBookOpen />
                    </i>
                  </div>
                  <h6 class="text-xl font-semibold">독서의 장점</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    독서를 하면 좋은점 그냥 아무 내용 일단
                  </p>
                </div>
              </div>
            </div>
            <div class="pt-6 w-full md:w-4/12 px-4 text-center">
              <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div class="px-4 py-5 flex-auto">
                  <div class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                    <i class="fas fa-fingerprint"></i>
                  </div>
                  <h6 class="text-xl font-semibold">무슨 내용을 적을까</h6>
                  <p class="mt-2 mb-4 text-blueGray-500">
                    어떤 내용을 적을지 모르겠다!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <footer class="relative  pt-10 pb-6 mt-1">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap items-center md:justify-between justify-center">
              <div class="w-full px-4 mx-auto text-left">
                <h6 class="text-xl font-semibold">찾아오시는 길</h6>
                <div
                  class="absolute w-full h-full"
                  style={{ backgroundImage: `url(${map})` }}
                ></div>
              </div>
            </div>
          </div>
        </footer> */}

        <div class="w-full px-4 mx-auto text-left">
          <h6 class="text-2xl font-semibold">찾아오시는 길</h6>
        </div>
        <div class="flex items-center p-10 w-full h-full bg-blue-200">
          <div class=" grid grid-cols-2 gap-4">
            <div class="flex flex-col justify-start">
              <div
                class="flex flex-col w-full object-cover h-full justify-items-start border rounded-lg overflow-hidden"
                style={{ backgroundImage: `url(${map})` }}
              />
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col gap-1">
                <h1 class="capitalize text-2xl font-extrabold">Address</h1>
                <p class="text-lg text-black	">
                  대전 동구 계족로 151 대전지식산업센터 601호 유클리드 소프트
                </p>
                <h1 class="capitalize text-2xl font-extrabold">Tel</h1>
                <p class="text-lg text-black	">042-488-6589</p>
                <h1 class="capitalize text-2xl font-extrabold">E-mail</h1>
                <p class="text-lg text-black	">이메일</p>
                <div class="flex items-center gap-4 my-6 cursor-pointer ">
                  <button
                    class="bg-blue-600 px-5 py-3 text-white rounded-lg w-2/4 text-center"
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
