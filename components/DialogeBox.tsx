import UserAvatar from "@/utils/shareable";
import { Textarea } from "./ui/textarea";
import { Images } from "lucide-react";
import { useRef, useState } from "react";
import { readFileAsString } from "@/lib/utils";
import { createPost } from "@/lib/serverAction";
import { toast, useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

export function DialogeBox({
  setShow,
  show,
  src,
}: {
  setShow: (value: boolean) => void;
  show: boolean;
  src: any;
}) {
  const [ImgDataUrl, setImgDataUrl] = useState<string>("");
  const [inputtext, setInputText] = useState<string>("");
  const { toast } = useToast();

  const refImg = useRef<HTMLInputElement>(null);

  const handleImgUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const readFile = await readFileAsString(file);
      setImgDataUrl(readFile as string);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const postInputHandler = async (formData: FormData) => {
    const data = formData.get("inputText") as string;

    try {
      await createPost(inputtext, ImgDataUrl);
      toast({ description: "Post uploaded successfully" });
      setInputText("");
      setImgDataUrl("");
      setShow(false);
    } catch (error) {
      console.error("Error in posting data", error);
      toast({ description: "Failed to upload post" });
    }
  };

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
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            postInputHandler(new FormData(e.target as HTMLFormElement));
          }}
        >
          <Textarea
            placeholder="What's on your mind?"
            value={inputtext}
            onChange={handleInputChange}
            name="inputText"
            className="resize-none w-full mt-4"
          />

          <div className="my-4">
            {ImgDataUrl && (
              <img
                src={ImgDataUrl}
                alt="Your selected image"
                className="w-full max-h-[400px] bg-center"
                height={300}
                width={300}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <Images
              onClick={() => refImg.current?.click()}
              className="cursor-pointer text-zinc-500 text-3xl"
            />
            <input
              type="file"
              ref={refImg}
              className="hidden"
              onChange={handleImgUpload}
            />
            <Button
              type="submit"
              className="bg-blue-600 rounded-2xl active:bg-blue-700"
            >
              Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DialogeBox;
