import { auth } from "@/lib/auth";
import NavbarClient from "./NavbarClient";

export default async function NavbarServer() {
  const session = await auth();

  return <NavbarClient session={session} />;
}
