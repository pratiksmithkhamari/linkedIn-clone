import React, { useState } from "react";

interface DialogeBoxProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  src: any; 
}

const readFileAsString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string); 
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); 
  });
};

const DialogeBox: React.FC<DialogeBoxProps> = ({ setShow, show, src }) => {
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
      {show && (
        <div className="dialog-box">
          <button onClick={() => setShow(false)}>Close</button>
          <div>
            <input type="file" onChange={handleFileChange} />
            {imgDataUrl && <img src={imgDataUrl} alt="Selected" />}
          </div>
          <div>
            <p>User Info:</p>
            <img src={src?.imageUrl} alt="User Avatar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DialogeBox;
