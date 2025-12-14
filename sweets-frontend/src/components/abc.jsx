import { useState } from "react";

export default function SweetImage({
  src,
  alt,
  emoji = "🍬",
  className = "",
}) {
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center
      bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200
      overflow-hidden ${className}`}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          onError={() => setError(true)}
        />
      )}

      {error && (
        <span className="text-6xl select-none">{emoji}</span>
      )}
    </div>
  );
}