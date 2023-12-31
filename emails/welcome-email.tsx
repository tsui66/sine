import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { SINE_LOGO, SINE_THUMBNAIL } from "../lib/constants";
import Footer from "./components/footer";

export default function WelcomeEmail({
  name = "Brendon Urie",
  email = "panic@thedis.co",
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Sine</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <Img
                src={SINE_LOGO}
                width="40"
                height="40"
                alt="Dub"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to Link
            </Heading>
            <Section className="my-8">
              <Img src={SINE_THUMBNAIL} alt="Dub" className="max-w-[500px]" />
            </Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is Tsui, and I'm the founder of Sine - easiest way to start creating NFT Art using Artificial Intelligence. Start creating in minutes! I'm excited to have
              you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here are a few things you can do:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆
              <Link
                href="https://sine.at/tools/sketch"
                className="font-medium text-blue-600 no-underline"
              >
                AI Sketch Refine
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆
              <Link
                href="https://sine.at/tools/nft-generator"
                className="font-medium text-blue-600 no-underline"
              >
                AI NFT Generator
              </Link>{" "}
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Follow us on{" "}
              <Link
                href="https://twitter.com/tsui_nova"
                className="font-medium text-blue-600 no-underline"
              >
                Twitter
              </Link>
            </Text>
            <Text className="text-sm leading-6 text-black">
              Let me know if you have any questions or feedback. I'm always
              happy to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Tsui from ~Sine~
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
