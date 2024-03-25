// src/components/ProfileView.tsx

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { constants } from "../constants";

interface Profile {
  id: string;
  name: string;
  imageUrl: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  career: string;
  mbti: string;
  hobbies: string;
  remarks: string;
}

const ProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const inputRef = useRef<string>(
    `${constants.frontendSchema}://${constants.frontendHostname}/profile/${id}`
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${constants.backendSchema}://${constants.backendHostname}/api/v1/profile/${id}`
        );
        setProfile(response.data.Item as Profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div className="text-gray-900 dark:text-white">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <img
          src={profile.imageUrl}
          alt={profile.name}
          className="w-60 h-60 rounded-full mx-auto"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold dark:text-white">{profile.name}</h2>
      </div>
      {profile.birthYear && profile.birthMonth && profile.birthDay && (
        <div className="mb-2">
          <strong className="text-gray-900 dark:text-white">生年月日:</strong>{" "}
          <span className="text-gray-700 dark:text-gray-300">
            {profile.birthYear}/{profile.birthMonth}/{profile.birthDay}
          </span>
        </div>
      )}
      {profile.career && (
        <div className="mb-2">
          <strong className="text-gray-900 dark:text-white">職務経歴:</strong>
          <p className="text-gray-700 dark:text-gray-300">{profile.career}</p>
        </div>
      )}
      {profile.mbti && (
        <div className="mb-2">
          <strong className="text-gray-900 dark:text-white">MBTI:</strong>{" "}
          <span className="text-gray-700 dark:text-gray-300">
            {profile.mbti}
          </span>
        </div>
      )}
      {profile.hobbies && (
        <div className="mb-2">
          <strong className="text-gray-900 dark:text-white">趣味・特技:</strong>
          <p className="text-gray-700 dark:text-gray-300">{profile.hobbies}</p>
        </div>
      )}
      {profile.remarks && (
        <div className="mb-2">
          <strong className="font-semibold dark:text-white">備考欄:</strong>
          <p className="text-gray-700 dark:text-gray-300">{profile.remarks}</p>
        </div>
      )}
      <br />
      <div className="flex justify-center mb-2">
        <CopyButton text={inputRef.current} />
      </div>
    </div>
  );
};

export default ProfileView;

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <button
      className="flex button-hover font-semibold dark:text-white"
      onClick={handleCopyClick}
    >
      <ClipboardDocumentIcon className="h-6 w-6 mr-2" />
      URLをコピーする
    </button>
  );
};
