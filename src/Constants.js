const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000';

const itemsPerPage = 2;

const STATELIST = {
  application: {
    A: '전체',
    P: '처리 중',
    O: '주문 완료',
    D: '반려',
  },
  loaned: {
    A: '전체',
    L: '대출 중',
    P: '반납 처리',
    R: '반납 됨',
    O: '연체',
  },
};

export { API_HOST, itemsPerPage, STATELIST };
