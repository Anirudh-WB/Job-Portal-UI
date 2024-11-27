import LoginInfo from "./LoginInfo";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center px-40 py-8">
        <LoginInfo />
        <LoginForm />
      </div>
    </>
  );
}
