const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000';

const itemsPerPage = 2;

const STATELIST = {
  application: {
    A: '전체',
    P: '처리 중',
    O: '주문 완료',
    D: '반려',
  },
};

export { API_HOST, itemsPerPage, STATELIST };
