"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const LottieAnimation = () => {
  return (
    <DotLottiePlayer
      src="/sign_in.lottie"
      autoplay
      loop
      className="rounded-lg"
    ></DotLottiePlayer>
  );
};

export default LottieAnimation;
