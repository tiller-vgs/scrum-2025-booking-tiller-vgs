"use client";

import { signIn } from "next-auth/react";

export default function LoginClient() {
  return (
    <form className="bg-white mt-20 mx-auto w-[300px] max-w-[85%] rounded-lg shadow-md p-5">
      <button
        className="bg-emerald-400 text-base lg:text-lg cursor-pointer text-black rounded-lg px-3 py-2 w-full"
        onClick={async () => {
          await signIn("microsoft-entra-id");
        }}
      >
        Logg inn med Microsoft
      </button>
    </form>
  );
}
