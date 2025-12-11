"use client";
import svgPaths from "@/imports/svg-2yli6jhru0";
interface LogoProps {
  className?: string;
  color?: string;
}

export function Logo({ className = "w-12 h-12", color = "#d99a73" }: LogoProps) {
  return (
    <div className={className}>
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 587 748">
        <g clipPath="url(#clip0_terraco_logo)">
          <path d={svgPaths.p1a734280} fill={color} />
        </g>
        <defs>
          <clipPath id="clip0_terraco_logo">
            <rect fill="white" height="748.003" width="586.308" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
