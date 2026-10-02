// Rotating circular stamp — "27× hackathon winner · on the record"
export default function Stamp() {
  return (
    <div className="stamp" aria-hidden="true">
      <svg viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <path
            id="stamp-circle"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
          />
        </defs>
        <circle cx="60" cy="60" r="58" className="stamp-ring" />
        <circle cx="60" cy="60" r="30" className="stamp-ring" />
        <text className="stamp-text">
          <textPath href="#stamp-circle">
            27× HACKATHON WINNER ✳ ON THE RECORD ✳ EST. 2021 ✳
          </textPath>
        </text>
        <text x="60" y="66" textAnchor="middle" className="stamp-core">
          ✳
        </text>
      </svg>
    </div>
  );
}
