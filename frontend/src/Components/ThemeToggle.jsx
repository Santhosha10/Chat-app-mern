import { FiMoon, FiSun } from "react-icons/fi";
import { useThemeContext } from "../context/ThemeContext";

const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useThemeContext();
  const Icon = isDark ? FiSun : FiMoon;

  return (
    <button
      type="button"
      className={`icon-button ${className}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default ThemeToggle;
