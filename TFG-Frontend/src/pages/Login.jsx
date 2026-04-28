import AuthForm from "../components/AuthForm/AuthForm";

const Login = () => {
  return (
    <>
      <AuthForm isLogin={true} title="Login" buttonText="Sign In" />
    </>
  );
};

export default Login;
