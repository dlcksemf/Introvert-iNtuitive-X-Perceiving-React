import { Route, Routes } from 'react-router-dom';
import SignupForm from '../components/accounts/SignupForm';

function SignupPage() {
  return (
    <Routes>
      <Route path="*" element={<SignupForm />} />
    </Routes>
  );
}
export default SignupPage;
