import { useEffect } from 'react'
import {
  MdPause,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import { usePlayer } from "./PlayerContext";

export default function PreviewPlayer() {
  const {
    isPlaying,
    togglePlay,
    duration,
  } = usePlayer();

  return (
    <div className=" absolute flex flex-col items-center justify-center col-span-7 gap-3">
      <div className="flex items-center gap-5">
{/*         <MdSkipPrevious className="text-xl text-gray" />
 */}        <button
          onClick={togglePlay}
          className=" hidden flex items-center justify-center w-8 h-8 text-2xl text-black bg-white rounded-full focus:outline-none"
        >
          {/* KMDK */}
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
{/*         <MdSkipNext className="text-xl text-gray" />
 */}      </div>
    </div>
  );
}