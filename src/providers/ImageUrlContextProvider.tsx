import React, { useState } from "react";

export const ImageUrlContext = React.createContext({
  imageUrl: "",
  setImageUrl: (url: string) => {},
});

export const ImageUrlContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <ImageUrlContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </ImageUrlContext.Provider>
  );
};
