import { useLocation } from 'react-router-dom';

function Footer() {
  let location = useLocation();

  return (
    <header
      className="bg-stone-100 text-gray-600 top-full py-6 mt-10"
      style={{ zIndex: location.pathname === '/' ? 900 : 0 }}
    >
      <div className="inline-block text-semibold text-sm select-none relative left-[40px] bottom-[1px] tracking-widest">
        ㈜ 유클리드소프트 | 대전 동구 계족로 151 601호 | ☎ 042) 488-6589 | ✉
        euclidsoft.lab@gmail.com
      </div>
    </header>
  );
}

export default Footer;
