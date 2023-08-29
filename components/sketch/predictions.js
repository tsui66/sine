'use client'
import copy from "copy-to-clipboard";
import { downloadImage } from "@/lib/client-helpers"
import { Fragment, useEffect, useRef, useState } from "react";
import Loader from "@/components/sketch/loader";
import { Button } from "@/components/ui/button"
import { Copy, Download, Check } from "lucide-react";

export default function Predictions({ predictions, submissionCount }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (submissionCount > 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [predictions, submissionCount]);

  if (submissionCount === 0) return (<></>);

  return (
    <section className="w-full my-10">
      {/* <h2 className="text-center text-3xl font-bold m-6">Results</h2> */}

      {submissionCount > Object.keys(predictions).length && (
        <div className="pb-10 mx-auto w-full text-center">
          <div className="pt-10" ref={scrollRef} />
          <Loader />
        </div>
      )}

      {Object.values(predictions)
        .slice()
        .reverse()
        .map((prediction, index) => (
          <Fragment key={prediction.id}>
            {index === 0 &&
              submissionCount == Object.keys(predictions).length && (
                <div ref={scrollRef} />
              )}
            <Prediction prediction={prediction} />
          </Fragment>
        ))}
    </section>
  );
}

export function Prediction({ prediction, showLinkToNewScribble = false }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = () => {
    // const url =
    //   window.location.origin +
    //   "/scribbles/" +
    //   (prediction.uuid || prediction.id); // if the prediction is from the Replicate API it'll have `id`. If it's from the SQL database, it'll have `uuid`
    copy(prediction.output[prediction.output.length - 1]);
    setLinkCopied(true);
  };

  // Clear the "Copied!" message after 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinkCopied(false);
    }, 4 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (!prediction) return null;

  return (
    <div className="mt-6 mb-12">
      <div className="my-5 p-5 bg-white flex">
        {/* <div className="w-1/2 aspect-square relative border">
          <img
            src={prediction.input.image}
            alt="input scribble"
            className="w-full aspect-square"
          />
        </div> */}
        <div className="w-2/2 aspect-square relative grid justify-center content-end">
          {prediction.output?.length ? (
            <img
              src={prediction.output[prediction.output.length - 1]}
              alt="output image"
              className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5"
            />
          ) : (
            <div>
              <Loader />
            </div>
          )}
        </div>
      </div>
      {prediction.output?.length && <div className="flex items-center space-x-2 text-center px-4 opacity-60">
        <Button variant="secondary" onClick={copyLink}>
          <span className="sr-only">Copy link</span>
          {
            !linkCopied ? <Copy className="h-4 w-4" /> : <Check className="h-4 w-4" />
          }
        </Button>
        <Button variant="secondary" onClick={() => downloadImage(prediction.output[prediction.output.length - 1], prediction.id)}>
          <span className="sr-only">Download</span>
          <Download className="h-4 w-4" />
        </Button>
      </div>
      }
      {/* <div className="text-center px-4 opacity-60 text-xl">
        <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
          <div className="flex space-x-2">
            <Button variant="secondary" className="shrink-0" onClick={copyLink}>
              {linkCopied ? "Copied!" : "Copy link"}
            </Button>
            <Button variant="secondary" className="shrink-0">
              Download
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center py-2">
        <button className="lil-button" onClick={copyLink}>
          <CopyIcon className="icon" />
          {linkCopied ? "Copied!" : "Copy link"}
        </button>
      </div> */}
    </div >
  );
}
