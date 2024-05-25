"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('/back_ground.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1 className="text-5xl">One Challenge at a time</h1>

          <motion.div
            style={{
              cursor: "grab",
              width: 200,
              height: 200,
            }}
            drag
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
          >
            <Image
              src="/cursor.png"
              width={200}
              height={200}
              alt="cursor"
              className="pointer-events-none"
            />
          </motion.div>
        </div>
      </main>
    </>
  );
}
