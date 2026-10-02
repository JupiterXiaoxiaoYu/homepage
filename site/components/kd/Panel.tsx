import PxIcon from "./PxIcon";

// Parchment scroll panel with stepped pixel corners.
export default function Panel({
  id,
  quest,
  title,
  icon,
  children,
  className = "",
}: {
  id?: string;
  quest: string;
  title: string;
  icon: string[];
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`pframe rv ${className}`}>
      <div className="panel">
        <header className="panel-head">
          <PxIcon map={icon} scale={4} className="panel-icon" />
          <div>
            <p className="panel-quest">{quest}</p>
            <h2 className="panel-title">{title}</h2>
          </div>
          <span className="panel-spark" aria-hidden>
            ✦
          </span>
        </header>
        {children}
      </div>
    </section>
  );
}
