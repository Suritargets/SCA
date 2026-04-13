export function PageHero({
  title,
  subtitle,
  backgroundImage,
}: {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}) {
  return (
    <section className="relative overflow-hidden py-16 text-white">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          className="absolute right-0 top-0 h-full w-auto max-w-[55%] object-cover object-left"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-sca-orange via-sca-orange/80 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6">
        <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-sm opacity-90">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
