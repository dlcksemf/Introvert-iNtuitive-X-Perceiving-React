// key : localstorage에 저장될 키 이름
// initialValue : 초기값
import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {
  const [data, setData] = useState(() => {
    const jsonString = window.localStorage.getItem(key);
    try {
      return jsonString ? JSON.parse(jsonString) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  useEffect(() => {
    const jsonString = JSON.stringify(data);
    window.localStorage.setItem(key, jsonString);
  }, [key, data]);

  // value : 함수 방식은 지원하지 않습니다. >value instanceof Function 하면 함수
  //   const SetDataToLocalStorage = (value) => {
  //     // FIXME: value가 함수일 때, 외부 data 참조하는 부분
  //     const valueToStore = value instanceof Function ? value(data) : value;
  //     setData(valueToStore);
  //     window.localStorage.setItem(key, JSON.stringify(valueToStore));
  //   };

  return [data, setData];
}

export default useLocalStorage;
