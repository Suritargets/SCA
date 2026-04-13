import Link from "next/link";

export function CtaBanner() {
  return (
    <section
      className="relative overflow-hidden py-24 text-center"
      style={{
        backgroundColor: "#f0f4f8",
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(180,195,210,0.25) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(180,195,210,0.25) 0%, transparent 50%),
                          radial-gradient(circle at 60% 80%, rgba(180,195,210,0.25) 0%, transparent 50%),
                          radial-gradient(circle at 10% 10%, rgba(180,195,210,0.2) 0%, transparent 40%),
                          radial-gradient(circle at 90% 90%, rgba(180,195,210,0.2) 0%, transparent 40%)`,
      }}
    >
      <div className="relative mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Be the expert in finance!
        </p>
        <h2 className="mt-4 text-5xl font-black leading-tight text-sca-navy md:text-7xl">
          Forms your Future in<br />Accounting &amp; Finance
        </h2>
        <Link
          href="/contact"
          className="mt-10 inline-block rounded bg-sca-orange px-12 py-4 text-sm font-bold uppercase tracking-widest text-white hover:bg-sca-orange-dark transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
