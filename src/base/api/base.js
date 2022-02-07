import Axios from 'axios';
import { API_HOST } from 'Constants';
import { makeUseAxios } from 'axios-hooks';
import { useState, useEffect } from 'react';

const axiosInstance = Axios.create({
  baseURL: API_HOST,
  // headers: {
  //   Authorization: localStorage.getItem('auth')
  //     ? 'Bearer ' + JSON.parse(localStorage.getItem('auth')).access
  //     : null,
  // },
});

const useAxios = makeUseAxios({ axios: axiosInstance });

function useApiAxios(config, options) {
  const [{ data, loading, error, response }, excute, manualCancel] = useAxios(
    config,
    options,
  );

  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    error?.response?.status === 400
      ? setErrorMessages(error.response.data)
      : setErrorMessages({});
  }, [error]);

  return [
    { data, loading, error, response, errorMessages },
    excute,
    manualCancel,
  ];
}

export { axiosInstance, useApiAxios };