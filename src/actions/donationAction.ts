import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import mongoose from "mongoose";

export async function createDonation(formData:FormData):Promise<string|false>{
  
  // 1. save to our db
  const {amount, name, message, crypto, email} = Object.fromEntries(formData);
  await mongoose.connect(process.env.MONGODB_URI as string);
  const donationDoc = await DonationModel.create({
    amount, name, message, crypto, email,
  });
  const profileInfoDoc = await ProfileInfoModel.findOne({email});
  if (!profileInfoDoc) {
    return false;
  }

  return '';
}