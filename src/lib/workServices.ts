import dydinPreview from "@/assets/Works/web/dydin/preview.png";
import qbcosmeticPreview from "@/assets/Works/web/qbcosmetic/preview.png";
import bonethomePreview from "@/assets/Works/web/bonethome/preview.png";
import perfexkitchenPreview from "@/assets/Works/web/perfexkitchen/preview.png";
import catalogakPreview from "@/assets/Works/mobile/catalogak/preview.png";
import urestaurantsPreview from "@/assets/Works/mobile/urestaurants/preview.png";
import readyecommercePreview from "@/assets/Works/mobile/readyecommerce/preview.png";
import casematePreview from "@/assets/Works/mobile/casemate/preview.png";

export type WorkCategory = "web" | "mobile";

const WORK_PREVIEW_BY_KEY: Record<string, string> = {
  "web/dydin": dydinPreview,
  "web/qbcosmetic": qbcosmeticPreview,
  "web/bonethome": bonethomePreview,
  "web/perfexkitchen": perfexkitchenPreview,
  "mobile/catalogak": catalogakPreview,
  "mobile/urestaurants": urestaurantsPreview,
  "mobile/readyecommerce": readyecommercePreview,
  "mobile/casemate": casematePreview,
};

export const WORK_SECTIONS: ReadonlyArray<{
  category: WorkCategory;
  label: string;
}> = [
  { category: "web", label: "Web Backends" },
  { category: "mobile", label: "Mobile APIs" },
];

export const WORK_PREVIEW_ASPECT = "1448 / 1086";

/** @deprecated Use WORK_PREVIEW_ASPECT */
export const FULLSTACK_PREVIEW_ASPECT = WORK_PREVIEW_ASPECT;

export interface WorkService {
  category: WorkCategory;
  number: string;
  slug: string;
  title: string;
  description: string;
  pageDescription?: string;
  coreStack: readonly string[];
  infraStack: readonly string[];
  techHighlights: readonly string[];
  problemsSolved: readonly string[];
  image: string;
  imageAspect?: string;
  ctaUrl?: string;
}

function resolveWorkPreview(category: WorkCategory, assetFolder: string): string {
  const key = `${category}/${assetFolder}`;
  const fromFolder = WORK_PREVIEW_BY_KEY[key];
  if (fromFolder) return fromFolder;
  throw new Error(
    `Missing preview for "${key}". Add src/assets/Works/${category}/${assetFolder}/preview.png`,
  );
}

export function workProjectSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type WorkServiceInput = Omit<WorkService, "slug" | "image"> & {
  slug?: string;
  assetFolder: string;
};

function service(entry: WorkServiceInput): WorkService {
  const { assetFolder, category, ...rest } = entry;
  return {
    ...rest,
    category,
    image: resolveWorkPreview(category, assetFolder),
    slug: entry.slug ?? workProjectSlug(entry.title),
  };
}

export const WORK_SERVICES: WorkService[] = [
  service({
    category: "web",
    number: "01",
    assetFolder: "dydin",
    title: "Ningbo DYD B2B Parts Catalog API",
    description:
      "REST backend for a B2B HVAC and appliance parts platform — multi-category catalog, MOQ pricing rules, buyer accounts, and order flows backed by PostgreSQL and Redis.",
    coreStack: ["Python", "REST API", "JWT Auth", "Service layer"],
    infraStack: ["PostgreSQL", "Redis", "Session caching", "Role-based access"],
    techHighlights: [
      "Catalog API with categories, MOQ tiers, and dynamic pricing",
      "Account, cart, and checkout endpoints for B2B buyers",
      "Content endpoints for blog, FAQ, and trust pages",
      "Redis-backed caching for high-traffic catalog reads",
    ],
    problemsSolved: [
      "Slow catalog browsing across thousands of SKUs — indexed PostgreSQL queries and Redis caching for category and product reads.",
      "MOQ and tiered pricing varying by part type — centralized pricing rules applied at cart and checkout.",
      "Wholesale pricing exposed to unauthenticated traffic — JWT-protected buyer routes with role-scoped price endpoints.",
      "Mixed content and commerce updates causing regressions — separate product, order, and editorial API boundaries.",
    ],
    pageDescription: `The Ningbo DYD backend (dydin.com) powers a B2B import/export catalog spanning washing machine, dryer, refrigerator, oven, dishwasher, and microwave parts. The API layer handles product discovery, buyer authentication, and transactional flows while keeping catalog data consistent across channels.

I structured the service around clear resource boundaries — products, categories, accounts, carts, and orders — with JWT-protected routes for buyer actions and cache-friendly read paths for large SKU lists.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://dydin.com/",
  }),
  service({
    category: "web",
    number: "02",
    assetFolder: "qbcosmetic",
    title: "Qianbang Group Corporate & Commerce API",
    description:
      "Node.js backend for a cosmetics brand consulting group — CMS-style content, product catalog, session auth, and media-backed ecommerce endpoints.",
    coreStack: ["Node.js", "REST API", "Session auth", "Media uploads"],
    infraStack: ["PostgreSQL", "Object storage", "Structured content", "Cart & orders"],
    techHighlights: [
      "Corporate and product content APIs with factory credentials",
      "Category and SKU endpoints for skincare and beauty lines",
      "Registration, login, and account-ready cart flows",
      "News and brand page content modeled for CMS-style updates",
    ],
    problemsSolved: [
      "Brand pages and product catalog sharing one brittle data model — split content and commerce schemas with stable API contracts.",
      "Large product images slowing API responses — media uploads to object storage with lightweight URL references in payloads.",
      "Marketing updates requiring developer involvement — CMS-style news and brand endpoints editors can change independently.",
      "Session handling across registration and cart — session auth with consistent account state through checkout.",
    ],
    pageDescription: `The Qianbang Group API (qbcosmetic.com) supports both authority content and shoppable catalog data for a Guangzhou cosmetics consulting company. Endpoints expose supply-chain proof points, certifications, and ODM/OEM services alongside practical product discovery.

The data model separates corporate storytelling from commerce resources so content editors can update news and brand pages without touching product inventory logic.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://qbcosmetic.com/",
  }),
  service({
    category: "web",
    number: "03",
    assetFolder: "bonethome",
    title: "Bonet Houseware Multilingual Commerce API",
    description:
      "ASP.NET Core REST backend for a global kitchenware manufacturer — localized catalog, series collections, cart, and order APIs for international B2B buyers.",
    coreStack: ["C#", ".NET", "ASP.NET Core", "REST API"],
    infraStack: ["PostgreSQL", "Entity Framework", "Localized fields", "Cart & orders"],
    techHighlights: [
      "Multi-language product and content endpoints",
      "Series collections and promotional product grids",
      "Factory and brand metadata for Bonet / MuMei lines",
      "Contact and assistant-ready inquiry endpoints",
    ],
    problemsSolved: [
      "Duplicate product records per language breaking inventory — single product core with localized fields and fallback locale chain.",
      "Buyers lost in large SKU lists — series collections and filtered pagination across scissors, knives, and specialty lines.",
      "Inquiry traffic scattered across contact forms — structured inquiry endpoints routed to the right sales workflow.",
      "Cart and order logic diverging by locale — shared order service with locale-aware catalog reads only at the edge.",
    ],
    pageDescription: `The Bonet Houseware backend (bonethome.com) is built with ASP.NET Core and serves precision kitchenware and cutting tools across English, Chinese, Arabic, European languages, and more. APIs return localized catalog data while sharing a single inventory and order core.

Product discovery endpoints scale across scissors, knife sets, peelers, and specialty gadgets — with consistent pagination and filtering as SKU counts grow.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://bonethome.com/",
  }),
  service({
    category: "web",
    number: "04",
    assetFolder: "perfexkitchen",
    title: "Perfex Commercial Equipment Inquiry API",
    description:
      "C# ASP.NET Core backend for commercial kitchen equipment — deep category trees, SKU-rich product data, inquiry lists, and role-based access for international B2B buyers.",
    coreStack: ["C#", ".NET", "ASP.NET Core", "RBAC"],
    infraStack: ["PostgreSQL", "Entity Framework", "Quote requests", "Admin roles"],
    techHighlights: [
      "Bar, coffee, cooking, and food-processor category depth",
      "Specification-heavy product endpoints for commercial equipment",
      "Factory capability and custom tooling content APIs",
      "Quote and inquiry list flows for B2B sales teams",
    ],
    problemsSolved: [
      "Deep equipment categories hard to browse — hierarchical category tree API with specification-rich product detail endpoints.",
      "Quote requests lost in unstructured email — inquiry lists with status tracking sales teams can action from one dashboard.",
      "Admin catalog edits conflicting with buyer-facing data — RBAC separating admin, sales, and public read permissions.",
      "International buyers comparing specs before quoting — filterable product endpoints tuned for high-SKU commercial catalogs.",
    ],
    pageDescription: `The Perfex Kitchen backend (perfexkitchen.com) runs on ASP.NET Core and supports a Guangzhou manufacturer selling to international catering buyers. The API emphasizes specification comparison before quote requests — organized category trees, factory content, events, and product showcases.

Inquiry endpoints capture buyer intent with structured lists sales teams can action, while role-based access keeps admin and catalog operations separated.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl: "https://perfexkitchen.com/",
  }),
  service({
    category: "mobile",
    number: "01",
    assetFolder: "catalogak",
    title: "Catalogak Omnichannel Retail API",
    description:
      "Go backend unifying in-store POS and online sales — inventory sync, order management, WebSocket updates, and WhatsApp customer notifications.",
    coreStack: ["Go", "Gin", "REST API", "WebSockets"],
    infraStack: ["PostgreSQL", "WhatsApp API", "Order states", "Inventory ledger"],
    techHighlights: [
      "Single inventory source for POS and online storefront",
      "WhatsApp order status updates for customers",
      "Centralized order and stock dashboard endpoints",
      "Combined in-store and online sales reporting",
    ],
    problemsSolved: [
      "POS and online stock counts drifting apart — single inventory ledger with transactional updates across both channels.",
      "Staff missing order changes during peak retail hours — WebSocket pushes for live stock and order state on connected clients.",
      "Customers calling for status updates — automated WhatsApp notifications tied to order lifecycle events.",
      "Concurrent counter sales causing oversells — atomic stock decrements and conflict-safe order creation in Go.",
    ],
    pageDescription: `Catalogak powers omnichannel retail for Al Takamul Alteqani Computers (UAE). A Go service layer keeps counter and mobile sales aligned — merchants run both from one client while stock and orders stay in sync.

WebSocket channels push inventory and order changes to connected clients, and WhatsApp integration keeps customers informed without manual follow-up during busy retail hours.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl:
      "https://play.google.com/store/apps/details?id=catalogak.client.ae.altkamul",
  }),
  service({
    category: "mobile",
    number: "02",
    assetFolder: "urestaurants",
    title: "URestaurants Dining Discovery API",
    description:
      "Go content API for local restaurant discovery — venue listings, menus, contact data, and Redis-cached reads for a lightweight Food & Drink app.",
    coreStack: ["Go", "Gin", "REST API", "Redis caching"],
    infraStack: ["PostgreSQL", "Venue model", "Menu structures", "Cache invalidation"],
    techHighlights: [
      "Restaurant listings with menus and contact details",
      "Browse-first endpoints optimized for quick client rendering",
      "Cached content for faster repeat visits",
      "Maintainable venue data model for editorial updates",
    ],
    problemsSolved: [
      "Repeat app opens feeling slow on mobile networks — Redis-cached venue and menu reads with targeted invalidation.",
      "Menu and contact details inconsistent across listings — normalized venue schema with structured menu and phone fields.",
      "Editorial updates requiring full app refreshes — cache invalidation on venue publish so clients pick up changes quickly.",
      "Over-fetching on simple browse screens — lightweight list and detail endpoints shaped for fast client rendering.",
    ],
    pageDescription: `URestaurants helps diners in Italy find nearby venues with up-to-date menus, phone numbers, and visit information. The Go backend keeps venue data structured and cache-friendly so the mobile client stays fast on repeat loads.

The API favors simple, read-heavy patterns — list, filter, and detail endpoints with clear schemas for menus and contact fields.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl:
      "https://play.google.com/store/apps/details?id=celo.URestaurants",
  }),
  service({
    category: "mobile",
    number: "03",
    assetFolder: "readyecommerce",
    title: "Ready eCommerce Seller Operations API",
    description:
      "Node.js seller backend for store owners — product CRUD, order creation, payment collection, FCM push alerts, and sales analytics.",
    coreStack: ["Node.js", "REST API", "Payment gateways", "FCM push"],
    infraStack: ["PostgreSQL", "Inventory sync", "Order builder", "Analytics aggregates"],
    techHighlights: [
      "Publish and draft product endpoints from mobile clients",
      "Order builder with live inventory sync",
      "Cash, card, and wallet payment collection flows",
      "Revenue and bestseller analytics with push notifications",
    ],
    problemsSolved: [
      "Mobile order creation overselling limited stock — live inventory sync on the order builder before checkout completes.",
      "Cash, card, and wallet payments needing different flows — unified payment gateway layer with method-specific handlers.",
      "Sellers missing sales without keeping the app open — FCM alerts for new orders, reviews, and revenue milestones.",
      "Dashboard metrics too heavy for mobile polling — pre-aggregated analytics endpoints for revenue and bestseller views.",
    ],
    pageDescription: `Ready eCommerce Seller is a business backend by RazinSoft Ltd for entrepreneurs managing stores on the go. Sellers add products, fulfill orders, collect payments, and monitor performance through a cohesive API surface.

Dashboard endpoints aggregate revenue and bestseller metrics, while FCM delivers alerts when new sales or reviews arrive — reducing the need for constant polling.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl:
      "https://play.google.com/store/apps/details?id=com.readyecommerce.sellerapp",
  }),
  service({
    category: "mobile",
    number: "04",
    assetFolder: "casemate",
    title: "Case-Mate Branded Shopping API",
    description:
      "C# .NET ecommerce API for Case-Mate — exclusive drops, favorites, FCM launch notifications, and secure checkout for a branded Android shop.",
    coreStack: ["C#", ".NET", "ASP.NET Core", "REST API"],
    infraStack: ["PostgreSQL", "FCM push", "Launch windows", "Order history"],
    techHighlights: [
      "Early-access and exclusive product launch endpoints",
      "Saved favorites and fast return checkout flows",
      "Push notifications for offers and product drops",
      "Order history and account management APIs",
    ],
    problemsSolved: [
      "Limited drops overselling or leaking early access — launch windows with inventory reservation before public checkout opens.",
      "Customers missing exclusive releases — FCM push scheduled to drop windows and offer campaigns.",
      "Friction for repeat buyers — favorites and order history endpoints for faster return checkout.",
      "Standard catalog logic breaking drop exclusives — separate launch-state rules from evergreen product availability.",
    ],
    pageDescription: `The Case-Mate backend is an ASP.NET Core service for a branded mobile shop selling phone cases and accessories — built for customers who want launches, exclusives, and quick checkout on Android.

Product endpoints distinguish drop windows and exclusives from standard catalog items, while push integration drives re-engagement for limited releases without overloading the client with polling.`,
    imageAspect: WORK_PREVIEW_ASPECT,
    ctaUrl:
      "https://play.google.com/store/apps/details?id=co.app.id_casemate",
  }),
];

export function getWorkServiceBySlug(slug: string): WorkService | undefined {
  return WORK_SERVICES.find((project) => project.slug === slug);
}

export function getWorkServicesByCategory(category: WorkCategory): WorkService[] {
  return WORK_SERVICES.filter((project) => project.category === category);
}

/** Search params for `/work` — keeps the active Web / Mobile tab when navigating back. */
export function workListSearch(category: WorkCategory): { tab: WorkCategory } {
  return { tab: category };
}
