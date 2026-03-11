import AuthForm from "../components/AuthForm/AuthForm";

const Register = () => {
  return (
    <>
      <AuthForm isLogin={false} title="Register" buttonText="Create Account" />
    </>
  );
};

export default Register;
