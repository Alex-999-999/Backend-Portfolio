import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "En Zuo" },
      {
        name: "description",
        content:
          "En Zuo — Backend engineer portfolio showcasing REST APIs in Python, Node.js, Go, and C# (.NET), with PostgreSQL, Redis, auth, and integrations for web and mobile products.",
      },
      { property: "og:title", content: "En Zuo" },
      {
        property: "og:description",
        content: "Backend engineer portfolio by En Zuo.",
      },
    ],
  }),
  component: Index,
});
