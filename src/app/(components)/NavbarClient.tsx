"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarClient(props: { session: Session | null }) {
  return (
    <nav className="bg-white h-[80px] flex items-center justify-start">
      <div className="ml-[7.5%] flex items-center gap-20">
        <Link href="/">
          <Image src="/images/logo.webp" alt="logo" width={50} height={50} />
        </Link>

        <h3 className="text-lg lg:text-2xl tracking-wider">
          Tiller vgs. Booking System
        </h3>
      </div>

      <div className="ml-auto mr-[7.5%] flex items-center gap-5">
        {!props.session && (
          <Link
            className="text-base lg:text-lg bg-emerald-400 px-3 py-2 rounded-lg"
            href={`/auth/login?redirect=${usePathname()}`}
          >
            Logg inn
          </Link>
        )}

        {props.session && (
          <p className="text-base lg:text-lg rounded-lg">
            {props.session.user?.name}
          </p>
        )}

        {props.session && (
          <button
            onClick={async () => await signOut()}
            className="text-base lg:text-lg bg-red-400 px-3 py-2 rounded-lg cursor-pointer"
          >
            Logg ut
          </button>
        )}
      </div>
    </nav>
  );
}
