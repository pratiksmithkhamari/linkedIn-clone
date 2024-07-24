import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import UserAvatar from "@/utils/shareable";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsString } from "@/lib/utils";
import { createPost } from "@/lib/serverAction";

export function DialogeBox({
  setShow,
  show,
  src,
}: {
  setShow: any;
  show: boolean;
  src: any;
}) {
  const [ImgDataUrl, setImgDataUrl] = useState<string>("");
  const [inputtext, setInputText] = useState<string>("");
  const refImg = useRef<HTMLInputElement>(null);
  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      const readFile = await readFileAsString(file);
      setImgDataUrl(readFile);
    }
  };
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const postInputHandler = async (formData:FormData)=>{
    const data = await formData.get('inputText') as string
      //  console.log(data);

       try {
        await createPost(inputtext,ImgDataUrl)
       } catch (error) {
        new Error('error in post of data')
       }
  }

  return (
    <Dialog open={show}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setShow(false)}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-4 hover:bg-zinc-200 w-fit p-3 rounded-2xl cursor-pointer">
              <UserAvatar srcData={src?.imageUrl} />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">{`${src?.firstName} ${src?.lastName}`}</h2>
                <p className="text-[0.8rem] text-zinc-600 ">Post to anyone</p>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={postInputHandler}>
          <div className="flex flex-col mt-5">
            <Textarea
              name="inputText"
              onChange={handleInputChange}
              placeholder="What do you want to talk about?"
              className="border-none my-3 h-32 text-lg focus-visible:ring-1"
            />
            {ImgDataUrl && (
              <Image
                src={ImgDataUrl}
                alt="your selected image"
                className="w-full"
                height={300}
                width={300}
              />
            )}
          </div>
          <div>
            <input
              onChange={handleImgUpload}
              type="file"
              ref={refImg}
              name="uploadImg"
              accept="image/*"
              className="hidden"
            />
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full  items-center mt-4">
              <Images
                onClick={() => refImg.current?.click()}
                className="cursor-pointer text-zinc-500 text-3xl"
              />
              <Button type="submit" className="bg-blue-600 rounded-2xl">
                Post
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogeBox;
