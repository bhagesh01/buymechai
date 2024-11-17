'use server';

import {Donation, DonationModel} from "@/models/Donation";
import {ProfileInfo, ProfileInfoModel} from "@/models/ProfileInfo";
import { Coffee } from "lucide-react";

import mongoose from "mongoose";
import Image from "next/image";
import NotFound from "../not-found";
import DonationForm from "@/components/shared/DonationForm";

type Props = {
  params: {
    username: string;
  };
}

export default async function SingleProfilePage({params}:Props) {
  const username = params.username;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const profileInfoDoc:ProfileInfo|null = await ProfileInfoModel.findOne({username});

  if (!profileInfoDoc) {
    return (
      <NotFound/>
    );
  }

  const donations:Donation[] = await DonationModel.find({paid:true, email: profileInfoDoc.email});

  return (
    <div>
      {/* <DonationStatus /> */}
      <div className="w-full h-48">
        <Image
          src={profileInfoDoc.coverUrl}
          width={2048}
          height={2048}
          alt="cover image"
          className="object-cover object-center h-48"
        />
      </div>
      <div className="md:max-w-[80%]  px-2 mx-auto relative -mt-16">
        <div className="flex items-end gap-3">
          <div className="size-32 overflow-hidden rounded-xl border-2 border-white">
            <Image
              src={profileInfoDoc.avatarUrl}
              width={256}
              height={256}
              alt="cover image"
              className="size-36 object-cover object-center"
            />
          </div>
          <div className="mb-1">
            <h1 className="text-4xl font-semibold">
              {profileInfoDoc.displayName}
            </h1>
            <h2 className="flex gap-1 items-center">
              <Coffee/>
              <span>/</span>
              <span>{profileInfoDoc.username}</span>
            </h2>
          </div>
        </div>

        <div className="md:flex w-full mt-4 px-10">
          <div className="bg-white md:w-[35rem] h-fit my-5 rounded-xl p-4 shadow-xl">
            <h3 className="font-semibold">About {profileInfoDoc.username}</h3>
            {profileInfoDoc.bio}
            <hr className="my-4"/>
            <h3 className="font-semibold mt-6">Recent supporters:</h3>
            {!donations.length && (
              <>
                <p>no recent donations</p>
              </>
            )}
            {donations.length && (
              <div className="mt-2">
                {donations.map(donation => (
                  <div className="py-2">
                    <h3>
                      <span className="font-semibold">{donation.name}</span>
                      {' '}
                      <span className="text-gray-400">
                        bought you {donation.amount > 1 ? donation.amount + ' coffees' : 'a coffee'}
                      </span>
                    </h3>
                    <p className="bg-gray-100 p-2 rounded-md">
                      {donation.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl p-1 pt-3 shadow-sm mb-10 mt-5 md:w-[35rem] md:ml-10">
            <DonationForm/>
            {/* <DonationForm email={profileInfoDoc.email} /> */}
          </div>
        </div>

      </div>
    </div>
  );
}