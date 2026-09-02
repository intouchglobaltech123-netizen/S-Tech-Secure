import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Section, SectionHeading } from "@/components/sections/Section";
import { company, addressLine, serviceAreas } from "@/data/company";
import { submitEnquiry } from "@/lib/enquiry.functions";

export function ContactCta() {
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setPending(true);
    try {
      const res = await submitEnquiry({
        data: {
          name: String(fd.get("name") ?? ""),
          phone: String(fd.get("phone") ?? ""),
          email: String(fd.get("email") ?? ""),
          location: String(fd.get("location") ?? ""),
          message: String(fd.get("message") ?? ""),
        },
      });
      if (res.ok) {
        toast.success("Enquiry received. We'll be in touch shortly.");
        form.reset();
      }
    } catch {
      toast.error(`Could not send. Please call ${company.phone} instead.`);
    } finally {
      setPending(false);
    }
  }

  const field =
    "w-full rounded border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none";

  return (
    <Section id="contact">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Request a security assessment"
            title="Ready to secure what matters?"
            copy="Tell us what you need to protect. We'll survey the site and design the right security system for the space — no obligation."
          />

          <dl className="mt-10 space-y-px overflow-hidden rounded-lg border border-border bg-border">
            <div className="flex items-start gap-4 bg-surface p-6">
              <Phone className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Phone
                </dt>
                <dd className="mt-1 text-sm">
                  <a href={company.phoneHref} className="hover:text-primary">
                    {company.phone}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-surface p-6">
              <Mail className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Email
                </dt>
                <dd className="mt-1 text-sm">
                  <a href={`mailto:${company.email}`} className="hover:text-primary">
                    {company.email}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-surface p-6">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{addressLine}</dd>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-surface p-6">
              <Clock className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
              <div>
                <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  Hours
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{company.hours}</dd>
              </div>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="surface-panel rounded-lg p-7 sm:p-9">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="mb-2 block text-xs text-muted-foreground">
                Name
              </label>
              <input id="name" name="name" required maxLength={80} className={field} placeholder="Your name" />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="phone" className="mb-2 block text-xs text-muted-foreground">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                required
                inputMode="tel"
                maxLength={20}
                className={field}
                placeholder="Mobile number"
              />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="email" className="mb-2 block text-xs text-muted-foreground">
                Email <span className="text-muted-foreground/60">(optional)</span>
              </label>
              <input id="email" name="email" type="email" maxLength={120} className={field} placeholder="you@email.com" />
            </div>
            <div className="sm:col-span-1">
              <label htmlFor="location" className="mb-2 block text-xs text-muted-foreground">
                Location
              </label>
              <select id="location" name="location" className={field} defaultValue={serviceAreas[0]!.name}>
                {serviceAreas.map((a) => (
                  <option key={a.name} value={a.name}>
                    {a.name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-xs text-muted-foreground">
                What needs protecting?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1200}
                className={field}
                placeholder="Property type, approximate area, number of entries, any existing system…"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded bg-primary px-6 py-4 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-primary-foreground transition-all hover:shadow-glow disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
            {pending ? "Sending" : "Request assessment"}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Prefer to talk? Call{" "}
            <a href={company.phoneHref} className="text-highlight hover:underline">
              {company.phone}
            </a>
          </p>
        </form>
      </div>
    </Section>
  );
}
