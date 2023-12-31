
"use server"

import { connect } from "http2"
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";


interface Params{
    userId: string, 
    username: string, 
    name: string,
    bio: string,
    image: string,
    path: string
}
export async function updateUser({
    userId, 
    username, 
    name,
    bio,
    image,
    path
  }: Params):Promise<void>{
  connectToDB();
 
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {upsert: true} //upsert is a combination of "update" and "insert". Is a database operation that will update an existing row of a table, if that row already exists and insert a new row if a specified value doesn't already exist
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string){
  try {
    connectToDB();
    return await User
      .findOne({id: userId})
      // .populate({
      //   path:'communities',
      //   model: Community
      // })
  } catch (error) {
    throw new Error(`Failed to fetch user: $(error.message)`)
  }
}