export default function SiteFooter() {
  return (
    <footer className="bg-sloop-purple text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold">Sloop</h2>
          <p className="text-sm mt-2 opacity-80">
            Premium device rentals made simple.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/products" className="hover:underline">Products</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm">support@sloop-it.com</p>

          {/* newsletter (non-interactive placeholder for now) */}
          <form className="mt-4 flex overflow-hidden rounded-lg border border-white/20 bg-white/10">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-3 py-2 text-sm bg-transparent placeholder-white/70 outline-none"
            />
            <button
              className="bg-white text-sloop-purple px-4 text-sm font-medium hover:opacity-90"
              type="button"
              disabled
              title="Coming soon"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs opacity-80">
        © {new Date().getFullYear()} Sloop. All rights reserved.
      </div>
    </footer>
  )
}
