import type { Route } from "./+types/home";
import { HomePage } from "../features/home/pages/home-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Aura Events | Premium Event Management" },
    {
      name: "description",
      content:
        "A luxurious event management experience for social, family, and corporate events.",
    },
  ];
}

export default function Home() {
  return <HomePage />;
}
