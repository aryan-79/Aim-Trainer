import Stat from "@/models/stats";
import User from "@/models/user";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectDb();
    const user = await User.findById(id);
    const userStats = await Stat.find({ email: user.email });
    if (!userStats) {
      throw new Error();
    }
    return NextResponse.json(userStats);
  } catch (error) {
    return new NextResponse("Some error occured while fetching stats", {
      status: 400,
    });
  }
};
