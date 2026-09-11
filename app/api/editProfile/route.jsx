import dbConnect from "@/lib/dbConnect";
import cloudinary from "@/config/cloudinary";
import User from "@/models/user";
import mongoose from "mongoose";
import { auth } from "@/auth";

export const PATCH = async (request) => {
  try {

    const formData = await request.formData();

    const file = formData.get("avatar");

    const userId = formData.get("userId");

    const sessionUser = await auth();

    if (!sessionUser || !sessionUser.user?.id) {
      return new Response("Unauthorized access", { status: 401 });
    }

    if (!file || !file.type.startsWith("image/")) {
      return new Response("Invalid file type", { status: 400 });
    }

    const profile = {};

    const imageBuffer = await file.arrayBuffer();
    const imageData = Buffer.from(imageBuffer);

    //Convert the image data to base64
    const imageBase64 = imageData.toString("base64");

    let result;

    try {
      //Make request to upload to cloudinary
      result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: "art_in_amsterdam", transformation: [ { width: 200, height: 200, crop: "fill", gravity: "face", }, ], },
      );
    } catch (uploadError) {
      console.error("Cloudinary upload failed", uploadError);
      return new Response("Image upload failed", { status: 500 });
    }

    //Add uploaded images to the post
    profile.image = result.secure_url;

    await dbConnect()

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new Error("No such user, register first!");
    }

    const updateUser = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          avatar: profile.image,
        },
      },
      { new: true }, // Return the updated document
    );

    return new Response(JSON.stringify(updateUser), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to add post", { status: 500 });
  }
};