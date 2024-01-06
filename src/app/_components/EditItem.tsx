import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { itemSchema } from "../types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";

export const EditItem = ({ item, setUpdate }: { item: z.infer<typeof itemSchema>, setUpdate: Dispatch<SetStateAction<boolean>> }) => {
  const form = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      genre: item.genre,
      price: item.price,
    },
  })

  const { handleSubmit, setValue, reset } = form;

  const onSubmit = async (newItem: z.infer<typeof itemSchema>) => {
    await fetch("/api/", {
      method: "PUT",
      body: JSON.stringify(newItem),
    }).catch((err) => console.log(err));
    reset();
    setUpdate((prev) => !prev);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          編集
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>編集</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ジャンル</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>値段</FormLabel>
                  <FormControl>
                    <Input {...field} type="number"
                      onChange={(e) => {
                        setValue('price', parseInt(e.target.value, 10));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">完了</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
