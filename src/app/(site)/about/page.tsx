export const metadata = { title: "About us – Suriname College of Accountancy" };

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative text-white overflow-hidden min-h-[280px] flex items-end">
        {/* Background photo */}
        <img
          src="/about2.jpg"
          alt="SCA Building"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-sca-orange via-sca-orange/80 to-sca-orange/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-32">
          <h1 className="text-4xl font-bold md:text-5xl">About us</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-sca-navy leading-tight">
              Professional educations<br />in Accounting &amp; Finance
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Suriname College of Accountancy (SCA) is established in 2006 as a
              foundation to contribute and to fulfill the need for financial
              professionals in Suriname. SCA is the official tuition provider for
              the following international educational bodies: Association of
              Chartered Certified Accountants (ACCA) and the NIVE &amp; ISACA.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              SCA has local recognition by the Surinamese Accreditation body,
              established by the Ministry of Education and Community Development
              in Suriname. We aim to join knowledge with other local educational
              bodies to monitor the quality of accountancy education and improve
              industrial practices. The Suriname Chartered Accountants Institute
              (SCAI) also recognizes the qualifications provided by SCA.
            </p>

            <div className="space-y-3 pt-2">
              <img
                src="/about-3.png"
                alt="SCA Students"
                className="w-full rounded-lg object-cover"
              />
              <img
                src="/about-768x398.png"
                alt="SCA Students in class"
                className="w-full rounded-lg object-cover"
              />
              <p className="text-center text-xs text-muted-foreground italic">
                We are a licensed CBR exam centre for on demand exams of ACCA
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Classroom photo */}
            <img
              src="/IMG_4074.jpg"
              alt="SCA Classroom"
              className="w-full rounded-lg object-cover"
            />
            {/* ACCA callout */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Suriname College of Accountancy is officially an{" "}
              <strong className="text-foreground">Approved Learning Partner</strong>{" "}
              of <strong className="text-foreground">ACCA</strong> since April 1 2021.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
