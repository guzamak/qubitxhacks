"use server";

import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import UserInfo from "@/components/user/user-info";
import ProblemList from "@/components/dashboard/problemList";


export default async function DashboardPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/");
  }


  return (
    <div className="h-screen w-screen">
      <div className="flex min-h-48 h-1/3 max-h-96 w-screen justify-between items-center px-8 md:px-20 border-2">
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold">Dashboard</h1>
          <p className="text-lg sm:text-2xl">Learn by step by step</p>
        </div>
        <UserInfo session={session} />
      </div>
      <ProblemList/>
    </div>
  );
}
