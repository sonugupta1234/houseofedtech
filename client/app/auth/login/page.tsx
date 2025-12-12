
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../../components/Navbar"));
const LoginForm = dynamic(() => import("../../components/LoginForm"));


export default function LoginPage() {
 
  return (
    <>
    <Navbar />
    <LoginForm />
    </>
  );
}
