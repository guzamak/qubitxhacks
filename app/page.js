"use server";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import LoginForm from "@/components/user/login-form";
import Link from "next/link";

export default async function Home({searchParams}) {
  const session = await getServerSession(options);

  return (
    <main className="h-screen w-screen ">
      <div className="min-h-20 h-1/5 max-h-28 w-full flex justify-center items-center border-2">
        <h1 className="text-xl font-bold">Synth-Co</h1>
      </div>
      <div className="flex justify-center items-center min-h-96 h-[80%] md:h-full w-full md:flex-row flex-col">
        <div className="w-1/2 h-full flex items-center justify-center md:p-40">
          <div className="space-y-5 m-5">
            <h1 className="text-4xl md:text-6xl font-bold">
              New Way To Learn Synth{""}
            </h1>
            <h1 className="text-lg md:text-2xl">step by step</h1>
            <div>
              {!session?.user ? 
                <LoginForm error={searchParams?.error}/>
               : 
                <Link href="/dashboard">
                  <Button variant="outline">
                    Start now
                    <ArrowRight className="h-4 w-4 mx-2" />
                  </Button>
                </Link>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
