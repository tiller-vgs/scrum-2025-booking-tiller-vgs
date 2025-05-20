import type { NextAuthConfig } from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const authConfig = { providers: [MicrosoftEntraID({})] } as NextAuthConfig;

export default authConfig;
