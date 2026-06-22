const palettes = [
  ["#0891b2", "#0f172a"],
  ["#7c3aed", "#111827"],
  ["#16a34a", "#052e16"],
  ["#dc2626", "#450a0a"],
  ["#ea580c", "#431407"],
  ["#2563eb", "#172554"],
];

export const getInitials = (value = "User") => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return parts.slice(0, 2).map((part) => part[0]).join("").toUpperCase();
};

export const getGeneratedAvatar = (value = "User") => {
  const hash = [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
  const [primary, secondary] = palettes[hash % palettes.length];
  const initials = getInitials(value);
  const svg = `
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="64" fill="${secondary}"/>
  <circle cx="96" cy="28" r="46" fill="${primary}" opacity="0.9"/>
  <circle cx="24" cy="108" r="50" fill="${primary}" opacity="0.5"/>
  <text x="64" y="74" text-anchor="middle" fill="white" font-size="42" font-family="Inter, Arial, sans-serif" font-weight="800" letter-spacing="1">${initials}</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
