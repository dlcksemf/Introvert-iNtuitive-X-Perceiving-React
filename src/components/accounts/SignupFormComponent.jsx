import { useState } from 'react';

function SignupFormComponent1({
  fieldValues,
  handleFieldChange,
  errorMessages,
}) {
  return (
    <>
      <div className="relative mb-4">
        <label
          htmlFor="username"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          Name
        </label>
        <input
          type="username"
          id="username"
          name="username"
          autoComplete="username"
          value={fieldValues.username}
          onChange={handleFieldChange}
          placeholder="이름을 입력해 주세요."
          className="peer w-full bg-white rounded border border-gray-300 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
              text-base outline-none text-gray-700 py-1 px-3 leading-8 
              transition-colors duration-200 ease-in-out hover:font-bold"
        />
        {errorMessages.username?.map((message, index) => (
          <p
            key={index}
            className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
          >
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
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={fieldValues.email}
          onChange={handleFieldChange}
          placeholder="이메일을 입력해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.email?.map((message, index) => (
          <p
            key={index}
            className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
          >
            {message}
          </p>
        ))}
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="phone_num"
          className="leading-7 text-sm text-gray-600 select-none
                after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        >
          Phone Number
        </label>
        <input
          type="phone_num"
          id="phone_num"
          name="phone_num"
          autoComplete="phone_num"
          value={fieldValues.phone_num}
          onChange={handleFieldChange}
          placeholder="휴대전화 번호를 입력해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.phone_num?.map((message, index) => (
          <p
            key={index}
            className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
          >
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
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="password"
          value={fieldValues.password}
          onChange={handleFieldChange}
          placeholder="비밀번호를 설정해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.password?.map((message, index) => (
          <p
            key={index}
            className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
          >
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
          Re-enter password
        </label>
        <input
          type="password"
          id="password2"
          name="password2"
          autoComplete="password2"
          value={fieldValues.password2}
          onChange={handleFieldChange}
          placeholder="비밀번호를 재확인해주세요."
          className="peer w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        {errorMessages.non_field_errors?.map((message, index) => (
          <p
            key={index}
            className="mb-2 mt-2 invisible peer-invalid:visible text-pink-600 text-sm"
          >
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
  const [date, setDate] = useState({});

  const handleGenderField = (e) => {
    const { value } = e.target;

    if (value && value === '남성') {
      setFieldValues((prevFieldValues) => {
        return {
          ...prevFieldValues,
          gender: 'M',
        };
      });
    } else if (value) {
      setFieldValues((prevFieldValues) => {
        return {
          ...prevFieldValues,
          gender: 'F',
        };
      });
    }
  };

  const handleBirthField = (e) => {
    const { name, value } = e.target;
    setDate((prevFieldValues) => {
      return {
        ...prevFieldValues,
        [name]: value,
      };
    });

    if ('year' in date && 'month' in date && 'day' in date) {
      setFieldValues((prevFieldValues) => {
        return {
          ...prevFieldValues,
          birthdate: `${date.year}-${date.month}-${date.day}`,
        };
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <label
          htmlFor="position"
          className="leading-7 text-sm text-gray-600 select-none font-semibold"
        >
          Position
        </label>
        <div>
          <select
            className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
          Gender
        </label>
        <div>
          <select
            className="w-full bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="gender"
            value={fieldValues.gender}
            onChange={handleGenderField}
          >
            <option className="hidden">성별을 선택해주세요.</option>
            <option>여성</option>
            <option>남성</option>
          </select>
        </div>
      </div>

      <div className="relative mb-4">
        <label
          htmlFor="birthdate"
          className="leading-7 text-sm text-gray-600 select-none font-semibold"
        >
          Birth Day
        </label>
        <div>
          <input
            type="birthdate"
            id="birthdate"
            name="year"
            autoComplete="birthdate"
            value={fieldValues.birthdate}
            onChange={handleBirthField}
            placeholder="생년 4자리"
            className="w-32 text-center bg-white rounded border border-gray-3s00 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <select
            className="w-32 text-center pt-2 pb-2 bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            name="month"
            value={fieldValues.position}
            onChange={handleBirthField}
          >
            <option className="hidden text-center">생월 선택</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>7월</option>
            <option>8월</option>
            <option>9월</option>
            <option>10월</option>
            <option>11월</option>
            <option>12월</option>
          </select>
          <input
            type="birthdate"
            id="birthdate"
            name="day"
            autoComplete="birthdate"
            value={fieldValues.birthdate}
            onChange={handleBirthField}
            placeholder="생일 2자리"
            className="w-32 text-center bg-white rounded border border-gray-300 hover:font-bold focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
    </form>
  );
}

export { SignupFormComponent1, SignupFormComponent2 };
