import mongoose from 'mongoose';

let isConnected = false; //to check if the mongoose is connected

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log("mongodb_url not found");
  if (isConnected) return console.log('Already connected to mongodb');

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to mongodb");
    
  } catch (error) {
    console.log(error);
    
  }
  
}