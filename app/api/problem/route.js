import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import serverAuth from "@/lib/serverAuth";

export async function GET(req,res) {
  try {
    const { currentUser } = await serverAuth();
    const allProblem = await prisma.problem.findMany({
      where:{
        type:"basic"
      }
    })
    const allScore = await prisma.score.findMany({
      where:{
        userId: currentUser.id
      }
    })
    const result = allProblem.map(problem => {
      const score = allScore.find(score => score.problemId === problem.id);
      return {
        id: problem.id,
        level: problem.level,
        type: problem.type,
        title: problem.title,
        score: score ? score.score : null
      };
    });

    result.sort((a, b) => a.level - b.level);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}