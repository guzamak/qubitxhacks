"use client";

import { qwertyKeyMap, sharpNote } from "@/app/{synth}/qwertyMap";
import { cn } from "@/lib/utils";

export default function Midikeyboard({ midi }) {
  const qwertyKeyFeq = Object.values(qwertyKeyMap);

  return (
    <div className="flex space-x-1">
      {qwertyKeyFeq.map((feq) => {
        return (
          <div key={feq} className={cn("md:w-4 md:h-4 border-2 border-gray-300 rounded-full transition-transform duration-150",
          midi.includes(feq) && "scale-50",
          sharpNote.includes(feq) && "-translate-y-3")}></div>
        );
      })}
    </div>
  );
}
