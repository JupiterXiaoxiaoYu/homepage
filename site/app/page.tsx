import ScrollFx from "@/components/ed/ScrollFx";
import Margin from "@/components/ed/Margin";
import Masthead from "@/components/ed/Masthead";
import ProfileSec from "@/components/ed/ProfileSec";
import Works from "@/components/ed/Works";
import Experience from "@/components/ed/Experience";
import ResearchSec from "@/components/ed/ResearchSec";
import ProofSec from "@/components/ed/ProofSec";
import Channel from "@/components/ed/Channel";

export default function Page() {
  return (
    <main className="sheet">
      <ScrollFx />
      <Margin />
      <div className="sheet-inner">
        <Masthead />
        <ProfileSec />
        <Works />
        <Experience />
        <ResearchSec />
        <ProofSec />
        <Channel />
      </div>
    </main>
  );
}
