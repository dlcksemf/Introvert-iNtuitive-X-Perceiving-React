import { useState, useEffect } from 'react';

function SignupFormComponent1({
  fieldValues,
  handleFieldChange,
  errorMessages,
  handleSubmit,
}) {
  return (
    <>
      <div className="relative mb-4">
        <label
          htmlFor="username"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          이름
        </label>
        <input
          type="username"
          id="username"
          name="username"
          autoComplete="off"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="이름을 입력해 주세요."
          className="peer w-full bg-white rounded border border-gray-300 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out hover:font-bold"
        />
        {errorMessages.username?.map((message, index) => (
          <p key={index} className="mt-2 text-pink-600 text-sm">
            {message}
          </p>
        ))}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="email"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          value={fieldValues.email}
          onChange={handleFieldChange}
          placeholder="이메일을 입력해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.email?.map((message, index) => (
          <p key={index} className="mt-2 text-pink-600 text-sm">
            {message}
          </p>
        ))}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="department"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          부서
        </label>
        <div>
          <select
            className="w-full h-10 bg-white rounded border border-gray-300 
              text-gray-400 hover:font-bold focus:border-indigo-500 focus:ring-2 
              focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
              leading-8 transition-colors duration-200 ease-in-out"
            name="department"
            value={fieldValues.department}
            onChange={handleFieldChange}
          >
            <option className="hidden">부서를 선택해주세요.</option>
            <option>경영관리본부</option>
            <option>공공사업그룹</option>
            <option>플랫폼사업그룹</option>
            <option>기업부설연구소</option>
          </select>
          {errorMessages.department?.map((message, index) => (
            <p key={index} className="mt-2 text-pink-600 text-sm">
              {message}
            </p>
          ))}
        </div>
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="phone_num"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          핸드폰 번호
        </label>
        <input
          type="phone_num"
          id="phone_num"
          name="phone_num"
          autoComplete="off"
          value={fieldValues.phone_num}
          onChange={handleFieldChange}
          placeholder="휴대전화 번호를 입력해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.phone_num?.map((message, index) => (
          <p key={index} className="mt-2 text-pink-600 text-sm">
            {message}
          </p>
        ))}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="password"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="비밀번호를 설정해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.password?.map((message, index) => (
          <p key={index} className="mt-2 text-pink-600 text-sm">
            {message}
          </p>
        ))}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="password2"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          비밀번호 확인
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          autoComplete="off"
          value={fieldValues.password2}
          onChange={handleFieldChange}
          placeholder="비밀번호를 재확인해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.non_field_errors?.map((message, index) => (
          <p key={index} className="mt-2 text-pink-600 text-sm">
            {message}
          </p>
        ))}
      </div>
    </>
  );
}

function SignupFormComponent2({
  fieldValues,
  handleFieldChange,
  handleSubmit,
  setFieldValues,
}) {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [day, setDay] = useState(null);

  const [gender, setGender] = useState(null);

  useEffect(() => {
    gender &&
      (gender === '남성'
        ? setFieldValues((prev) => {
            return { ...prev, gender: 'M' };
          })
        : setFieldValues((prev) => {
            return {
              ...prev,
              gender: 'F',
            };
          }));
  }, [gender, setFieldValues]);

  useEffect(() => {
    year &&
      month &&
      day &&
      setFieldValues((prevFieldValues) => {
        return {
          ...prevFieldValues,
          birthdate: `${year}-${month.slice(0, 2)}-${day}`,
        };
      });
  }, [year, month, day, setFieldValues]);

  return (
    <>
      <div className="relative mb-4">
        <label
          htmlFor="position"
          className="leading-7 text-sm text-gray-600 select-none font-semibold"
        >
          직급
        </label>
        <div>
          <select
            className="w-full h-10 bg-white rounded border border-gray-300 text-gray-400 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="position"
            value={fieldValues.position}
            onChange={handleFieldChange}
          >
            <option className="hidden">직급을 선택해주세요.</option>
            <option>사원</option>
            <option>주임</option>
            <option>대리</option>
            <option>과장</option>
            <option>차장</option>
            <option>부장</option>
            <option>전무</option>
            <option>이사</option>
            <option>대표</option>
          </select>
        </div>
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="gender"
          className="leading-7 text-sm text-gray-600 select-none font-semibold"
        >
          성별
        </label>
        <div>
          <select
            className="w-full h-10 bg-white rounded border border-gray-300 text-gray-400 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option className="hidden">성별을 선택해주세요.</option>
            <option>여성</option>
            <option>남성</option>
          </select>
        </div>
      </div>

      <div className="relative mb-4">
        <label className="leading-7 text-sm text-gray-600 select-none font-semibold">
          생일
        </label>
        <div>
          <input
            type="text"
            name="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="생년 4자리"
            className="w-[143px] text-center bg-white rounded border border-gray-3s00 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 ease-in-out"
          />
          <select
            className="w-[143px] h-[42px] text-gray-400 text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"
            name="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option className="hidden text-center">생월 선택</option>
            <option>01월</option>
            <option>02월</option>
            <option>03월</option>
            <option>04월</option>
            <option>05월</option>
            <option>06월</option>
            <option>07월</option>
            <option>08월</option>
            <option>09월</option>
            <option>10월</option>
            <option>11월</option>
            <option>12월</option>
          </select>
          <input
            type="text"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="생일 2자리"
            className="w-[143px] text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 h-[42px] leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </>
  );
}

export { SignupFormComponent1, SignupFormComponent2 };
