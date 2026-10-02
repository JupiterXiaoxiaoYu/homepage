// Rotating asterisk ornament — the page's little flourish.
export default function Ornament({ size = 14 }: { size?: number }) {
  return (
    <svg
      className="ornament"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" />
      </g>
    </svg>
  );
}
