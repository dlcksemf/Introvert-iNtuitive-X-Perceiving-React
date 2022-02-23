import SignupForm from '../components/accounts/SignupForm';

function SignupPage() {
  return (
    <div class="container px-5 py-24 mx-auto flex flex-wrap items-center text-center">
      <div class="lg:w-1/2 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
        <h1 class="title-font text-center font-medium text-3xl text-gray-900">
          🖐🏻 안녕하세요, 반가워요!
        </h1>
        <h1 class="title-font text-center font-medium text-xl text-gray-900">
          회원가입 페이지 입니다.
        </h1>
        <label class="leading-relaxed text-center  mt-4 text-red-500">*</label>
        은 필수항목입니다.
      </div>
      <div class="lg:w-1/2 md:w-1/2 box-decoration-clone bg-gradient-to-r from-blue-100 to-indigo-300 rounded-lg p-8 flex flex-col md:ml-0 w-full mt-10 md:mt-0">
        <h4 className="text-xs relative mb-4"></h4>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;
