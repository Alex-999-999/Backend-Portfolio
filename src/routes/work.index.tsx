import { createFileRoute } from "@tanstack/react-router";

import Work from "@/pages/Work";
import type { WorkCategory } from "@/lib/workServices";

function parseWorkTab(search: Record<string, unknown>): WorkCategory {
  return search.tab === "mobile" ? "mobile" : "web";
}

export const Route = createFileRoute("/work/")({
  validateSearch: (search: Record<string, unknown>) => ({
    tab: parseWorkTab(search),
  }),
  head: () => ({
    meta: [
      { title: "Work — En Zuo" },
      {
        name: "description",
        content:
          "Backend API projects by EN ZUO — Python, Node.js, Go, and C# (.NET) services with PostgreSQL, Redis, auth, and integrations for ecommerce and B2B platforms.",
      },
      { property: "og:title", content: "Work — En Zuo" },
      {
        property: "og:description",
        content:
          "Selected backend API projects by EN ZUO.",
      },
    ],
  }),
  component: Work,
});
