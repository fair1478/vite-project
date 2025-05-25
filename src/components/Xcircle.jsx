import { useState } from "react";
import { XCircleIcon as XCircleOutline } from "@heroicons/react/24/outline";
import { XCircleIcon as XCircleSolid } from "@heroicons/react/24/solid";

export default function Xcircle({
  className = "w-6 h-6 text-gray-500",
  ...props
}) {
  const [hovered, setHovered] = useState(false);

  const Icon = hovered ? XCircleSolid : XCircleOutline;

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{ display: "inline-block", cursor: "pointer" }}
      {...props}
    >
      <Icon className="w-full h-full" />
    </span>
  );
}
