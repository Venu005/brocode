"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { signOut, useSession } from "next-auth/react";
import { ModdleToggle } from "./ModeToggle";

function NavBar() {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full   backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between ">
          <Link href="/" className="flex z-40 font-semibold">
            <div>
              <p
                className="bg-clip-text text-transparent bg-gradient-to-r
            from-primary to-secondary-foreground text-md font-bold"
              >
                BroCode
              </p>
            </div>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <span className="mr-4">
                  Welcome, {user.username || user.email}
                </span>
                <Button
                  onClick={() => signOut()}
                  className="w-full md:w-auto bg-slate-100 text-black"
                  variant="outline"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>

                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>
              </>
            )}
            <ModdleToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default NavBar;
