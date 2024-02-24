"use server";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Problem from "@/components/synth/Problem";
import prisma from "@/lib/prisma";


const GetProblem = async(problemId) => {
  try {
    const problemData = await prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });
    const {data, ...problem} = problemData;
    return problem;
  } catch (error) {
    return null; 
  }
}

export default async function ProblemPage({ params }) {
  const session = await getServerSession(options);
  const { problemId } = params;
  const  problem = await GetProblem(problemId);

  if (!session) {
    redirect("/");
  }

  if (!problem){
    redirect("/dashboard");
  }

  return (
    <div>
      <Problem problem={problem} />
    </div>
  )
}
