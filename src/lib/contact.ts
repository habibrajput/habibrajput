// Shared between the contact form (client) and its server action.
export const INQUIRY_TYPES = ["New project", "Services / consulting", "Hiring / job opportunity", "Something else"] as const;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "type" | "message", string>>;
};
