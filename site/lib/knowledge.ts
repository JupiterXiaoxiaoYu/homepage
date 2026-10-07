import {
  PROFILE,
  RESEARCH,
  WORK,
  PROJECTS,
  AWARDS,
  EDUCATION,
  CERTS,
  SKILLS,
} from "./data";

/** Plain-text corpus for the Ask Jupiter assistant. */
export function buildCorpus(): string {
  const L: string[] = [];
  L.push(`# Profile`);
  L.push(`Name: ${PROFILE.name} (@${PROFILE.handle})`);
  L.push(`Tagline: ${PROFILE.tagline} / ${PROFILE.zh.tagline}`);
  L.push(`Positioning: ${PROFILE.positioning.en} / ${PROFILE.positioning.zh}`);
  L.push(`Bio: ${PROFILE.bio}`);
  L.push(`Location: ${PROFILE.location}. Open to AI engineering roles.`);
  L.push(
    `Contact: ${PROFILE.email} · GitHub ${PROFILE.github} · LinkedIn ${PROFILE.linkedin} · Resume ${PROFILE.resume}`,
  );
  L.push(`Stats: ${PROFILE.stats.map((s) => `${s.v} ${s.k}`).join("; ")}`);
  L.push("");
  L.push(`# Experience`);
  for (const w of WORK) {
    L.push(
      `- ${w.role} @ ${w.org} (${w.period})${w.backing ? ` — backed by ${w.backing}` : ""}`,
    );
    for (const p of w.points) L.push(`  · ${p}`);
  }
  L.push("");
  L.push(`# Research`);
  for (const r of RESEARCH) {
    L.push(`- ${r.title} — ${r.venue} (${r.period})`);
    L.push(`  ${r.summary}`);
    L.push(`  Metrics: ${r.metrics.map((m) => `${m.v} ${m.k}`).join("; ")}`);
    L.push(`  Tags: ${r.tags.join(", ")}`);
  }
  L.push("");
  L.push(`# Projects`);
  for (const p of PROJECTS) {
    L.push(
      `- [[${p.id}]] ${p.name} — ${p.role}, ${p.year}. Category: ${p.category.join(", ")}.`,
    );
    L.push(`  ${p.summary}`);
    if (p.impact) L.push(`  Impact: ${p.impact}`);
    if (p.detail) L.push(`  ${p.detail}`);
    L.push(`  Stack: ${p.stack.join(", ")}`);
    if (p.links.length)
      L.push(`  Links: ${p.links.map((l) => `${l.label} ${l.href}`).join(" · ")}`);
  }
  L.push("");
  L.push(`# Awards (${AWARDS.length} listed, 27+ total)`);
  for (const a of AWARDS) L.push(`- ${a.year} ${a.event}: ${a.result}`);
  L.push("");
  L.push(`# Education`);
  for (const e of EDUCATION) L.push(`- ${e.school} — ${e.degree} (${e.period})`);
  L.push(`Certifications: ${CERTS}`);
  L.push("");
  L.push(`# Skills`);
  for (const s of SKILLS) L.push(`- ${s.label}: ${s.items.join(", ")}`);
  return L.join("\n");
}
