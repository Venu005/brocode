import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { ModdleToggle } from "./ModeToggle";
const NavBar = async () => {
  const session = await getServerSession();
  const user = session?.user;
  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b  border-gray-200 dark:border-amber-500  bg-white/75 dark:bg-black/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200 dark:border-amber-500">
          <Link href="/" className="flex z-40 font-semibold">
            Bro <span className="text-orange-500">Code</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  onClick={() => signOut()}
                  className="w-full md:auto bg-slate-100 text-black"
                  variant="ghost"
                >
                  Log Out
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
};

export default NavBar;
