import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { register } from "@/app/(auth)/actions";

export const metadata: Metadata = {
  title: "Créer un compte",
};

export default function RegisterPage() {
  return <AuthForm mode="register" action={register} />;
}
