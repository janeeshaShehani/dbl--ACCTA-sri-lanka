import type { Metadata } from "next";
import LoginForm from "@/components/login/LoginForm";

export const metadata: Metadata = {
  title: "Member Login | ACCTA Sri Lanka",
  description: "Member access information for ACCTA Sri Lanka.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return <LoginForm />;
}
