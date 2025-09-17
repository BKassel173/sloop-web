export default function HowItWorks() {
  const steps = [
    {
      title: "Pick your device",
      desc: "Choose the latest tech that fits your needs and budget.",
      icon: "🛒",
    },
    {
      title: "Subscribe in minutes",
      desc: "Fast checkout. No large upfront cost. Pause or cancel anytime.",
      icon: "⚡",
    },
    {
      title: "Enjoy & upgrade",
      desc: "We ship fast. Swap or upgrade when it suits you.",
      icon: "🚚",
    },
  ]

  return (
    <section id="how-it-works" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sloop-purple">
          How it works
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-xl border bg-white shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-semibold text-sloop-purple">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
