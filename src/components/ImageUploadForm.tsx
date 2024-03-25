import axios from "axios";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { ImageUrlContext } from "../providers/ImageUrlContextProvider";
import { constants } from "../constants";

const ImageUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const { setImageUrl: setContextImageUrl } = useContext(ImageUrlContext);
  const maxSize = 2 * 1024 * 1024; // 2MB

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > maxSize) {
        alert(
          "ファイルサイズが大きすぎます。2MB以下のファイルをアップロードしてください。"
        );
        return;
      }
      setSelectedFile(file);

      // 画像ファイルをBase64形式に変換して画像を表示
      const reader = new FileReader();
      reader.onload = () => {
        setLocalImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    if (event.target.value) {
      event.target.value = "";
    }
  };

  const createCanvas = (image: HTMLImageElement, crop: Crop) => {
    const canvas = document.createElement("canvas");
    canvas.width = (crop.width / 100) * image.width;
    canvas.height = (crop.height / 100) * image.height;
    return canvas;
  };

  const drawImageOnCanvas = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    crop: Crop
  ) => {
    ctx.drawImage(
      image,
      (crop.x / 100) * image.width,
      (crop.y / 100) * image.height,
      (crop.width / 100) * image.width,
      (crop.height / 100) * image.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  const uploadImage = async (
    blob: Blob,
    fileName: string,
    setContextImageUrl: (url: string) => void
  ) => {
    const formData = new FormData();
    formData.append("image", blob, fileName);
    try {
      const response = await axios.post(
        constants.backendSchema +
          "://" +
          constants.backendHostname +
          "/api/v1/profileImage",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setContextImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Error uploading profile image:", error);
      // エラーハンドリングの処理を追加する
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile || !localImageUrl) {
      return;
    }

    const image = new Image();
    image.src = localImageUrl;
    image.onload = () => {
      const canvas = createCanvas(image, crop);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        drawImageOnCanvas(canvas, ctx, image, crop);
        canvas.toBlob(async (blob) => {
          if (blob) {
            await uploadImage(blob, selectedFile.name, setContextImageUrl);
          }
        }, selectedFile.type);
      }
    };
    // 画像の表示をリセット
    setSelectedFile(null);
    setLocalImageUrl(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="dark:bg-gray-800">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="inline-block px-2 py-1 mb-2 mr-2 bg-blue-500 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:text-white"
        >
          ファイルを選択
        </label>
        {selectedFile && (
          <span className="text-white">{selectedFile.name}</span>
        )}
        <br />
        {localImageUrl && (
          <ReactCrop
            crop={crop}
            circularCrop={true}
            aspect={1}
            onChange={(_, newCrop) => setCrop(newCrop)}
          >
            <img src={localImageUrl} alt={"アップロードされた画像"} />
          </ReactCrop>
        )}
        <button
          type="submit"
          className="px-2 py-1 bg-blue-500 text-white rounded font-semibold tracking-wider hover:bg-blue-600 transition duration-200"
        >
          アップロードする
        </button>
      </form>
    </>
  );
};

export default ImageUploadForm;
