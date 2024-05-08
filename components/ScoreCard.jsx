"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ScoreCard = ({ timer }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const handleSaveScore = async () => {
    const stats = await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timer,
        sessionUser: session?.user,
      }),
    });
    router.push("/profile");
  };
  return (
    <div className="flex flex-col m-auto pt-44 w-2/3 h-1/2 justify-center items-center gap-4 ">
      <p className="font-inter font-bold text-6xl text-white">Your time</p>
      <p className="font-inter font-bold text-xl text-white">{timer} seconds</p>
      <p className="font-inter font-bold text-xl text-white">
        Your average is {Math.floor((timer * 1000) / 30)} ms per target
      </p>
      <div className="flex justify-center items-center gap-8 mt-6 font-semibold text-xl">
        <button
          type="button"
          className="border-none bg-slate-200 rounded-md h-12 w-32 text-gray-900 hover:cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Again
        </button>
        <button
          type="button"
          className="border-none rounded-md h-12 w-32 text-gray-900 bg-yellow-400 hover:cursor-pointer"
          onClick={handleSaveScore}
        >
          Save Score
        </button>
      </div>
    </div>
  );
};

export default ScoreCard;
