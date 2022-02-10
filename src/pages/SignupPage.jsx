import SignupForm from '../components/accounts/SignupForm';

function SignupPage() {
  return (
    <div>
      <h2>회원가입 페이지</h2>
      <h4>
        <lable className="text-red-500">*</lable>은 필수항목입니다.
      </h4>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
