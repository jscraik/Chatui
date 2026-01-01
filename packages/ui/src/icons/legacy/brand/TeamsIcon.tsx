export interface TeamsIconProps {
  className?: string;
}

export function TeamsIcon({ className }: TeamsIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 8.5C21 7.119 19.881 6 18.5 6H14.5C13.119 6 12 7.119 12 8.5V15.5C12 16.881 13.119 18 14.5 18H18.5C19.881 18 21 16.881 21 15.5V8.5Z"
        fill="#5B5FC7"
      />
      <path
        d="M10.5 10.5C10.5 9.119 9.381 8 8 8H4C2.619 8 1.5 9.119 1.5 10.5V13.5C1.5 14.881 2.619 16 4 16H8C9.381 16 10.5 14.881 10.5 13.5V10.5Z"
        fill="#5B5FC7"
      />
      <circle cx="16.5" cy="12" r="1.5" fill="white" />
      <circle cx="6" cy="12" r="1" fill="white" />
      <path d="M9 12H12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

TeamsIcon.displayName = "TeamsIcon";
