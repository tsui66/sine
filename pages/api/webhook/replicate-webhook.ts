// The Replicate webhook is a POST request where the request body is a prediction object.
// Identical webhooks can be sent multiple times, so this handler must be idempotent.
import type { NextApiRequest, NextApiResponse } from 'next'
import { db, db as prisma } from "@/lib/db";
import { GENERATIONSTATUS } from '@prisma/client';


async function upsertPrediction(predictionData, userId, token) {
  console.log("🤔 upsert prediction? ", predictionData.id);

  // if (predictionData?.status !== "succeeded" || ) {
  //   console.log("🙈 skiping incomplete or unsuccesful prediction");
  //   return;
  // }


  // Identical webhooks can be sent more than once, so you'll need handle potentially duplicate information.
  const generation = await db.generation.findFirst({
    where: {
      inferenceId: predictionData.id,
      webhookToken: token as string
    }
  })
  if (generation?.status !== GENERATIONSTATUS.PROCESSING) {
    return;
  }
  // [0]   "output": [
  //   [0]     "https://pbxt.replicate.delivery/imBHZUON4Da0D56ZbI3gG5UbnrOauN8rpAlFzxNK6PQK3dXE/out-0.png"
  //   [0]   ],
  //   [0]   "error": null,
  //   [0]   "status": "succeeded",
  //   [0]   "created_at": "2023-08-26T09:25:59.551077Z",
  //   [0]   "started_at": "2023-08-26T09:25:59.588742Z",
  //   [0]   "completed_at": "2023-08-26T09:26:02.752954Z",
  //   [0]   "webhook": "https://324a-115-193-158-133.ngrok-free.app/api/predictions/replicate-webhook",
  //   [0]   "webhook_events_filter": [
  //   [0]     "start",
  //   [0]     "completed"
  //   [0]   ],
  //   [0]   "metrics": {
  //   [0]     "predict_time": 3.164212
  //   [0]   },
  //   [0]   "urls": {
  //   [0]     "cancel": "https://api.replicate.com/v1/predictions/rmwcdwtbqvyhsuegfzjx32niqu/cancel",
  //   [0]     "get": "https://api.replicate.com/v1/predictions/rmwcdwtbqvyhsuegfzjx32niqu"
  //   [0]   }
  //   [0] } ....predictionDatapredictionDatapredictionData
  try {
    if (predictionData?.status === "succeeded") {
      const generationOutput = predictionData.output as string[];
      await db.$transaction([
        db.user.update({
          where: {
            id: userId,
          },
          data: {
            credits: {
              decrement: generation.numSamples,
            },
          },
        }),
        db.generation.update({
          where: {
            id: generation.id,
          },
          data: {
            status: "COMPLETE",
            outputImages: {
              createMany: {
                data: generationOutput.map((image) => {
                  return {
                    image: generation.image,
                    pixelatedImage: image,
                  }
                }),
              },
            },
          },
        }),
      ])

      console.log("✅ upserted prediction ", generation.id);
    } else if (predictionData?.status === "failed") {
      await db.generation.update({
        where: {
          id: generation.id,
        },
        data: {
          status: "FAILED",
        },
      })
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("received webhook for prediction: ", req.body.id);
  if (!req.query.userId || !req.query.token) {
    return res.end();
  }


  await upsertPrediction(req.body, req.query.userId, req.query.token);

  res.end();
}
