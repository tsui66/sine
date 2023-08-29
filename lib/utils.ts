import { ClassValue, clsx } from "clsx"
import Jimp from "jimp"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from "nanoid";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Reference: https://github.com/manishsaraan/email-validator/blob/master/index.js
export const isValidEmail = (email: string) => {
  return /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/.test(
    email,
  );
};

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export type TPixelateImage = {
  remoteUrl: string
  pixelSize?: number
}

export async function pixelateImage({
  remoteUrl,
  pixelSize = 8,
}: TPixelateImage) {
  const image = await Jimp.read(remoteUrl).then((image) =>
    image.pixelate(pixelSize, 0, 0, 512, 512)
  )

  return image.getBase64Async(image.getMIME())
}

const scenarioToken = process.env.SCENARIO_API_TOKEN as string
const scenarioSecret = process.env.SCENARIO_SECRET as string

export const scenarioAuthToken = `${btoa(`${scenarioToken}:${scenarioSecret}`)}`

export function cleanSearchParams(urlSearchParams: URLSearchParams) {
  let cleanedParams = urlSearchParams
  let keysForDel = []

  urlSearchParams.forEach((value, key) => {
    if (value == "null" || value === "undefined" || !value) {
      // @ts-ignore
      keysForDel.push(key)
    }
  })

  keysForDel.forEach((key) => {
    cleanedParams.delete(key)
  })

  return cleanedParams
}

export function searchString(
  page: string | null | undefined,
  search: string | null | undefined,
  sort?: string | null | undefined
): string {
  // @ts-ignore
  const searchParameters = new URLSearchParams({
    page,
    search: encodeURIComponent(search ?? ""),
    sort,
  })

  return cleanSearchParams(searchParameters)?.toString()
}

export const convertBase64 = (file) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })


export const dataUriToBuffer = (uri) => {
  if (!/^data:/i.test(uri)) {
    throw new TypeError(
      '`uri` does not appear to be a Data URI (must begin with "data:")'
    );
  }

  // strip newlines
  uri = uri.replace(/\r?\n/g, "");

  // split the URI up into the "metadata" and the "data" portions
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }

  // remove the "data:" scheme and parse the metadata
  const meta = uri.substring(5, firstComma).split(";");

  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  // defaults to US-ASCII only if type is not provided
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }

  // get the encoded data portion and decode URI-encoded chars
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);

  // set `.type` and `.typeFull` properties to MIME type
  // @ts-ignore
  buffer.type = type;
  // @ts-ignore
  buffer.typeFull = typeFull;

  // set the `.charset` property
  // @ts-ignore
  buffer.charset = charset;

  return buffer;
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
