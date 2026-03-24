import { Capabilities } from "../components/capabilities";
import { ConciergeCta } from "../components/concierge-cta";
import { Hero } from "../components/hero";
import { Pillars } from "../components/pillars";

export function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Capabilities />
      <ConciergeCta />
    </main>
  );
}
