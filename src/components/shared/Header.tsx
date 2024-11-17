"use client";
import { Coffee } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";

export default function Header({ session }: { session: Session | null }) {
  const name = session?.user?.name || "";
  // const {first:firstName} = parseFullName(name);

  return (
    <>
      <header className="bg-white py-5 shadow-xl rounded-br-xl rounded-bl-xl">
        <div className="px-6 md:px-20 flex items-center justify-between text-black">
          <Link href={"/"} className="flex items-center justify-center gap-2">
            {/* <Coffee size={25} />
             */}
             <Image alt="logo" src={"./buymecoffeelogo.svg"}
             height={30} width={30}
             className="md:h-20 md:w-20 rounded-full"
             />
            <h1 className="text-2xl md:text-4xl font-bold pt-1">BuyMeChai</h1>
          </Link>

          <nav className="md:flex items-center justify-center gap-10 text-lg hidden">
            <Link href={"/about"}>About</Link>
            <Link href={"/faq"}>FAQ</Link>
            <Link href={"/contact"}>contact</Link>
            <div className="flex gap-4">
              {!session && (
                <>
                  <button
                    onClick={() => signIn("google")}
                    className="border-2 rounded-full px-4 py-2 ml-4"
                  >
                    Login
                  </button>
                  <button className="bg-yellow-300 rounded-full px-4 py-2">
                    Sign up
                  </button>
                </>
              )}
            </div>
          </nav>

          {session && (
            <div className="flex items-center justify-center rounded-full bg-gray-300">
              <Link
                href={"/profile"}
                className="flex items-center gap-1 rounded-full p-1 pr-4"
              >
                <Image
                  src={session.user?.image as string}
                  alt="avatar"
                  width="36"
                  height="36"
                  className="rounded-full"
                />
                {name}
              </Link>
              <button
                className="bg-yellow-300 rounded-full px-4 py-2"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </div>
          )}

          {!session && (
            <div className="md:hidden cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <AlignJustify />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {/* <DropdownMenuLabel>
    
    </DropdownMenuLabel> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={"/about"}>About</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/faq"}>FAQ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/contact"}>Contact</Link>
                  </DropdownMenuItem>
                  {!session && (
                    <>
                      <DropdownMenuItem>
                      <button
                    onClick={() => signIn("google")}
                    className="border-2 rounded-full px-4 py-2 ml-4"
                  >
                    Login
                  </button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                      <button className="bg-yellow-300 rounded-full px-4 py-2">
                    Sign up
                  </button>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
