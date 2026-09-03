import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";
import Emailvalidation from "@everapi/emailvalidation-js";

export const POST = async (request, res) => {
  try {
    await dbConnect();

    const { name, email, username, password } = await request.json();

    // Validate email using EmailValidation client
    const client = new Emailvalidation(process.env.EMAIL_VALIDATION_API_KEY);
    const emailResponse = await client.info(email, { catch_all: 1 });

    // Handle undeliverable emails
    if (emailResponse.state === "undeliverable") {
      return new Response(
        JSON.stringify({
          message: "Email address doesn't exist!",
        }),
        { status: 550 },
      );
    }
    let status = await client.status();

    const user = await User.findOne({ email });
    const userName = await User.findOne({ username });
    const nameExists = await User.findOne({ name });

    if (user) {
      return new Response(JSON.stringify({ message: "User already exist!" }), {
        status: 409,
      });
    }

    if (userName) {
      return new Response(
        JSON.stringify({ message: "Username already taken!" }),
        {
          status: 409,
        },
      );
    }

    if (nameExists) {
      return new Response(
        JSON.stringify({ message: "Name already taken!" }),
        {
          status: 409,
        },
      );
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!user) {
      const newUser = await User.create({
        email: email,
        name: name,
        username: username,
        password: hashedPassword,
      });

      return Response.json(
        {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
        },
        { status: 201 },
      );
    }
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong!", { status: 500 });
  }
};
