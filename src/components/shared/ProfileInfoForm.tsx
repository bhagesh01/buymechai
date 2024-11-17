"use client";
import React, { useState } from "react";
import UploadButton from "./UploadButton";
import { ProfileInfo } from "@/models/ProfileInfo";
import { saveProfile } from "@/actions/ProfileInfoActions";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  profileInfo: ProfileInfo | null;
};

const ProfileInfoForm = ({ profileInfo }: Props) => {
  const [coverUrl, setCoverUrl] = useState(profileInfo?.coverUrl);
  const [avatarUrl, setAvatarUrl] = useState(profileInfo?.avatarUrl);

  const handelFormAction = async (formData: FormData) => {
    await saveProfile(formData);
    toast("Profile Saved");
  };



  return (
    <form action={handelFormAction}>
      <div className="relative bg-gray-400 mt-4 rounded-lg">
        <div>
          <Image
          src={coverUrl || ''}
          alt="coverUrl"
          height={1024}
          width={1024}
          />
        </div>
        <div className="absolute md:top-32 top-20 left-5 mt-4 flex items-end justify-start size-24 rounded-lg">
          <Image
          src={avatarUrl || ""}
          alt="@avatar"
          height={180}
          width={180}
          className="rounded-lg h-full w-full"
          />
          <div className=" absolute -right-3 -bottom-2 flex items-center justify-end ">
          <UploadButton onUploadComplete={setAvatarUrl}/>
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
          </div>
        </div>
      </div>









      <div className="flex items-center justify-between">
        <div></div>
        <div className=" mt-4 flex items-center justify-between gap-1 bg-yellow-300 px-2 py-1 rounded-xl w-fit">
        <UploadButton onUploadComplete={setCoverUrl} />
        <input type="hidden" name="coverUrl" value={coverUrl} />
        change cover 
        </div>
      </div>
      <div>
        <label className="block mt-4" htmlFor="usernameIn">
          Username :
        </label>
        <input
          id="usernameIn"
          type="text"
          defaultValue={profileInfo?.username}
          placeholder="username"
          name="username"
        />
      </div>
      <div>
        <label className="block mt-4" htmlFor="displayNameIn">
          display name :
        </label>
        <input
          id="displayNameIn"
          type="text"
          defaultValue={profileInfo?.displayName}
          placeholder="display name"
          name="displayName"
        />
      </div>
      <div>
        <label className="block mt-4" htmlFor="bioIn">
          Bio :
        </label>
        <textarea
          name="bio"
          id="bioIn"
          defaultValue={profileInfo?.bio}
          placeholder="bio"
        ></textarea>
      </div>
      <div>
        <button className="bg-yellow-400 rounded-full px-4 py-2 mt-4">
          SaveProfile
        </button>
      </div>
    </form>
  );
};

export default ProfileInfoForm;
