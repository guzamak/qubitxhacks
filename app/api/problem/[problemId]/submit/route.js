import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import serverAuth from "@/lib/serverAuth";
import { calculateSimilarity } from "@/lib/similarOscCheck";

export async function POST(req, context) {
  const { problemId } = context.params;
  try {
    const submitOsc = await req.json();
    const { currentUser } = await serverAuth();
    const problems = await prisma.problem.findUnique({
      where: {
        id: problemId,
      },
    });
    const score = calculateSimilarity(submitOsc, problems.data);

    const existingScore = await prisma.score.findFirst({
      where: {
        userId: currentUser.id,
        problemId,
      },
    });

    if (existingScore) {
      await prisma.score.update({
        where: {
          id: existingScore.id,
        },
        data: {
          score: parseInt(score),
        },
      });
    } else {
      await prisma.score.create({
        data: {
          score: parseInt(score),
          userId: currentUser.id,
          problemId: problemId,
        },
      });
    }
    return NextResponse.json(score);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}
