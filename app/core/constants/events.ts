export type EventPillar = {
  id: "kids" | "social" | "corporate";
  label: string;
  vibe: string;
  designNote: string;
  events: string[];
};

export const eventPillars: EventPillar[] = [
  {
    id: "kids",
    label: "The Little Stars",
    vibe: "Soft gold elegance for children",
    designNote: "Playful luxury with soft serif typography.",
    events: [
      "Naming Ceremonies",
      "Themed Birthdays",
      "Children's Day Galas",
      "First Tooth Celebrations",
      "School Graduation Parties",
      "Kids' Fashion Shows",
    ],
  },
  {
    id: "social",
    label: "The Grand Milestone",
    vibe: "Ceremonial warmth and timeless sophistication",
    designNote: "Immersive galleries and social proof storytelling.",
    events: [
      "Marriages",
      "Receptions",
      "Baby Showers",
      "Engagement Soirees",
      "Milestone Anniversaries",
      "Themed Masquerades",
      "Housewarming Parties",
    ],
  },
  {
    id: "corporate",
    label: "The Elite Network",
    vibe: "Executive precision and premium polish",
    designNote: "Structured layouts with quote-focused conversion.",
    events: [
      "Product Launches",
      "Annual General Meetings",
      "Board Retreats",
      "Award Nights",
      "Team Building Off-sites",
      "Networking Brunches",
      "Tech Summits",
    ],
  },
];

export const platformCapabilities = [
  "Interactive Event Builder",
  "Visual Gallery + Lightbox",
  "Client Dashboard",
  "Admin Panel + PDF Quotes",
  "Concierge Live Chat",
] as const;
