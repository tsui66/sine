import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const predictionId = params.id;
  const prediction = await replicate.predictions.get(predictionId as string);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction);
}

// export const config = {
//   runtime: "edge",
// };