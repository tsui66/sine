import { db } from "@/lib/db";
// import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next";
// import { PLATFORM } from "@prisma/client"
import { NextResponse } from "next/server";
import Replicate from "replicate";
import packageData from "../../../package.json";
import { v4 as uuidv4 } from "uuid"
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";


// https://replicate.com/rossjillian/controlnet
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
  userAgent: `${packageData.name}/${packageData.version}`,
});

async function getObjectFromRequestBodyStream(body) {
  const input = await body.getReader().read();
  const decoder = new TextDecoder();
  const string = decoder.decode(input.value);
  return JSON.parse(string);
}

const WEBHOOK_HOST = process.env.VERCEL_URL

export async function POST(req, res) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
    );
  }

  const user = await getCurrentUser()
  console.log(user, '...sese...')

  const input = await getObjectFromRequestBodyStream(req.body);

  console.log(input, 'inputinputinput', `${WEBHOOK_HOST}/api/replicate-webhook`)
  const webhookToken = crypto.randomUUID();
  const prediction = await replicate.predictions.create(
    {
      version: "795433b19458d0f4fa172a7ccf93178d2adb1cb8ab2ad6c8fdc33fdbcd49f477",
      input,
      webhook: `${WEBHOOK_HOST}/api/webhook/replicate-webhook?userId=${user?.id}&token=${webhookToken}`,
      webhook_events_filter: ["start", "completed",],
    }
  );

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  } else {
    await db.generation.create({
      data: {
        platform: 'REPLICATE',
        prompt: input.prompt,
        modelId: 'scribble',
        inferenceId: prediction.id,
        numSamples: 1,
        image: input.image,
        structure: input.structure,
        webhookToken: webhookToken,
        // numInferenceSteps: generation.inference.parameters.numInferenceSteps,
        // guidance: generation.inference.parameters.guidance,
        // pixelSize: parameters.pixelSize,
        // type: generation.inference.parameters.type,
        // strength: generation?.inference?.parameters?.strength ?? undefined,
        user: {
          connect: {
            id: user?.id,
          },
        },
        // colorPaletteEnabled: parameters.colorPaletteEnabled,
        // colors: parameters.colorPaletteEnabled ? parameters.colors : [],
      },
    })
  }

  console.log(prediction, 'predictionpredictionprediction')


  return NextResponse.json(prediction, { status: 201 });
}

// export const config = {
//   // runtime: "edge",
//   api: {
//     bodyParser: {
//       sizeLimit: "10mb",
//     },
//   },
// };