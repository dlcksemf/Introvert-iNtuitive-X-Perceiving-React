import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function PopOver() {
  const navigate = useNavigate();

  return (
    <div>
      <Popover className="relative inline-block">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                py-2 inline-flex items-center
                `}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 flex space-x-4 px-4 mt-3 transform -translate-x-1/2 left-[300px] top-[48px] h-[100px]">
                <div className="w-screen mr-[220px]">
                  <div className="bg-gray-100 text-white px-3 py-2 rounded-md text-sm font-medium">
                    <div className="sm:hidden" id="mobile-menu">
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        <h1
                          className="hover:bg-gray-200 text-black block px-3 py-2 rounded-md text-base font-medium cursor-pointer select-none"
                          aria-current="page"
                          onClick={() => {
                            navigate(`/books/booklist/`);
                          }}
                        >
                          도서목록
                        </h1>

                        <h1
                          className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium cursor-pointer select-none"
                          onClick={() => {
                            navigate(`/books/application/new/`);
                          }}
                        >
                          도서신청
                        </h1>

                        <h1
                          className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium cursor-pointer select-none"
                          onClick={() => {
                            navigate(`/game/gamelist/`);
                          }}
                        >
                          보드게임
                        </h1>

                        <h1
                          className="text-black hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium cursor-pointer select-none"
                          onClick={() => {
                            navigate(`/guidepage/`);
                          }}
                        >
                          이용안내
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}

export default PopOver;
