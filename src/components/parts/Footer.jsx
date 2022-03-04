import { useLocation } from 'react-router-dom';

function Footer() {
  let location = useLocation();

  return (
    <header
      className="bg-stone-100 text-gray-600 bottom-full top-0 bg-white pt-3 pb-5"
      style={{ zIndex: location.pathname === '/' ? 900 : 0 }}
    >
      <div className="flex relative fixed bottom-full">
        <div className="inline-block text-semibold text-sm select-none ml-24 mt-2 tracking-widest">
          ㈜ 유클리드소프트 | 대전 동구 계족로 151 601호 | ☎ 042) 488-6589 | ✉
          euclidsoft.lab@gmail.com
        </div>
      </div>
    </header>
  );
}

export default Footer;
