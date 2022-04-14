import React, { useEffect } from 'react';

import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

import { useApiAxios } from 'base/api/base';

function Category({ selected, setSelected }) {
  const [{ data: categoryList }, refetch] = useApiAxios(
    {
      url: `/books/api/category/`,
      method: 'GET',
    },
    { manual: true },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="w-36">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full py-2 bg-white border-2 border-gray-400
          cursor-select focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 
          focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 
          focus-visible:border-indigo-500 sm:text-sm text-center"
          >
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <Listbox.Option
                className={({ active }) =>
                  `${active ? 'text-indigo-900 bg-indigo-100' : 'text-gray-900'}
                        cursor-default select-none relative py-2`
                }
                value="카테고리"
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`${
                        selected ? 'font-medium' : 'font-normal'
                      } block truncate text-center`}
                    >
                      전체
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? 'text-indigo-600' : 'text-indigo-600'
                        }
                              absolute inset-y-0 left-0 flex items-center`}
                      ></span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
              {categoryList &&
                categoryList.map((category, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `${
                        active
                          ? 'text-indigo-900 bg-indigo-100'
                          : 'text-gray-900'
                      }
                        cursor-default select-none relative py-2`
                    }
                    value={category.name}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate text-center`}
                        >
                          {category.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-indigo-600' : 'text-indigo-600'
                            }
                              absolute inset-y-0 left-0 flex items-center pl-3`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default Category;
