"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { INQUIRY_TYPES, type ContactState } from "@/lib/contact";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  type: z.enum(INQUIRY_TYPES, { message: "Please choose what this is about." }),
  budget: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Please write at least a few words.").max(5000),
});

// Honeypot field name: deliberately meaningless so browser/password-manager autofill
// never fills it (a field named "company" was being autofilled for real visitors).
const HONEYPOT = "hp_field";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // A filled honeypot means a bot: pretend it worked and send nothing.
  if (String(formData.get(HONEYPOT) ?? "").trim()) {
    console.warn("Contact form: honeypot filled, message dropped as spam.");
    return { status: "success", message: "Thanks! Your message is on its way — I'll get back to you soon." };
  }

  const parsed = ContactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: {
        name: errors.name?.[0],
        email: errors.email?.[0],
        type: errors.type?.[0],
        message: errors.message?.[0],
      },
    };
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD are not set.");
    return { status: "error", message: "The form isn't set up yet. Please email me directly instead." };
  }

  const { name, email, type, budget, message } = parsed.data;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Portfolio contact form" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL || GMAIL_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `[Portfolio] ${type} — ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, `About: ${type}`, budget ? `Budget: ${budget}` : null, "", message]
        .filter((line) => line !== null)
        .join("\n"),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
        <strong>Email:</strong> ${escapeHtml(email)}<br/>
        <strong>About:</strong> ${escapeHtml(type)}${budget ? `<br/><strong>Budget:</strong> ${escapeHtml(budget)}` : ""}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
    console.info("Contact form: email sent", { messageId: info.messageId, accepted: info.accepted, rejected: info.rejected });
    return { status: "success", message: "Thanks! Your message is on its way — I'll get back to you soon." };
  } catch (error) {
    console.error("Contact form: failed to send email", error);
    return { status: "error", message: "Something went wrong sending your message. Please email me directly." };
  }
}
