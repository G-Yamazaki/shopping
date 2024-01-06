import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { itemFormSchema } from "../types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";

export const NewItem = ({ setUpdate }: { setUpdate: Dispatch<SetStateAction<boolean>> }) => {
  const form = useForm<z.infer<typeof itemFormSchema>>({
    resolver: zodResolver(itemFormSchema),
    defaultValues: {
      name: "",
      genre: "",
      price: 0,
    },
  })

  const { handleSubmit, setValue, reset } = form;

  const onSubmit = async (item: z.infer<typeof itemFormSchema>) => {
    await fetch("/api", {
      method: "POST",
      body: JSON.stringify(item),
    }).catch((err) => console.log(err));
    reset();
    setUpdate((prev) => !prev);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>
          新規登録
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>買いたいもの</DialogTitle>
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
              <Button type="submit">登録</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
