import { AuthForm } from "@/components/auth/auth-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
export const RegisterPage = () => {
  return (
    <>
      <Header />
      <AuthForm mode="register" />
      <Footer />
    </>
  );
};
