"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { RxAvatar } from "react-icons/rx";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div className="m-auto w-10/12 h-14 py-2 flex justify-between items-center">
      <div className="flex gap-6 justify-between items-center">
        <Link href="/">
          <Image
            src="https://images.pexels.com/photos/5079604/pexels-photo-5079604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Logo"
            height={20}
            width={50}
            className="rounded-full overflow-hidden aspect-square"
          />
        </Link>
        <span
          className={`font-bold text-2xl lg:text-4xl ${roboto.className} gr_gradient cursor-pointer`}
          onClick={() => router.push("/")}
        >
          Aim Trainer
        </span>
      </div>

      {pathname.includes("/sign-in") || pathname.includes("/sign-up") ? (
        <></>
      ) : (
        <>
          {session?.user ? (
            <div className="flex items-center justify-around gap-12">
              <Link
                href="/stats"
                className="font-semibold text-xl hover:text-gray-600"
              >
                Your Stats
              </Link>
              <button
                className="border-xl p-2 rounded-md bg-blue-700 text-gray-200"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <Link href="/profile">
                {session.user.image ? (
                  <div className="rounded-full aspect-square overflow-hidden">
                    <Image
                      src={session.user.image}
                      width={40}
                      height={20}
                      alt="Profile"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-8 flex items-center justify-center">
                    <RxAvatar className="object-cover w-full h-full" />
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-around gap-6">
              <button
                type="button"
                onClick={() => router.push("/sign-in")}
                className="border-xl p-2 rounded-md bg-blue-700 text-gray-200"
              >
                sign in
              </button>
              <button
                type="button"
                onClick={() => router.push("/sign-up")}
                className="border-xl p-2 rounded-md bg-blue-700 text-gray-200"
              >
                sign up
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
