"use client";

// On-screen controls for touch devices + portrait orientation lock.
const padApi = () => (window as any).__pad;

function Btn({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <button
      onTouchStart={() => padApi()?.press(k)}
      onTouchEnd={() => padApi()?.release(k)}
      onMouseDown={() => padApi()?.press(k)}
      onMouseUp={() => padApi()?.release(k)}
      onMouseLeave={() => padApi()?.release(k)}
    >
      {children}
    </button>
  );
}

export default function Pad() {
  return (
    <>
      <div className="pad pad-l">
        <Btn k="arrowleft">◀</Btn>
        <Btn k="arrowright">▶</Btn>
      </div>
      <div className="pad pad-r">
        <Btn k="u">▲</Btn>
        <Btn k="dn">▼</Btn>
        <Btn k="e">E</Btn>
      </div>
    </>
  );
}
