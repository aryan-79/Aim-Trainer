"use client";
import { useSession } from "next-auth/react";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const StatTable = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      if (session) {
        const response = await fetch(`/api/stats/${session?.user.id}`);
        const stats = await response.json();
        setStats(stats);
      }
    };
    getStats();
  }, []);
  if (!session) {
    return (
      <div
        className={`mx-auto mt-40 w-10/12 text-5xl font-bold ${roboto.className}`}
      >
        <p className="m-auto text-center">Please sigin to see your stats.</p>
        <div className="flex justify-center items-center gap-8 mt-16">
          <p className="text-xl font-normal">
            <Link href="/sign-in" className="text-indigo-600">
              Sign in
            </Link>
          </p>
          <p className="text-xl font-normal">
            Don&apos;t have an account?{"  "}
            <Link href="/sign-up" className="text-indigo-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <span className={`text-5xl font-bold ${roboto.className}`}>
        Your Stats
      </span>
      <div className="grid-header mt-12">
        <div>Time</div>
        <div>Target hit rate</div>
        <div>Date</div>
      </div>
      {stats.map((stat) => (
        <div className="grid-element mt-6" key={stat._id}>
          <div className="mt-2">{stat.time}</div>
          <div className="mt-2">{stat.avg} ms/target</div>
          <div className="mt-2">{stat.createdAt.split("T")[0]}</div>
        </div>
      ))}
    </>
  );
};

export default StatTable;
