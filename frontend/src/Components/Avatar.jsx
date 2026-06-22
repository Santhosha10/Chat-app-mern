import { useState } from "react";

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

const getInitials = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
};

const Avatar = ({ src, name, isOnline = false, size = "md", className = "" }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const statusSize = statusSizeClasses[size] || statusSizeClasses.md;
  const shouldShowImage = src && !imageFailed;

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
        {shouldShowImage ? (
          <img
            src={src}
            alt={name ? `${name} avatar` : "User avatar"}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span aria-hidden="true">{getInitials(name)}</span>
        )}
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
