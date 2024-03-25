// src/components/ProfileForm.tsx

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mbtiTypes } from "../types/mbti";
import ImageUploadForm from "./ImageUploadForm";
import { ImageUrlContext } from "../providers/ImageUrlContextProvider";
import { constants } from "../constants";

const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const ProfileForm: React.FC = () => {
  const { imageUrl: contextImageUrl } = useContext(ImageUrlContext);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [career, setCareer] = useState("");
  const [mbti, setMbti] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [remarks, setRemarks] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const profileData = {
      name,
      imageUrl: contextImageUrl,
      birthYear,
      birthMonth,
      birthDay,
      career,
      mbti,
      hobbies,
      remarks,
    };

    try {
      const response = await axios.post(
        `${constants.backendSchema}://${constants.backendHostname}/api/v1/profile`,
        {
          body: profileData,
        }
      );
      const profileId = response.data.id;
      navigate(`/profile/${profileId}`);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        プロフィールを作成する
      </h2>
      <div className="mb-4">
        <label
          htmlFor="contextImageUrl"
          className="block mb-2 font-semibold dark:text-white"
        >
          プロフィール画像（必須）
        </label>
        <div className="mt-4 mb-2">
          {contextImageUrl && (
            <img
              src={contextImageUrl}
              className="w-100 h-100"
              alt={"プロフィール画像"}
            />
          )}
        </div>
        <ImageUploadForm />
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-semibold dark:text-white"
          >
            名前（必須）
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={30}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          />
          {name.length >= 30 && (
            <p className="text-red-500 mt-2">
              名前は30文字以内で入力してください。
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold dark:text-white">
            生年月日
          </label>
          <div className="flex space-x-4">
            <select
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            >
              <option value="">年</option>
              {generateOptions(1900, 2023).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            >
              <option value="">月</option>
              {generateOptions(1, 12).map((month) => (
                <option key={month} value={month.toString().padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
            >
              <option value="">日</option>
              {generateOptions(1, 31).map((day) => (
                <option key={day} value={day.toString().padStart(2, "0")}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="career"
            className="block mb-2 font-semibold dark:text-white"
          >
            職務経歴
          </label>
          <textarea
            id="career"
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            maxLength={300}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          ></textarea>
        </div>
        {career.length >= 300 && (
          <p className="text-red-500 mt-2">
            職務経歴は200文字以内で入力してください。
          </p>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-semibold dark:text-white">
            MBTI
          </label>
          <div className="grid grid-cols-4 gap-2">
            {mbtiTypes.map((type) => (
              <button
                key={type}
                type="button"
                className={`px-3 py-2 rounded ${
                  mbti === type
                    ? "bg-blue-500 text-white dark:bg-blue-600"
                    : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
                }`}
                onClick={() => setMbti(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="hobbies"
            className="block mb-2 font-semibold dark:text-white"
          >
            趣味・特技
          </label>
          <textarea
            id="hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          ></textarea>
        </div>
        {hobbies.length >= 1000 && (
          <p className="text-red-500 mt-2">
            趣味・特技は1000文字以内で入力してください。
          </p>
        )}
        <div className="mb-4">
          <label
            htmlFor="remarks"
            className="block mb-2 font-semibold dark:text-white"
          >
            備考欄
          </label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            maxLength={1000}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          ></textarea>
          {remarks.length >= 1000 && (
            <p className="text-red-500 mt-2">
              備考欄は1000文字以内で入力してください。
            </p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded font-semibold tracking-wider hover:bg-blue-600 transition duration-200"
        >
          自己紹介URLを生成する
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
