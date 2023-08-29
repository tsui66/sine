import { Blurs } from "../ui/Blurs";

const VideoSection = () => {
  return (
    <div className="relative z-0 mx-auto hidden max-w-screen-xl px-6 py-10 sm:block sm:px-8">
      <Blurs />
      <div className="overflow-hidden rounded-lg border border-neutral-900">
        <video controls autoPlay muted loop width="100%">
          <source
            src="https://6mzw22jwifjswwua.public.blob.vercel-storage.com/LJtx4lN-jnqSxy8s2smG7EDjz0sk3RVfQDNbf3.mp4"
            type="video/webm"
          />
        </video>
      </div>
    </div>
  );
};

export default VideoSection;