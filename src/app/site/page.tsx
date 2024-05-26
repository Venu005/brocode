"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <div className="absolute top-0 z-[-2] h-screen w-screen dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      <section className="h-full w-full pt-36 relative flex items-center justify-center flex-col">
        <div className="">
          <div className="flex justify-center items-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
            >
              <Link
                href={"/sign-up"}
                className="flex justify-center items-center"
              >
                <span className="font-medium ">Join us</span>
                <ArrowRightIcon className="font-black" />
              </Link>
            </HoverBorderGradient>
          </div>

          <h1
            className="bg-clip-text dark:text-transparent mt-2 dark:bg-gradient-to-r
            dark:from-primary dark:to-secondary-foreground md:text-9xl text-8xl font-bold text-black"
          >
            BroCode
          </h1>
          <div className="-mt-10 z-50">
            <motion.div
              className=""
              style={{
                cursor: "grab",
                width: 250,
                height: 250,
              }}
              drag
              dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
              animate={{ y: ["0%", "10%", "0%"] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Image
                src="/cursor.png"
                width={250}
                height={250}
                alt="cursor"
                className="pointer-events-none pr-24 drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
        <div className="-mt-16 mr-2">
          <h2 className="text-2xl sm:text-3xl font-semibold mt-4 text-center">
            Join your Bros in solving problems 💪🏻
          </h2>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400 m-6 text-sm">
            Bro Code is your community of bros!! Create questions,challenge each
            other and grow together.
          </p>
        </div>
      </section>
    </main>
  );
}
