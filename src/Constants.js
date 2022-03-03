const API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:8000';

const itemsPerPage = 10;

const STATELIST = {
  application: {
    ALL: '전체',
    P: '처리 중',
    O: '주문 완료',
    D: '반려',
  },
  loaned: {
    ALL: '전체',
    L: '대출 중',
    P: '반납 중',
    R: '반납 완료',
    O: '연체',
  },
  books: {
    ALL: '전체',
    A: '대여 가능',
    B: '대여 불가',
    D: '삭제',
  },
};

export { API_HOST, itemsPerPage, STATELIST };
