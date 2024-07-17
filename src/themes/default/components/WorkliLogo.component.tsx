import { useNavigate } from "react-router-dom";

export default function WorkliLogo({
  variant,
  width,
  height = 41,
}: {
  variant?: "mobile" | "desktop";
  width?: number;
  height?: number;
}) {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => navigate("/")}
      style={{
        ...(height && { height: height }),
        ...(width && { width: width }),
        cursor: "pointer",
      }}
      src="/assets/logos/workli-logo.svg"
      alt="Workli Logo"
    />
  );
}
