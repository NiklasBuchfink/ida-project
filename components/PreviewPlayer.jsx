import { useEffect } from "react";
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { usePlayer } from "./PlayerContext";

export default function PreviewPlayer() {
  const { isPlaying, togglePlay, duration } = usePlayer();

  return (
    <div className=" absolute col-span-7 flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-5">
        {/*         <MdSkipPrevious className="text-xl text-gray" />
         */}{" "}
        <button
          onClick={togglePlay}
          className="flex hidden h-8 w-8 items-center justify-center rounded-full bg-white text-2xl text-black focus:outline-none"
        >
          {/* KMDK */}
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        {/*         <MdSkipNext className="text-xl text-gray" />
         */}{" "}
      </div>
    </div>
  );
}
