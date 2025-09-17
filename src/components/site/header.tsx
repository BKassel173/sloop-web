"use client";
import { SITE_ASSETS } from "@/lib/siteAssets"; 
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  Smartphone,
  Monitor,
  Camera,
  Headphones,
  Gamepad2,
  Watch,
  Bike,
} from "lucide-react";
import Container from "@/components/site/Container";
import { cn } from "@/lib/utils";

/* ----------------------------- MENU DATA ----------------------------- */

// Top-right links (first row, right)
const TOP_LINKS = [{ href: "/how-it-works", label: "How It Works" }];

// Categories row (second row)
const CATEGORIES_LEFT = [
  { key: "all", href: "/collections/all", label: "All Collection" },
  { key: "mobile", href: "/categories/mobile-tablets", label: "Mobile & Tablets" },
  { key: "computer", href: "/categories/computer", label: "Computer" },
  { key: "cameras", href: "/categories/cameras", label: "Cameras" },
  { key: "gaming", href: "/categories/gaming-vr", label: "Gaming & VR" },
  { key: "audio", href: "/categories/audio-music", label: "Audio & Music" },
  { key: "wearables", href: "/categories/wearables", label: "Wearables" },
  { key: "emobility", href: "/categories/emobility", label: "eMobility" },
];

const CATEGORIES_RIGHT = [
  { key: "brands", href: "/brands", label: "Brands" },
  { key: "top", href: "/top-products", label: "Top Products" },
  { key: "deals", href: "/deals", label: "Deals %" },
];

// Icons for the “All Categories” panel
const CATEGORY_ICON: Record<string, React.ElementType> = {
  "Mobile & Tablets": Smartphone,
  Computer: Monitor,
  Cameras: Camera,
  "Audio & Music": Headphones,
  "Gaming & VR": Gamepad2,
  Wearables: Watch,
  eMobility: Bike,
};

// “All Collection” → simple panel
const PANEL_ALL = {
  title: "All Categories",
  items: [
    "Mobile & Tablets",
    "Computer",
    "Cameras",
    "Audio & Music",
    "Gaming & VR",
    "Wearables",
    "TV's & Projectors",
    "eMobility",
  ],
};

// Example mega panel for a specific category (you can add more keys like this)
const MEGA_PANELS: Record<
  string,
  {
    columns: {
      title: string;
      links: { href: string; label: string }[];
    }[];
    image?: { src: string; alt: string };
  }
> = {
  mobile: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/mobiles", label: "Mobiles" },
          { href: "/categories/tablets", label: "Tablets" },
          { href: "/categories/ebooks", label: "eBooks" },
          { href: "/categories/accessories", label: "Accessories" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/apple", label: "Apple" },
          { href: "/brands/samsung", label: "Samsung" },
          { href: "/brands/google", label: "Google" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/iphone-16-pro", label: "iPhone 16 Pro" },
          { href: "/products/iphone-16-pro-max-1tb", label: "Apple iPhone 16 Pro Max – 1TB" },
          { href: "/products/ipad-air", label: "iPad Air" },
          { href: "/products/galaxy-z-flip6", label: "Samsung Galaxy Z Flip6" },
          { href: "/products/galaxy-s24-ultra-5g", label: "Samsung Galaxy S24 Ultra 5G" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  computer: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/laptops", label: "Laptops" },
          { href: "/categories/gaminglaptops", label: "Gaming Laptops" },
          { href: "/categories/desktop", label: "Desktops" },
          { href: "/categories/monitors", label: "Monitors" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/apple", label: "Apple" },
          { href: "/brands/microsoft", label: "Microsoft" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/apple-macbook-air", label: "Apple MacBook Air" },
          { href: "/products/apple-macbook-pro", label: "Apple MacBook Pro" },
          { href: "/products/surface-pro-copilot", label: "Surface Pro Copilot" },
          { href: "/products/dell-latitude", label: "Dell Latitude" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  cameras: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/digitalcamera", label: "Digital Camera" },
          { href: "/categories/actioncamera", label: "Gaming Laptops" },
          { href: "/categories/drones", label: "Drones" },
          { href: "/categories/camera/accessories", label: "Camera Accessories" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/caonon", label: "Canon" },
          { href: "/brands/gopro", label: "GoPro" },
        { href: "/brands/dji", label: "DJI" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/canon-eos-80d", label: "Canon EOS 80D" },
          { href: "/products/dji-osmo-pocket-3", label: "DJI Osmo Pocket 3" },
          { href: "/products/gopro-hero13", label: "GoPro Hero13" },
          { href: "/products/gopro-hero12", label: "GoPro Hero12" },
          { href: "/products/gopro-protective-housing", label: "GoPro Protective Housing" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  gaming: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/consoles", label: "Consoles" },
          { href: "/categories/virtualreality", label: "Virtual Reality" },
          { href: "/categories/gamingaccessories", label: "Gaming Accessories" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/nintendo", label: "Nintendo" },
          { href: "/brands/microsoft", label: "Microsoft" },
          { href: "/brands/sony", label: "Sony" },
        { href: "/brands/thurstmaster", label: "Thurstmaster" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/playstation-5", label: "PlayStation 5" },
          { href: "/products/switch-console", label: "Switch Console" },
          { href: "/products/xbox-s-console", label: "Xbox S Console" },
          { href: "/products/playstation-vr2", label: "PlayStation VR2" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  audio: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/headphones", label: "Headphones" },
          { href: "/categories/bluetoothspeaker", label: "Bluetooth Speaker" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/apple", label: "Apple" },
          { href: "/brands/sony", label: "Sony" },
          { href: "/brands/samsung", label: "Samsung" },
        { href: "/brands/beats", label: "Beats" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/airpods", label: "AirPods" },
          { href: "/products/beats-studio-3", label: "Beats Studio 3" },
          { href: "/products/galaxy-buds2-pro", label: "Galaxy Buds2 Pro" },
          { href: "/products/samsung-wh-1000-xm5", label: "Samsung WH-1000 XM5" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  wearables: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/applewatches", label: "Apple Watches" },
          { href: "/categories/smartwatches", label: "Smart Watches" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/apple", label: "Apple" },
          { href: "/brands/samsung", label: "Samsung" },
        { href: "/brands/garmin", label: "Garmin" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/apple-watch-ultra-2-49mm-titanium", label: "Apple Watch Ultra 2 49mm Titanium" },
          { href: "/products/garmin-fenix-7x-solar-sports-watch", label: "Garmin Fenix 7X Solar Sports Watch" },
          { href: "/products/samsung-watch6-classic-43mm", label: "Samsung Watch6 Classic 43mm" },
          { href: "/products/apple-aatch-se-44mm-alumium-case", label: "Apple Watch SE 44MM Alumium Case" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  emobility: {
    columns: [
      {
        title: "Categories",
        links: [
          { href: "/categories/ebikes", label: "eBikes" },
          { href: "/categories/escooters", label: "eScooters" },
        ],
      },
      {
        title: "Brands",
        links: [
          { href: "/brands/dirodi", label: "Dirodi" },
          { href: "/brands/segway", label: "Segway" },
        ],
      },
      {
        title: "Popular Products",
        links: [
          { href: "/products/dirodi-rover-gen-4", label: "Dirodi Rover Gen 4" },
          { href: "/products/segway-ninebot-f2", label: "Segway Ninebot F2" },
          { href: "/products/dirodi-vivo", label: "Dirodi Vivo" },
        ],
      },
    ],
    image: {
      src: "/placeholder-hero.jpg", // put an image in /public (or change the path)
      alt: "Category visual",
    },
  },
  // You can add other keys (computer, cameras, etc.) later using the same shape
};


/* ----------------------------- COMPONENT ----------------------------- */

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoverKey, setHoverKey] = useState<string | null>(null); // which category is hovered
  const panelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close the panel when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !barRef.current?.contains(t)) {
        setHoverKey(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      {/* Row 1: logo • search • right links/icons */}
      <Container className="grid h-16 grid-cols-[auto_minmax(240px,640px)_auto] items-center gap-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-black tracking-tight">
         <img
          src={SITE_ASSETS.logos.sloopLogo}
          alt="Sloop"
          className="h-8 w-auto"
         />
        </Link>

        {/* SEARCH (center) */}
        <form className="relative w-full justify-self-center">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            placeholder="Search products…"
            className={cn(
              "h-11 w-full rounded-full border border-neutral-300 bg-white pl-10 pr-4 text-sm",
              "outline-none ring-0 transition focus:border-[--color-sloop-purple]"
            )}
          />
        </form>

        {/* RIGHT LINKS + ICONS */}
        <div className="flex items-center gap-4">
          {TOP_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden text-[15px] font-semibold text-neutral-900 md:inline-block"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/account" aria-label="Account" className="hidden md:inline-flex">
            <UserRound className="h-5 w-5 text-neutral-800" />
          </Link>
          <Link href="/wishlist" aria-label="Wishlist" className="hidden md:inline-flex">
            <Heart className="h-5 w-5 text-neutral-800" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative hidden md:inline-flex">
            <ShoppingCart className="h-5 w-5 text-neutral-800" />
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-400 px-1 text-xs font-semibold text-white">
              1
            </span>
          </Link>
          <button
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Row 2: categories bar (desktop hover target) */}
      <div className="border-t border-neutral-200 bg-white">
        <Container
          ref={barRef as any}
          className="flex h-12 items-center gap-6 overflow-x-auto"
          onMouseLeave={() => setHoverKey(null)}
        >
          {/* Left categories */}
          <nav className="flex items-center gap-6">
            {CATEGORIES_LEFT.map((c) => (
              <Link
                key={c.key}
                href={c.href}
                onMouseEnter={() => setHoverKey(c.key)}
                className={cn(
                  "whitespace-nowrap text-[15px] text-neutral-800 hover:text-neutral-900",
                  hoverKey === c.key && "border-b-2 border-[--color-sloop-purple] pb-2"
                )}
              >
                {c.label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <span className="hidden h-5 w-px bg-neutral-300 md:block" />

          {/* Right links (no panel) */}
          <nav className="hidden items-center gap-6 md:flex">
            {CATEGORIES_RIGHT.map((c) => (
              <Link
                key={c.key}
                href={c.href}
                className="whitespace-nowrap text-[15px] text-neutral-800 hover:text-neutral-900"
              >
                {c.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {/* Hover panels (desktop only) */}
      <div className="relative hidden md:block">
        {hoverKey && (
          <div
            ref={panelRef}
            className="absolute left-0 right-0 border-t border-neutral-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
            onMouseLeave={() => setHoverKey(null)}
          >
            <Container className="py-6">
              {/* Panel: All Collection */}
              {hoverKey === "all" ? (
                <div>
                  <div className="mb-4 text-base font-semibold">All Categories</div>
                  <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {PANEL_ALL.items.map((label) => {
                      const Icon = CATEGORY_ICON[label] || Smartphone;
                      return (
                        <Link
                          key={label}
                          href="#"
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-50"
                        >
                          <Icon className="h-5 w-5 text-neutral-700" />
                          <span className="text-[15px] text-neutral-900">{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                // Panel: Specific category (e.g., Mobile & Tablets)
                (() => {
                  const panel = MEGA_PANELS[hoverKey];
                  if (!panel) return null;
                  return (
                    <div className="grid items-start gap-8 lg:grid-cols-[2fr_2fr_2fr_1.6fr]">
                      {panel.columns.map((col) => (
                        <div key={col.title}>
                          <div className="mb-3 text-base font-semibold">{col.title}</div>
                          <ul className="space-y-2">
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  className="text-[15px] text-neutral-800 hover:underline"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {/* Image */}
                      {panel.image && (
                        <div className="hidden overflow-hidden rounded-xl border border-neutral-200 lg:block">
                          <img
                            src={panel.image.src}
                            alt={panel.image.alt}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </Container>
          </div>
        )}
      </div>

      {/* Mobile sheet (collapses both rows) */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <Container className="py-3">
            {/* Search in mobile */}
            <form className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />
              <input
                type="search"
                placeholder="Search products…"
                className="h-11 w-full rounded-full border border-neutral-300 bg-white pl-10 pr-4 text-sm outline-none ring-0"
              />
            </form>

            {/* Flattened links */}
            <div className="flex flex-col">
              {TOP_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-2 py-2 text-[15px] hover:bg-neutral-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-neutral-200" />

              {[...CATEGORIES_LEFT, ...CATEGORIES_RIGHT].map((c) => (
                <Link
                  key={c.key}
                  href={c.href}
                  className="rounded-lg px-2 py-2 text-[15px] hover:bg-neutral-50"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
