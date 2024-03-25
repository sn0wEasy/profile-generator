import React from "react";
import ProfileForm from "../components/ProfileForm";
import { ImageUrlContextProvider } from "../providers/ImageUrlContextProvider";

const CreateProfile: React.FC = () => {
  return (
    <div className="container mx-auto py-12">
      <ImageUrlContextProvider>
        <ProfileForm />
      </ImageUrlContextProvider>
    </div>
  );
};

export default CreateProfile;
