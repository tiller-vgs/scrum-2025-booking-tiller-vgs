import { Metadata } from "next";
import LoginClient from "./loginClient";

export const metadata: Metadata = {
  title: "Logg inn",
  description: "Logg inn for å booke et rom.",
};

export default async function LoginPage() {
  return <LoginClient />;
}
