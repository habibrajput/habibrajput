import { Mail, MapPin, Phone } from "lucide-react";
import { DATA } from "@/data/resume";

export const CONTACT_LINKS = [
  { name: "Email", label: DATA.contact.email, href: `mailto:${DATA.contact.email}`, icon: Mail, external: false },
  { name: "Phone", label: DATA.contact.telDisplay, href: `tel:${DATA.contact.tel}`, icon: Phone, external: false },
  { name: "Location", label: DATA.location, href: DATA.locationLink, icon: MapPin, external: true },
  { name: "GitHub", label: `@${DATA.githubUsername}`, href: DATA.contact.social.GitHub.url, icon: DATA.contact.social.GitHub.icon, external: true },
  { name: "LinkedIn", label: "in/habibrajput", href: DATA.contact.social.LinkedIn.url, icon: DATA.contact.social.LinkedIn.icon, external: true },
];
