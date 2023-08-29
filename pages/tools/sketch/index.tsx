import { Canvas } from "@/components/sketch/canvas";
import PromptForm from "@/components/sketch/prompt-form";
import Link from "next/link";
import { useState } from "react";
import Predictions from "@/components/sketch/predictions";
import naughtyWords from "naughty-words";
import Script from "next/script";
import seeds from "@/lib/seed"
import { cn, dataUriToBuffer, sleep } from "@/lib/utils";
import { VERCEL_BLOB_PATH_PREFIX } from "@/lib/constants";
import { BlobAccessError, put } from "@vercel/blob";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import { IGenerationSet } from "@/components/create/generation-set";

import { useSession } from "next-auth/react"
import { format } from 'date-fns'
import { ContactWindow } from "@/components/user/ChatWindow";
import { toast } from "@/components/ui/use-toast";



const HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Home() {
  const [error, setError] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [predictions, setPredictions] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [scribbleExists, setScribbleExists] = useState(false);
  const [seed] = useState(seeds[Math.floor(Math.random() * seeds.length)]);
  const [initialPrompt] = useState(seed.prompt);
  const [scribble, setScribble] = useState(null);
  const [prompt, setPrompt] = useState(seed.prompt);


  const [runningGenerations, setRunningGenerations] = React.useState<
    IGenerationSet[]
  >([])

  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [promptGenerating, setPromptGenerating] =
    React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(true)
  const [showAdvancedOptions, setShowAdvancedOptions] =
    React.useState<boolean>(false)
  const [numImages, setNumImages] = React.useState<string>("1")
  const [guidance, setGuidance] = React.useState<number[]>([7])

  const { data } = useSession()

  const user = data?.user

  const handleSubmit = async () => {
    try {
      setIsSaving(true)
      // e.preventDefault();

      // track submissions so we can show a spinner while waiting for the next prediction to be created
      setSubmissionCount(submissionCount + 1);

      const userPrompt = prompt
        .split(/\s+/)
        .map((word) => (naughtyWords.en.includes(word) ? "something" : word))
        .join(" ");

      setError(null);
      setIsProcessing(true);

      const { url: fileUrl } = await put(
        `${VERCEL_BLOB_PATH_PREFIX}${format(new Date(), "yyyy-MM-dd")}/${user?.id || 'anonymous'}/sketch.png`,
        dataUriToBuffer(scribble!),
        {
          access: 'public',
          handleBlobUploadUrl: '/api/upload',
        });

      const body = {
        prompt: userPrompt,
        image: fileUrl,
        structure: "scribble",
      };

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let prediction = await response.json();

      setPredictions((predictions) => ({
        ...predictions,
        [prediction.id]: prediction,
      }));

      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(500);
        const response = await fetch("/api/predictions/" + prediction.id);
        prediction = await response.json();
        setPredictions((predictions) => ({
          ...predictions,
          [prediction.id]: prediction,
        }));
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
      }

      setIsProcessing(false);
      setIsSaving(false)
    } catch (e) {
      toast({
        title: "Something went wrong",
        description:
          "Please try to generate your image again. If the issue persists contact support.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  };

  const userOutOfCredits = parseInt(numImages) > (user?.credits || 0)
  return (
    <>
      <DashboardShell>
        <DashboardHeader
          heading="Sketch Refine"
          text="Easily sketch your ideas and creativity with a mouse, and leave the rest to AI. It's as simple as counting 1, 2, 3."
        >
          {/* <SearchGenerationsInput /> */}
        </DashboardHeader>
        <div className="mb-24">
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <Card>
            <CardHeader>
              <CardTitle className="flex w-full justify-between items-center">
                Create Images
              </CardTitle>

              {/* <CardDescription>
                Easily sketch your ideas and creativity with a mouse, and leave the rest to AI. It's as simple as counting 1, 2, 3.
              </CardDescription> */}
            </CardHeader>
            <CardContent>
              <div className="grid gap-8">
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-2 w-full">
                    {/* <div className="w-full lg:col-span-2"> */}
                    <Canvas
                      startingPaths={seed.paths}
                      onScribble={setScribble}
                      scribbleExists={scribbleExists}
                      setScribbleExists={setScribbleExists}
                    />
                    <Predictions
                      predictions={predictions}
                      // isProcessing={isProcessing}
                      submissionCount={submissionCount}
                    />
                    {/* </div> */}
                  </div>
                  <div className="grid gap-1 mt-8 lg:mt-8 relative">
                    <div className="mt-10">
                      <h3 className="font-bold">Prompt</h3>
                      <PromptForm
                        initialPrompt={initialPrompt}
                        setPrompt={setPrompt}
                        prompt={prompt}
                      // onSubmit={handleSubmit}
                      // isProcessing={isProcessing}
                      // scribbleExists={scribbleExists}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start w-full">
              <Alert
                variant={
                  userOutOfCredits
                    ? "destructive"
                    : "default"
                }
                className="mt-0"
              >
                <Icons.info className="h-4 w-4" />
                <AlertTitle>
                  {userOutOfCredits
                    ? "You have insufficient credits for this generation"
                    : "Credit usage breakdown"}
                </AlertTitle>
                <AlertDescription>
                  This generation will use{" "}
                  <strong>
                    {parseInt(numImages)}{" "}
                    {parseInt(numImages) !== 1
                      ? "credits"
                      : "credit"}{" "}
                  </strong>
                  once it succeeds. 1 credit = 1
                  image.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col lg:flex-row items-center gap-4 w-full mt-6">
                {userOutOfCredits ? (
                  <Link
                    className="w-full lg:w-auto"
                    href="/credits"
                  >
                    <button
                      className={cn(
                        buttonVariants(),
                        // className,
                        "w-full lg:w-auto"
                      )}
                    >
                      <Icons.billing className="mr-2 h-4 w-4 " />
                      <span>
                        Buy more credits
                      </span>
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled={
                      isSaving
                    }
                    type="submit"
                    className={cn(
                      buttonVariants(),
                      // className,
                      "w-full lg:w-auto"
                    )}
                    onClick={handleSubmit}
                  >
                    {isSaving && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>Generate</span>
                  </button>
                )}

                {userOutOfCredits ? (
                  <Link
                    className="w-full lg:w-auto"
                    href="/dashboard/refer-users"
                  >
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full lg:w-auto"
                      )}
                    >
                      <span>
                        Refer users for credits
                      </span>
                    </Button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>

        <Script src="https://js.bytescale.com/upload-js-full/v1" />
      </DashboardShell>
    </>
  );
}
