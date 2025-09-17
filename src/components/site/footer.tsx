import Link from "next/link";
import Container from "@/components/site/Container";
import { SITE_ASSETS } from "@/lib/siteAssets";

const COLS = [
  {
    title: "SLOOP",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "OFFER",
    links: [
      { href: "/top-products", label: "Top Products" },
      { href: "/invite", label: "Invite Friends" },
      { href: "/deals", label: "Deals %" },
    ],
  },
  {
    title: "INFO",
    links: [
      { href: "/how-it-works", label: "How it Works" },
      { href: "/sloop-care", label: "Sloop Care" },
      { href: "/sustainability", label: "Sustainability" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-white">
      <Container className="py-12">
        {/* Top grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* 3 columns of links */}
          <div className="md:col-span-3 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-bold tracking-wide text-neutral-900">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-3 text-[15px] text-neutral-600">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="hover:text-neutral-900">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Follow / Reviews */}
          <div>
            <div className="text-sm font-bold tracking-wide text-neutral-900">FOLLOW US</div>
            <div className="mt-4 flex items-center gap-3">
              <a
             href="https://instagram.com/"
            aria-label="Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 hover:bg-neutral-50"
            target="_blank" rel="noreferrer"
            >
             <img src={SITE_ASSETS.logos.instagram} alt="Instagram" className="h-5 w-5" />
            </a>
            </div>

            <div className="mt-8 text-sm font-bold tracking-wide text-neutral-900">REVIEWS</div>
            <div className="mt-3">
             {/* Reviews badge */}
            <img
            src={SITE_ASSETS.logos.reviewsBadge}
            alt="REVIEWS.io rating"
            className="h-10 w-auto"
            />
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
        <img src={SITE_ASSETS.payments.mastercard} alt="Mastercard" className="h-8 w-auto" />
        <img src={SITE_ASSETS.payments.visa} alt="Visa" className="h-8 w-auto" />
        <img src={SITE_ASSETS.payments.amex} alt="American Express" className="h-8 w-auto" />
        <img src={SITE_ASSETS.payments.paypal} alt="PayPal" className="h-8 w-auto" />
        </div>

        {/* Legal strip */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-600 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Sloop IT PTY LTD</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-neutral-900">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-900">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
