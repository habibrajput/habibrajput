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


export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  slug: string;
  title: string;
  role: string;
  href?: string;
  description: string;
  overview: string;
  impact: readonly string[];
  technologies: readonly string[];
  images: readonly ProjectImage[];
  links?: readonly { type: string; href: string; icon: ReactNode }[];
  stats?: readonly { value: string; label: string; detail: string }[];
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  pdf: string;
  problem: { intro: string; points: readonly string[] };
  approach: readonly { title: string; detail: string }[];
  build: {
    intro: string;
    paths: readonly { title: string; flow: string; points: readonly string[] }[];
    stack: readonly { name: string; role: string }[];
  };
};

const wide = (src: string, alt: string): ProjectImage => ({ src, alt, width: 2000, height: 1101 });
const phone = (src: string, alt: string): ProjectImage => ({ src, alt, width: 563, height: 1000 });

const PROJECTS: readonly Project[] = [
  {
    slug: "egp-hub",
    title: "eGP Hub – Multi-Tenant Learning Management System",
    role: "Senior Software Engineer",
    href: "https://platform.egphub.com/",
    description:
      "A multi-tenant learning management system where every organization runs its own isolated space — courses, learners and content — on one shared platform. As a senior engineer I build features across the Laravel backend and Vue.js frontend and ship them through Dockerized CI/CD pipelines to AWS.",
    overview:
      "eGP Hub is a multi-tenant learning management system. Each organization gets its own isolated space for courses, learners and content, while everything runs on one shared platform and codebase.\n\nI work on it as a Senior Software Engineer, building features end to end across the Laravel backend and the Vue.js frontend, and shipping them through Dockerized CI/CD pipelines to AWS.",
    impact: [
      "Build features end to end across the Laravel backend and Vue.js frontend of a platform shared by multiple organizations.",
      "Work within a multi-tenant architecture where each organization's courses, learners and content stay isolated.",
      "Ship changes through Dockerized CI/CD pipelines to AWS, keeping releases consistent and repeatable.",
    ],
    technologies: ["Laravel", "Vue.js", "Docker", "CI/CD Pipelines", "AWS"],
    images: [wide("/projects/egphub.webp", "eGP Hub login page")],
  },
  {
    slug: "geysital",
    title: "Geysital – Smart Geyser Control App",
    role: "Senior Full-Stack Developer",
    description:
      "Smart geyser automation: a React Native app that controls a connected water heater over Bluetooth or Wi-Fi — live and target temperature, power, gas / electric / hybrid source priority and daily heating routines — backed by Node.js, MQTT and Embedded C firmware.",
    overview:
      "Geysital is a smart geyser automation system that modernizes traditional water heating by giving users complete control through a mobile app. The app connects to the geyser so people can monitor, control and automate heating without standing at the appliance.\n\nCore capabilities cover power, live temperature, target and range, gas / electric / hybrid source selection, source priority, routines, and dual connectivity over Bluetooth Low Energy and Wi-Fi.",
    impact: [
      "Turned a manual appliance into a connected one: users switch the geyser on and off from their phone with live connection status.",
      "Made heating visible — the current temperature sits next to the target (e.g. 29°C live vs a 45°C target), inside a safe 20–75°C range.",
      "Put energy choice in the user's hands with gas, electric and hybrid modes plus source priority.",
      "Added daily routines, e.g. 50°C electric at 6 AM, 45°C on gas at 7 PM, standby at 10 PM.",
      "Designed dual connectivity: nearby control over Bluetooth, and remote control over Wi-Fi through a Node.js + Express backend and MQTT.",
      "Made pairing clear: add by ID, scan, and helpful empty states instead of silent failures.",
    ],
    technologies: ["React Native", "Node.js", "Express", "MQTT", "Bluetooth LE", "Wi-Fi", "Embedded C"],
    images: [
      phone("/projects/geysital.webp", "Geysital control screen: full control at a glance"),
      { src: "/projects/geysital-cover.webp", alt: "Geysital case study cover: the app next to a connected geyser", width: 707, height: 1000 },
      phone("/projects/geysital-bluetooth.webp", "Geysital Bluetooth discovery: connected device"),
      phone("/projects/geysital-dashboard.webp", "Geysital dashboard: all your geysers in one place"),
      phone("/projects/geysital-setup.webp", "Geysital device setup: Wi-Fi or direct Bluetooth"),
    ],
    stats: [
      { value: "3", label: "Heating modes", detail: "Gas, Electric and Hybrid, with source priority." },
      { value: "2", label: "Connection paths", detail: "Bluetooth for nearby pairing, Wi-Fi + MQTT for remote." },
      { value: "6", label: "Core capabilities", detail: "Control, visibility, flexibility, efficiency, automation, connectivity." },
    ],
    caseStudy: {
      pdf: "/case-studies/geysital-case-study.pdf",
      problem: {
        intro:
          "Traditional geysers need manual operation and give little visibility into the heating process. Users walk to the appliance, check the water temperature by hand, and decide when to stop heating — inconvenient, and it can waste energy.",
        points: [
          "Manual ON/OFF at the appliance",
          "No live temperature on a phone",
          "Limited target temperature control",
          "Hard to choose Gas, Electric or Hybrid",
          "No routines around daily use",
          "Little feedback on device state",
        ],
      },
      approach: [
        { title: "Monitor", detail: "Live temperature, power, heating and connection status first." },
        { title: "Control", detail: "One-tap ON/OFF and a visible target temperature slider." },
        { title: "Configure", detail: "Gas, Electric or Hybrid, plus source priority and safe bounds." },
        { title: "Automate", detail: "Routines that heat around the day instead of every manual tap." },
      ],
      build: {
        intro:
          "Two complementary paths sit under the same app. Bluetooth is nearby and local; Wi-Fi carries the IoT path through the backend and MQTT. Both meet in Embedded C firmware on the geyser.",
        paths: [
          {
            title: "Nearby · Bluetooth LE",
            flow: "App → BLE → Geysital device",
            points: ["Scan and pair", "Device name, ID and signal strength", "Open the dashboard without the backend"],
          },
          {
            title: "Connected · Wi-Fi / MQTT",
            flow: "App → Backend → MQTT → Device",
            points: ["Remote-oriented control", "Node.js + Express APIs and device services", "Lightweight MQTT messaging to the device"],
          },
        ],
        stack: [
          { name: "React Native", role: "Cross-platform mobile app and UI" },
          { name: "Node.js + Express", role: "Backend APIs and device services" },
          { name: "BLE + MQTT", role: "Local radio and lightweight IoT messaging" },
          { name: "Embedded C", role: "Firmware: temperature, commands, heating, comms" },
        ],
      },
    },
  },
  {
    slug: "pella-nova",
    title: "Pella Nova – Personal Branding & AI Visibility",
    role: "Next.js Frontend Developer",
    description:
      "A personal-branding platform that helps executives and founders get found in search and AI answers. I worked on the redesign in Next.js and React — service and pricing pages, portfolio designs, forms and reusable UI components — with a focus on mobile responsiveness and performance.",
    overview:
      "Pella Nova is a professional personal-branding platform. It helps executives, entrepreneurs and professionals build structured online profiles, so they are easier to find in search engines and AI answers.\n\nI contributed to the redesign and frontend development in Next.js and React.",
    impact: [
      "Built responsive pages and reusable UI components for the redesign in Next.js and React.",
      "Implemented modern layouts for service sections, pricing packages, portfolio designs and forms.",
      "Made the site fully mobile-responsive.",
      "Delivered performance-focused frontend improvements.",
    ],
    technologies: ["Next.js", "React", "TypeScript", "JavaScript", "HTML5", "CSS3"],
    images: [wide("/projects/pella-nova.webp", "Pella Nova homepage")],
  },
  {
    slug: "repairdesk",
    title: "RepairDesk – SaaS POS for Repair Shops",
    role: "Full-Stack Developer",
    description:
      "A cloud platform repair shops run their day on — tickets, inventory, sales and operations. I shipped features across Laravel and Yii2 APIs, fixed production issues through root-cause analysis, and led the migration of legacy Vue 2 modules to Vue 3.",
    overview:
      "RepairDesk is a cloud-based SaaS platform that repair businesses use to run their day: tickets, point of sale, inventory, trade-ins and customer communication.\n\nI worked across the frontend (Vue.js, React.js) and backend (Laravel, Yii2) as a Full-Stack Developer.",
    impact: [
      "Resolved complex production issues through in-depth troubleshooting and root-cause analysis, improving platform stability before joining the feature team.",
      "Led the migration of legacy Vue 2 modules to Vue 3, improving performance and maintainability and keeping the frontend on a supported framework.",
      "Developed RESTful APIs in Laravel 8 and maintained and optimized existing Yii2 APIs for secure, scalable data exchange.",
    ],
    technologies: ["Laravel", "Yii2", "Vue.js", "JavaScript", "MySQL", "REST APIs"],
    images: [wide("/projects/repairdesk.webp", "RepairDesk homepage")],
  },
  {
    slug: "tabletab",
    title: "TableTab – Restaurant POS & Management Platform",
    role: "Senior Full-Stack Developer",
    description:
      "A multi-tenant restaurant platform combining POS, online ordering and back office. I designed the modular NestJS backend on PostgreSQL and Redis, built the customer and admin apps in Next.js, and own authentication, onboarding, tenant management, email workflows, realtime order tracking, an offline-capable POS, and the containerized production setup.",
    overview:
      "TableTab is a multi-tenant restaurant platform that brings the POS, online ordering and back office together in one product.\n\nI designed the modular NestJS backend on PostgreSQL and Redis, built the customer-facing and admin apps in Next.js and TypeScript, and set up the containerized production infrastructure.",
    impact: [
      "Designed a modular NestJS backend on PostgreSQL and Redis for many restaurants on one platform.",
      "Built realtime order tracking with Server-Sent Events, so guests and the kitchen see status changes instantly.",
      "Made the POS keep taking orders when the network drops, syncing them automatically once it's back.",
      "Implemented authentication, restaurant onboarding, tenant management and per-role permissions enforced on every endpoint.",
      "Set up email workflows and containerized production deployment on Hetzner behind Cloudflare.",
    ],
    technologies: ["NestJS", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Cloudflare", "Hetzner"],
    images: [wide("/projects/tabletab.webp", "TableTab login and QR dine-in ordering screen")],
  },
  {
    slug: "dr-nutrition",
    title: "Dr. Nutrition – Multi-Country E-commerce",
    role: "Senior Full-Stack Developer",
    description:
      "An international e-commerce platform for a health and nutrition retailer. I built checkout, payments, promotions, cart recovery, shipping and content features, integrated Tabby and Tamara buy-now-pay-later, added WhatsApp order updates, and created a page builder that lets marketing launch campaign pages without developers.",
    overview:
      "Dr. Nutrition runs an international e-commerce platform for health and nutrition products across multiple countries.\n\nI worked on customer-facing features and backend functionality for checkout, payments, promotions, cart recovery, order communication, shipping and content management.",
    impact: [
      "Built cart abandonment recovery, coupon and discount systems, and checkout flow optimizations to improve conversion rates.",
      "Integrated Tabby and Tamara buy-now-pay-later payments with secure, compliant processing across checkout flows.",
      "Designed WhatsApp notifications that give customers real-time order status updates after purchase.",
      "Created a custom page builder that lets non-technical teams launch event, promotion and campaign pages without developers.",
      "Built reusable React.js and Vue.js components backed by scalable backend services.",
    ],
    technologies: ["Laravel", "Vue.js", "React", "JavaScript", "MySQL", "Redis", "REST APIs"],
    images: [wide("/projects/dr-nutrition.webp", "Dr. Nutrition storefront")],
  },
  {
    slug: "laperva",
    title: "Laperva – Health & Nutrition E-commerce",
    role: "Senior Full-Stack Developer",
    description:
      "The online store for Laperva, a health and nutrition brand, built while at Dr. Nutrition. I worked on responsive product and content pages, backend integrations and site performance, using reusable components shared across the storefront.",
    overview:
      "Laperva is the online store of a health and nutrition brand. I contributed to its development and maintenance while working with Dr. Nutrition.",
    impact: [
      "Built responsive frontend functionality for product and content presentation.",
      "Worked on backend integrations for the storefront.",
      "Improved website performance.",
      "Built maintainable, reusable components shared across the store.",
    ],
    technologies: ["Laravel", "PHP", "Vue.js", "React", "JavaScript", "MySQL", "REST APIs"],
    images: [wide("/projects/laperva.webp", "Laperva storefront")],
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
      url: "https://www.linkedin.com/feed/update/urn:li:share:7509128354436984832",
      date: "Sep 25, 2026",
      text: "We recently set up our product as a monorepo. Our customer app, admin dashboard, backend and marketing site now all live in one repository. It wasn't an obvious choice at first, so I want to share why we did it and what we've learned along the way.\n\n**Why we chose it** — Most features touch more than one app. With separate repos, that meant 3 PRs, 3 reviews and a lot of \"which version works with which?\" With a monorepo, it's one PR and one review, and everything ships together.\n\n**What's been great** — shared code written once, atomic changes, easier onboarding, one setup.\n\n**What's been hard** — slow CI without smart caching, blurred boundaries, deploys that need care, and a repo that grows fast.\n\n**My take:** a monorepo isn't \"better.\" It's a trade-off. Choose the structure that fits your team, not the trend.",
      tags: ["SoftwareEngineering", "Monorepo", "SystemDesign", "WebDevelopment"],
    },
    {
      url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7507472101587464193",
      date: "Sep 20, 2026",
      text: "Completed my Claude Code certification. 🎓\n\nA great learning experience that gave me a better understanding of AI-assisted coding and development workflows. 💻\n\nLooking forward to putting this knowledge into practice. 🚀",
      tags: ["ClaudeCode", "AI", "SoftwareDevelopment", "Learning"],
      image: { src: "/linkedin/claude-code-certificate.webp", alt: "Claude Code in Action certificate of completion", width: 1000, height: 772 },
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
