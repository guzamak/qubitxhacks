"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export default function ProblemList() {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try{
        const res = await fetch("/api/problem");
        const data = await res.json();
        setData(data);
      }catch(error){
        setData([]);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-5">
      <Select defaultValue="basic">
        <SelectTrigger className="w-32 md:w-[180px] mx-8 sm:mx-20 my-7 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="basic">
              <p className="text-sm">Basic</p>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {data.map((problem) => (
        <div key={problem.id} className="space-y-2">
          <Link href={`/problems/${problem.id}`}>
            <div className=" mx-5 sm:mx-20 min-w-60 w-90% rounded-md p-5 flex justify-between hover:bg-slate-50">
              <div className="flex space-x-3 sm:space-x-5 items-center">
                <h1 className="text-2xl sm:text-4xl font-semibold">
                  {problem.level}
                </h1>
                <div>
                  <p className="text-sm font-medium break-words">{problem.title}</p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs hidden sm:block">Your Score</p>
                <h1 className="text-xl sm:text-4xl text-green-300">
                  {problem.score ? problem.score : "-"}
                </h1>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
