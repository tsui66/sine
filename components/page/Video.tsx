import { Blurs } from "../ui/Blurs";

const VideoSection = () => {
  return (
    <div className="relative z-0 mx-auto hidden max-w-screen-xl px-6 py-10 sm:block sm:px-8">
      <Blurs />
      <div className="overflow-hidden rounded-lg border border-neutral-900">
        <video controls autoPlay muted loop width="100%">
          <source
            src="https://pub-b7c9da47e9a54cfea35a51985febc6d9.r2.dev/sine-demo.mp4"
            type="video/webm"
          />
        </video>
      </div>
    </div>
  );
};

export default VideoSection;