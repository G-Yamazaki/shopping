import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";

export const DeleteItem = ({ id, setUpdate }: { id: number, setUpdate: Dispatch<SetStateAction<boolean>> }) => {
  const handleClick = async () => {
    await fetch("/api", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    }).catch((err) => console.log(err));
    setUpdate((prev) => !prev);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本当に削除しますか？</DialogTitle>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mx-auto">
          <DialogClose asChild>
            <Button variant="secondary">キャンセル</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleClick}>削除</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
