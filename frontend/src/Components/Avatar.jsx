import { useState } from "react";
import { getGeneratedAvatar } from "../utils/avatar";

const sizeClasses = {
  sm: "h-9 w-9 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

const statusSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const Avatar = ({ src, name, isOnline = false, size = "md", className = "" }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const statusSize = statusSizeClasses[size] || statusSizeClasses.md;
  const imageSrc = src && !imageFailed ? src : getGeneratedAvatar(name);

  return (
    <div className={`relative shrink-0 ${avatarSize} ${className}`}>
      <div
        className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border font-semibold"
        style={{
          borderColor: "var(--app-border)",
          background: "color-mix(in srgb, var(--app-accent) 16%, var(--app-panel))",
          color: "var(--app-accent)",
        }}
      >
        <img
          src={imageSrc}
          alt={name ? `${name} avatar` : "User avatar"}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImageFailed(true)}
        />
      </div>
      {isOnline && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 bg-emerald-400 ${statusSize}`}
          style={{ borderColor: "var(--app-panel)" }}
          aria-label="Online"
        />
      )}
    </div>
  );
};

export default Avatar;
