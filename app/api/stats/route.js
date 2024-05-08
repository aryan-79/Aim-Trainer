import Stat from "@/models/stats";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();
  const { timer: time, sessionUser } = body;
  const averageTime = Math.floor((time * 1000) / 30);
  try {
    await connectDb();
    if (!sessionUser) {
      throw new Error("User not found");
    }
    const newStat = new Stat({
      email: sessionUser.email,
      time,
      avg: averageTime,
    });
    await newStat.save();
    return NextResponse.json(newStat);
  } catch (error) {
    return new NextResponse("some error occured while posting stats", {
      status: 400,
    });
  }
};
