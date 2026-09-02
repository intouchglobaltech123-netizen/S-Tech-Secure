import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(20),
  email: z.string().trim().email().max(120).or(z.literal("")),
  location: z.string().trim().max(60),
  message: z.string().trim().max(1200),
});

export type Enquiry = z.infer<typeof enquirySchema>;

/**
 * Contact intake. Server-side validated, no credentials in client code.
 * Swap the delivery step for an email service or CRM later — the shape stays.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const webhook = process.env["ENQUIRY_WEBHOOK_URL"];

    if (webhook) {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
      });
    } else {
      console.info("[enquiry] received", {
        name: data.name,
        location: data.location,
        hasEmail: Boolean(data.email),
      });
    }

    return { ok: true as const };
  });
