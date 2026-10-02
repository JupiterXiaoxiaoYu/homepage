import Fx from "@/components/kd/Fx";
import Sky from "@/components/kd/Sky";
import Rider from "@/components/kd/Rider";
import HUD from "@/components/kd/HUD";
import Banner from "@/components/kd/Banner";
import Quests from "@/components/kd/Quests";
import Chronicle from "@/components/kd/Chronicle";
import Grimoire from "@/components/kd/Grimoire";
import Trophies from "@/components/kd/Trophies";
import Inventory from "@/components/kd/Inventory";
import Raven from "@/components/kd/Raven";

export default function Page() {
  return (
    <>
      <Sky />
      <HUD />
      <Rider />
      <Fx />
      <main>
        <Banner />
        <div className="wrap">
          <Quests />
          <Chronicle />
          <Grimoire />
          <Trophies />
          <Inventory />
          <Raven />
        </div>
      </main>
    </>
  );
}
