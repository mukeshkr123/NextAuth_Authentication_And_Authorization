import { NextResponse } from "next/server";

const { default: User } = require("@/models/User");
const bcrypt = require("bcrypt");

export async function POST(req) {
  try {
    const body = await req.json();
    const userData = body.formData;

    // confirm data exits
    if (!userData?.email || !userData?.password) {
      return NextResponse.json(
        {
          message: "Please fill all fields",
        },
        {
          status: 400,
        }
      );
    }

    // check for duplicates email addresses
    const userExists = await User.findOne({
      email: userData.email,
    })
      .lean()
      .exec();

    if (userExists) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashPassword;

    await User.create(userData);

    return NextResponse.json(
      {
        message: "User created",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: " Error",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
