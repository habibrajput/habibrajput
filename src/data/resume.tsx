import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";
import { Aws } from "@/components/ui/svgs/aws";
import { fromSimpleIcon } from "@/components/ui/svgs/simple-icon";
import {
  siApachekafka,
  siClaude,
  siElasticsearch,
  siGraphql,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNestjs,
  siNginx,
  siPhp,
  siRedis,
  siTailwindcss,
  siVuedotjs,
} from "simple-icons";
import {
  ArrowLeftRight,
  Boxes,
  Braces,
  Network,
  Workflow,
} from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";


type Project = {
  title: string;
  role: string;
  href?: string;
  description: string;
  technologies: readonly string[];
  links?: readonly { type: string; href: string; icon: ReactNode }[];
  image?: string;
  video?: string;
};

const PROJECTS: readonly Project[] = [
  {
    title: "eGP Hub – Multi-Tenant Learning Management System",
    role: "Senior Software Engineer",
    href: "https://platform.egphub.com/",
    description:
      "A multi-tenant learning management system where every organization runs its own isolated space — courses, learners and content — on one shared platform. As a senior engineer I build features across the Laravel backend and Vue.js frontend and ship them through Dockerized CI/CD pipelines to AWS.",
    technologies: ["Laravel", "Vue.js", "Docker", "CI/CD Pipelines", "AWS"],
    image: "/projects/egphub.webp",
  },
  {
    title: "Geysital – Smart Geyser Control App",
    role: "Senior Full-Stack Developer",
    image: "/projects/geysital.webp",
    description:
      "A React Native app for controlling smart water heaters. Users pair a geyser over Bluetooth or set it up on home Wi-Fi for remote control, then manage every geyser from one dashboard — live and target temperature, power, a temperature slider from 35–75°C, and gas, electric or hybrid source priority.",
    technologies: ["React Native", "Bluetooth LE", "Wi-Fi Setup", "IoT"],
  },
  {
    title: "Pella Nova – Personal Branding & AI Visibility",
    role: "Next.js Frontend Developer",
    image: "/projects/pella-nova.webp",
    description:
      "A personal-branding platform that helps executives and founders get found in search and AI answers. I worked on the redesign in Next.js and React — service and pricing pages, portfolio designs, forms and reusable UI components — with a focus on mobile responsiveness and performance.",
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "RepairDesk – SaaS POS for Repair Shops",
    role: "Full-Stack Developer",
    image: "/projects/repairdesk.webp",
    description:
      "A cloud platform repair shops run their day on — tickets, inventory, sales and operations. I shipped features across Laravel and Yii2 APIs, fixed production issues through root-cause analysis, and led the migration of legacy Vue 2 modules to Vue 3.",
    technologies: ["Laravel", "Yii2", "Vue.js", "JavaScript", "MySQL", "REST APIs"],
  },
  {
    title: "TableTab – Restaurant POS & Management Platform",
    role: "Senior Full-Stack Developer",
    image: "/projects/tabletab.webp",
    description:
      "A multi-tenant restaurant platform combining POS, online ordering and back office. I designed the modular NestJS backend on PostgreSQL and Redis, built the customer and admin apps in Next.js, and own authentication, onboarding, tenant management, email workflows, realtime order tracking, an offline-capable POS, and the containerized production setup.",
    technologies: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Cloudflare", "Hetzner"],
  },
  {
    title: "Dr. Nutrition – Multi-Country E-commerce",
    role: "Senior Full-Stack Developer",
    image: "/projects/dr-nutrition.webp",
    description:
      "An international e-commerce platform for a health and nutrition retailer. I built checkout, payments, promotions, cart recovery, shipping and content features, integrated Tabby and Tamara buy-now-pay-later, added WhatsApp order updates, and created a page builder that lets marketing launch campaign pages without developers.",
    technologies: ["Laravel", "Vue.js", "React", "JavaScript", "MySQL", "Redis", "REST APIs"],
  },
  {
    title: "Laperva – Health & Nutrition E-commerce",
    role: "Senior Full-Stack Developer",
    image: "/projects/laperva.webp",
    description:
      "The online store for Laperva, a health and nutrition brand, built while at Dr. Nutrition. I worked on responsive product and content pages, backend integrations and site performance, using reusable components shared across the storefront.",
    technologies: ["Laravel", "PHP", "Vue.js", "React", "JavaScript", "MySQL", "REST APIs"],
  },
];

type Certification = {
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  issuer: string;
  date: string;
  href?: string;
};

const CERTIFICATIONS: readonly Certification[] = [
  {
    title: "Claude Code in Action",
    icon: fromSimpleIcon(siClaude),
    issuer: "Anthropic",
    date: "Sep 2026",
    href: "/certificates/claude-code-in-action.pdf",
  },
  {
    title: "Software Architect – 99th percentile",
    icon: Network,
    issuer: "TestGorilla",
    date: "Sep 2026",
  },
  {
    title: "Laravel – 97th percentile",
    icon: fromSimpleIcon(siLaravel),
    issuer: "TestGorilla",
    date: "Sep 2026",
  },
  {
    title: "AWS – 82nd percentile",
    icon: Aws,
    issuer: "TestGorilla",
    date: "Sep 2026",
  },
];

// Vercel provides the production domain at build time; fall back to localhost in dev.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const DATA = {
  name: "Habib Ur Rehman",
  initials: "HR",
  url: SITE_URL,
  location: "Lahore, Pakistan",
  locationLink: "https://www.google.com/maps/place/Lahore",
  description:
    "Senior Software Engineer building multi-tenant SaaS, e-commerce and POS platforms with Laravel, NestJS, Vue.js and Next.js.",
  summary:
    "I'm a Senior Software Engineer with **6+ years** of experience building and scaling web products — from multi-tenant SaaS and learning platforms to e-commerce, fintech and restaurant POS systems.\n\nI work across the whole stack: **Laravel** and **NestJS** on the backend, **Vue.js**, **React** and **Next.js** on the frontend, **MySQL**, **PostgreSQL** and **Redis** underneath, shipped with Docker, CI/CD pipelines and AWS.\n\nI care most about software that holds up in production — secure payment flows, fast checkouts, POS systems that keep selling when the network drops, and architecture the next engineer can extend without fear. I enjoy turning fuzzy requirements into clean, modular systems, working closely with product and design to get there.",
  githubUsername: "habibrajput",
  gallery: [
    {
      city: "Dubai",
      country: "UAE",
      photos: [
        { src: "/gallery/dubai/jbr-beach-ain-dubai.webp", alt: "Sunset on JBR beach with the Ain Dubai wheel behind", width: 750, height: 1000 },
        { src: "/gallery/dubai/dubai-frame-fireworks.webp", alt: "New Year fireworks at the Dubai Frame", width: 750, height: 1000 },
        { src: "/gallery/dubai/downtown-dubai.webp", alt: "Downtown Dubai by the Burj Lake at dusk", width: 750, height: 1000 },
        { src: "/gallery/dubai/dhow-cruise.webp", alt: "Evening dhow cruise on the water", width: 750, height: 1000 },
        { src: "/gallery/dubai/office.webp", alt: "Working with a colleague at the office in Dubai", width: 1000, height: 750 },
        { src: "/gallery/dubai/dubai-mall.webp", alt: "At Dubai Mall", width: 750, height: 1000 },
        { src: "/gallery/dubai/burj-fountain.webp", alt: "Night at the Dubai Fountain promenade", width: 450, height: 1000 },
        { src: "/gallery/dubai/night-walk.webp", alt: "Late-night walk through the city", width: 1000, height: 750 },
        { src: "/gallery/dubai/mall-christmas.webp", alt: "Christmas display at a Dubai mall", width: 750, height: 1000 },
        { src: "/gallery/dubai/evening-cafe.webp", alt: "Evening coffee with a friend", width: 563, height: 1000 },
        { src: "/gallery/dubai/pakistan-latte.webp", alt: "A latte with \"Pakistan\" in the foam art at a Dubai café", width: 750, height: 1000 },
      ],
    },
  ],
  linkedinPosts: [
    {
      urn: "urn:li:share:7509128354436984832",
      title: "LinkedIn post by Habib Ur Rehman: moving our product to a monorepo",
    },
    {
      urn: "urn:li:ugcPost:7507472101587464193",
      title: "LinkedIn post by Habib Ur Rehman: Claude Code certification",
    },
  ],
  avatarUrl: "/me.jpg",
  skills: [
    { name: "PHP", icon: fromSimpleIcon(siPhp) },
    { name: "Laravel", icon: fromSimpleIcon(siLaravel) },
    { name: "Node.js", icon: Nodejs },
    { name: "NestJS", icon: fromSimpleIcon(siNestjs) },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Vue.js", icon: fromSimpleIcon(siVuedotjs) },
    { name: "TypeScript", icon: Typescript },
    { name: "Tailwind CSS", icon: fromSimpleIcon(siTailwindcss) },
    { name: "REST APIs", icon: Braces },
    { name: "GraphQL", icon: fromSimpleIcon(siGraphql) },
    { name: "WebSockets", icon: ArrowLeftRight },
    { name: "MySQL", icon: fromSimpleIcon(siMysql) },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "MongoDB", icon: fromSimpleIcon(siMongodb) },
    { name: "Redis", icon: fromSimpleIcon(siRedis) },
    { name: "Kafka", icon: fromSimpleIcon(siApachekafka) },
    { name: "Elasticsearch", icon: fromSimpleIcon(siElasticsearch) },
    { name: "Docker", icon: Docker },
    { name: "AWS", icon: Aws },
    { name: "CI/CD", icon: Workflow },
    { name: "Nginx", icon: fromSimpleIcon(siNginx) },
    { name: "Linux", icon: fromSimpleIcon(siLinux) },
    { name: "System Design", icon: Network },
    { name: "Microservices", icon: Boxes },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "findhabibrajput@gmail.com",
    tel: "+923494056872",
    telDisplay: "+92 349 4056872",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/habibrajput",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/habibrajput",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:findhabibrajput@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Dr. Nutrition",
      href: "",
      badges: [],
      location: "Riyadh, KSA",
      title: "Senior Software Engineer",
      logoUrl: "/dr-nutrition.webp",
      start: "2023",
      end: "Present",
      description: [
        "Developed and maintained core e-commerce functionality: shopping cart, cart abandonment recovery, coupon/discount systems, and checkout flow optimization to improve conversion rates.",
        "Designed and built a custom page builder (jQuery, React.js, Vue.js) that lets non-technical teams create and customize dynamic pages for events, promotions, and marketing campaigns.",
        "Built modular, reusable frontend components in React.js and Vue.js, integrated with robust backend services for scalability and performance.",
        "Integrated the Tabby and Tamara payment gateways for secure, compliant transaction processing across multiple e-commerce workflows.",
        "Designed WhatsApp-based notification services delivering real-time order status updates to improve post-purchase engagement.",
      ],
    },
    {
      company: "RepairDesk",
      href: "",
      badges: [],
      location: "Lahore, Pakistan",
      title: "Full Stack Developer",
      logoUrl: "/repairdesk.png",
      start: "2022",
      end: "2023",
      description: [
        "Contributed to RepairDesk, a SaaS enterprise platform for the repair industry, across frontend (Vue.js, React.js) and backend (Laravel, Yii2).",
        "Resolved complex system issues through in-depth troubleshooting and root-cause analysis, improving platform stability before joining the feature team.",
        "Led the migration of legacy Vue.js 2 modules to Vue.js 3, improving performance and maintainability.",
        "Developed RESTful APIs in Laravel 8 while maintaining and optimizing existing Yii2 APIs for secure, scalable data exchange.",
      ],
    },
    {
      company: "Developers Studio",
      href: "",
      badges: [],
      location: "Lahore, Pakistan",
      title: "Software Engineer",
      logoUrl: "/developers-studio.svg",
      start: "2021",
      end: "2022",
      description: [
        "Improved app data sync by building scalable APIs with Laravel and Node.js, ensuring interoperability for React Native users.",
        "Integrated software with Farm Tech systems to control and automate robotic movement across agricultural zones, with pest avoidance and predictive analytics for bug attacks.",
        "Built a full-stack platform (Laravel, React.js, Node.js) generating Apple Wallet gift cards embedded with cryptocurrency addresses.",
        "Integrated banking systems for bulk financial trades via Excel upload and processing, supporting enterprise-scale workflows.",
      ],
    },
    {
      company: "Sahoolat Kar",
      href: "",
      badges: [],
      location: "Lahore, Pakistan",
      title: "Software Engineer",
      logoUrl: "/sahoolat-kar.png",
      start: "2020",
      end: "2021",
      description: [
        "Developed custom REST APIs in Laravel for seamless data integration between applications.",
        "Built Single Page Applications with Vue.js, Vuex, Vuetify, and Vue Router.",
        "Used Laravel packages and features such as Yajra DataTables, JWT auth, eager loading, and Laratrust for role-based access control.",
        "Deployed projects to Ubuntu servers with secure, reliable hosting.",
      ],
    },
  ],
  education: [
    {
      school: "Superior University Lahore",
      href: "https://superior.edu.pk",
      degree: "Master in Computer Science",
      logoUrl: "/superior-university.svg",
      start: "2018",
      end: "2020",
    },
    {
      school: "Superior College Okara",
      href: "https://superior.edu.pk",
      degree: "Associate Degree Program, Computer Science",
      logoUrl: "/superior-university.svg",
      start: "2016",
      end: "2018",
    },
    {
      school: "Superior College Okara",
      href: "https://superior.edu.pk",
      degree: "FSc",
      logoUrl: "/superior-university.svg",
      start: "2012",
      end: "2014",
    },
  ],
  achievements: [
    {
      title: "Optimized System Performance",
      description:
        "Improve speed and reliability through efficient code refactoring, query tuning and database indexing.",
    },
    {
      title: "Scalable Architecture Design",
      description:
        "Design modular, scalable backend architectures that grow with the product and the team.",
    },
    {
      title: "API Development and Integration",
      description:
        "Build secure, high-performing RESTful APIs and integrate third-party services to extend what applications can do.",
    },
    {
      title: "25% faster responses",
      description:
        "Cut system response time by a quarter through targeted code refactoring and database indexing.",
    },
    {
      title: "Buy-now-pay-later at checkout",
      description:
        "Integrated Tabby and Tamara into a multi-country e-commerce checkout, with WhatsApp order-status updates after purchase.",
    },
    {
      title: "Vue 2 → Vue 3 migration",
      description:
        "Led the move of legacy Vue 2 modules to Vue 3 in a production SaaS used daily by repair businesses.",
    },
  ],
  domains: [
    "SaaS Product Development",
    "FinTech & Payment Systems",
    "E-commerce Platforms",
    "POS & Retail Solutions",
  ],
  projects: PROJECTS,
  certifications: CERTIFICATIONS,
} as const;
