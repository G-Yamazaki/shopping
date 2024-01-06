"use client";

import { useState } from "react";
import { ItemTable } from "./_components/ItemTable";
import { NewItem } from "./_components/NewItem";

export default function Home() {
  const [update, setUpdate] = useState(false);

  return (
    <main className="mx-auto w-1/2 my-8 text-center">
      <h1 className="text-4xl font-bold my-4">買いたいものリスト</h1>
      <div className="mb-4">
        <NewItem setUpdate={setUpdate} />
      </div>
      <div>
        <ItemTable update={update} setUpdate={setUpdate} />
      </div>
    </main>
  )
}
