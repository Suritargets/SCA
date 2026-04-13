import { PageHero } from "@/components/page-hero";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = { title: "Contact us – Suriname College of Accountancy" };

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "Henck Arronstraat 134\nParamaribo, Suriname\nSouth-America",
  },
  { icon: Phone, label: "Phone", value: "(t) 597-425 766\n(m) 597-7156302" },
  { icon: Mail, label: "Email", value: "info@surinamecollegeofaccountancy.com" },
  {
    icon: Clock,
    label: "Office hours",
    value: "Mon. – Fri. 08:00 – 12:00\nSat. 9:00 – 12:00",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact us" />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-8">
            {contactInfo.map((c) => (
              <div key={c.label} className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sca-orange/10">
                  <c.icon className="h-5 w-5 text-sca-orange" />
                </div>
                <div>
                  <p className="font-semibold text-sca-navy">{c.label}</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                    {c.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-xl border">
            <iframe
              title="SCA Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.5!2d-55.167!3d5.833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNTAnMDAuMCJOIDU1wrAxMCcwMC4wIlc!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
