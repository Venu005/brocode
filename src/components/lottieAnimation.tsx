"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const LottieAnimation = ({ url }: { url: string }) => {
  return (
    <DotLottiePlayer
      src={url}
      autoplay
      loop
      className="rounded-lg"
    ></DotLottiePlayer>
  );
};

export default LottieAnimation;
