import { AuthForm } from "@/components/auth/auth-form";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
export const LoginPage = () => {
  return (
    <>
      <Header />
      <AuthForm mode="login" />
      <Footer />
    </>
  );
};
