import { Route, Routes } from 'react-router-dom';
import SignupForm from '../components/accounts/SignupForm';
import SignupForm2 from '../components/accounts/SignupForm2';

function SignupPage() {
  return (
    <Routes>
      <Route path="*" element={<SignupForm />} />
      <Route path="/2/" element={<SignupForm2 />} />
    </Routes>
  );
}

export default SignupPage;
