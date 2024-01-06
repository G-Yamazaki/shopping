import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as z from "zod";
import { EditItem } from "./EditItem";
import { DeleteItem } from "./DeleteItem";
import { itemSchema } from "../types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const fetchItems = async () => {
  try {
    const res = await fetch("/api");
    const resJson = await res.json();
    const items = z.array(itemSchema).parse(resJson);
    return items;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch items");
  }
}

export const ItemTable = ({ update, setUpdate }: { update: boolean, setUpdate: Dispatch<SetStateAction<boolean>> }) => {
  const [items, setItems] = useState<z.infer<typeof itemSchema>[] | undefined>(undefined);

  useEffect(() => {
    fetchItems().then((items) => setItems(items));
  }, [update]);

  if (!items) {
    return <div>loading...</div>;
  }

  return (
    <Table className="text-left">
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>ジャンル</TableHead>
          <TableHead className="text-right">値段</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.genre}</TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
            <TableCell className="text-right"><EditItem item={item} setUpdate={setUpdate} /></TableCell>
            <TableCell className="text-right"><DeleteItem id={item.id} setUpdate={setUpdate} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table >
  );
};
