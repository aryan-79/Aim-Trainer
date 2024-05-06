import User from "@/models/user";
import { connectDb } from "@/utils/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  await connectDb();
  const body = await request.json();
  const { username, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    await connectDb();
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Some error occured", { status: 400 });
  }
};
