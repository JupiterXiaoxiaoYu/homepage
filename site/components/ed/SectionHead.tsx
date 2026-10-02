import Ornament from "./Ornament";

export default function SectionHead({
  n,
  id,
  title,
  aside,
}: {
  n: string;
  id: string;
  title: string;
  aside?: string;
}) {
  return (
    <div className="ed-head">
      <div className="ed-head-row" data-reveal>
        <span className="ed-num">{n}</span>
        <span className="ed-label mono">{id}</span>
        <Ornament />
        <span className="ed-rule" />
        {aside && <span className="ed-aside mono">{aside}</span>}
      </div>
      <h2 className="ed-title" data-reveal>
        {title}
      </h2>
    </div>
  );
}
