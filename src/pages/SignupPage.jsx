import SignupForm from '../components/accounts/SignupForm';

function SignupPage() {
  return (
    <div className="bg-blue-100 text-center">
      <h2 className="text-gray-400 text-5xl mb-1">회원가입 페이지</h2>
      <h4 className="text-xs relative mb-4">
        <lable className="text-red-500">*</lable>은 필수항목입니다.
      </h4>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
