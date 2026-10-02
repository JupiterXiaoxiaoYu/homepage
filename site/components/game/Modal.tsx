"use client";

import type { Item } from "@/lib/dungeon";
import PxIcon from "@/components/kd/PxIcon";

export default function Modal({ item, onClose }: { item: Item; onClose: () => void }) {
  return (
    <div className="modal-veil" onClick={onClose}>
      <div className="modal pframe" onClick={(e) => e.stopPropagation()}>
        <div className="panel modal-panel">
          <header className="modal-head">
            <PxIcon map={item.icon} scale={4} />
            <div>
              <p className="modal-kind">{item.kind}</p>
              <h2>{item.title}</h2>
              <p className="modal-sub">{item.sub}</p>
            </div>
            <button className="modal-x" onClick={onClose} aria-label="close">✕</button>
          </header>

          {item.desc && <p className="modal-desc">{item.desc}</p>}

          {item.extra && (
            <ul className="modal-extra">
              {item.extra.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}

          {item.tags && (
            <p className="modal-tags">
              {item.tags.map((t) => <b key={t}>{t}</b>)}
            </p>
          )}

          {item.links && (
            <div className="modal-links">
              {item.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  ▶ {l.label}
                </a>
              ))}
            </div>
          )}

          <p className="modal-hint">ESC / E — close</p>
        </div>
      </div>
    </div>
  );
}
