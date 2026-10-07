import World from "@/components/game/World";
import Darkness from "@/components/game/Darkness";
import Pad from "@/components/game/Pad";

export default function Page() {
  return (
    <>
      <div className="bedrock" aria-hidden />
      <World />
      <Darkness />
      <Pad />
    </>
  );
}
