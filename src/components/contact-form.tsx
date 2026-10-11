"use client";

import { useActionState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { sendContactMessage } from "@/app/actions/contact";
import { INQUIRY_TYPES, type ContactState } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initialState: ContactState = { status: "idle" };

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:ring-2 focus:ring-ring/20 aria-invalid:border-red-500";

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, initialState);
  const errors = state.fieldErrors ?? {};
  // Spam check: record when the form loaded in the visitor's browser. Bots that post
  // without running JavaScript, or submit instantly, fail the server-side check.
  const startedAtRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-12 text-center">
        <CheckCircle2 className="size-8 text-emerald-500" aria-hidden />
        <p className="font-semibold">Message sent</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {state.message ?? "Thanks! I'll get back to you soon."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass}
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass}
            placeholder="jane@company.com"
          />
        </Field>
        <Field label="What's it about?" htmlFor="type" required error={errors.type}>
          <select
            id="type"
            name="type"
            required
            defaultValue={INQUIRY_TYPES[0]}
            aria-invalid={!!errors.type}
            className={fieldClass}
          >
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget (optional)" htmlFor="budget">
          <input id="budget" name="budget" className={fieldClass} placeholder="e.g. $5k–10k, or hourly" />
        </Field>
      </div>

      <Field label="Message" htmlFor="message" required error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(fieldClass, "resize-y")}
          placeholder="Tell me about your project, timeline and goals…"
        />
      </Field>

      <input ref={startedAtRef} type="hidden" name="started_at" defaultValue="" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p role="status" className={cn("text-sm", state.status === "error" ? "text-red-500" : "text-muted-foreground")}>
          {state.status === "error" ? state.message : "I usually reply within 1–2 days."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {pending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
