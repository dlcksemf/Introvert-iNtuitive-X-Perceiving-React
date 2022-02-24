import { Popover, Transition } from '@headlessui/react';
import { useAuth } from 'base/hooks/Authcontext';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const LOGGED_IN = [
  {
    name: 'Logout',
  },
  {
    name: 'Application',
    url: '/books/application/',
  },
  {
    name: 'My Page',
    url: '/accounts/mypage/',
  },
];

const LOGGED_OUT = [
  {
    name: 'Login',
    url: '/accounts/login/',
  },
  {
    name: 'Signup',
    url: '/accounts/signup/',
  },
];

function PopOver() {
  const [auth, , , logout] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Popover className="relative inline-block">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'text-opacity-90'}
                py-2 inline-flex items-center
                transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105`}
            >
              <svg
                style={{ width: 30 + 'px', height: 30 + 'px' }}
                viewBox="0 0 24 24"
              >
                <path
                  className="fill-slate-600"
                  d="M12,19.2C9.5,19.2 7.29,17.92 6,16C6.03,14 10,12.9 12,12.9C14,12.9 17.97,14 18,16C16.71,17.92 14.5,19.2 12,19.2M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
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
              <Popover.Panel className="absolute z-10 w-48 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7">
                    {auth.isLoggedIn
                      ? LOGGED_IN.map((item) => (
                          <div
                            key={item.name}
                            onClick={() => {
                              if (item.name === 'Logout') {
                                handleLogout();
                                return;
                              }
                              navigate(`${item.url}`);
                            }}
                            className="cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-indigo-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        ))
                      : LOGGED_OUT.map((item) => (
                          <div
                            key={item.name}
                            onClick={() => {
                              navigate(`${item.url}`);
                            }}
                            className="cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-indigo-50 
                            focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-100">
                                {item.name}
                              </p>
                            </div>
                          </div>
                        ))}
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
