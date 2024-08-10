import React, { useState } from "react";

const readFileAsString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string); // Ensure the result is a string
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // Read the file as a data URL
  });
};

const MyComponent = () => {
  const [imgDataUrl, setImgDataUrl] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const readFile = await readFileAsString(file);
      setImgDataUrl(readFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imgDataUrl && <img src={imgDataUrl} alt="Selected" />}
    </div>
  );
};

export default MyComponent;
