/* ============================================================
   PROJECTS
   ------------------------------------------------------------
   To add a project:
   1. Put its cover image in src/assets/projects/ (any size; a
      16:10 or 4:3 landscape screenshot at 1600px+ wide looks best).
   2. Import it below and add an object to `projects`.
   3. Order matters: the list renders top to bottom. Set
      `featured: true` on the ones you want on the home page
      (4 or 6 keeps the grid even).

   Fields (only slug, name, summary and cover are required):
     slug        url part: /project/<slug>
     name        project name
     summary     one sentence shown on cards (keep under ~110 chars)
     category    e.g. 'Web app', 'Mobile app', 'Website', 'E-commerce'
     year        e.g. '2025'
     role        e.g. 'Design and full-stack build'
     cover       imported image
     liveUrl     link to the live product
     repoUrl     link to the source code
     stack       ['React', 'Node.js', ...]
     description array of paragraphs for the detail page
     gallery     extra screenshots (imported images) for the detail page
     featured    true to show on the home page
   ============================================================ */

import Dashboard from '../dashboard.png';
import Furniture from '../furniture.png';
import Carelynk from '../carelynk.png';
import Rydexo from '../rydexo.png';
import RentXSpace from '../rentxspace.png';
import SwapAm from '../swapam.png';
import CareerMan from '../career.png';
import QrGenerator from '../eleventh.png';
import EmeyoShop from '../emayoShop.png';
import CoachSeyifunmi from '../coach.png';
import EmayoPortfolio from '../emayo.png';

export const projects = [
  {
    slug: 'staffium',
    name: 'Staffium',
    summary: 'HR dashboard for staff records, attendance, tasks and payroll summaries.',
    category: 'Web app',
    cover: Dashboard,
    liveUrl: 'https://stafflo.vercel.app/',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    description: [
      'Staffium is an HR dashboard built to streamline employee management. It brings real-time analytics, team performance tracking and staff records into one interface designed for fast decisions.',
      'Admins manage attendance, payroll summaries, tasks and departments from a single responsive dashboard, while staff get their own portal.',
    ],
    featured: true,
  },
  {
    slug: 'carelynk',
    name: 'Carelynk',
    summary: 'Healthcare platform for booking appointments and messaging doctors.',
    category: 'Web app',
    cover: Carelynk,
    liveUrl: 'https://carelynk.vercel.app/',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    description: [
      'Carelynk connects patients with healthcare providers. It offers appointment scheduling, access to medical records and real-time messaging.',
      'The interface uses calm colours and a clear information hierarchy to reduce friction in healthcare interactions, with accessibility treated as a requirement.',
    ],
    featured: true,
  },
  {
    slug: 'rydexo',
    name: 'Rydexo',
    summary: 'Car rental and ride booking with pricing, specs and live availability.',
    category: 'Mobile app',
    cover: Rydexo,
    liveUrl: 'https://rydexo.vercel.app/',
    stack: ['React Native', 'Node.js', 'Google Maps API', 'MongoDB'],
    description: [
      'Rydexo connects riders with drivers and rental cars. It features real-time tracking, fare estimates, route optimisation and driver ratings.',
      'The map-centred interface lets people book quickly while keeping every trip and vehicle detail in view.',
    ],
    featured: true,
  },
  {
    slug: 'furniture',
    name: 'Furniture store',
    summary: 'Online furniture shop with filters, wishlist, cart and Stripe checkout.',
    category: 'E-commerce',
    cover: Furniture,
    liveUrl: 'https://furniture-beryl-seven.vercel.app/',
    stack: ['React', 'SCSS', 'Firebase', 'Stripe'],
    description: [
      'A furniture store focused on clear product presentation and a short path to checkout. Generous whitespace lets each piece stand out.',
      'Shoppers filter by category, material, price and stock, save items to a wishlist and pay through a streamlined Stripe checkout.',
    ],
    featured: true,
  },
  {
    slug: 'rentxspace',
    name: 'RentXSpace',
    summary: 'Rental marketplace where hosts list spaces and tenants book and pay.',
    category: 'Web app',
    cover: RentXSpace,
    liveUrl: 'https://rentxspace.vercel.app/',
    stack: ['Next.js', 'Sass', 'MongoDB', 'Clerk', 'Stripe'],
    description: [
      'RentXSpace simplifies finding and renting spaces, with listing search, booking management and secure payments.',
      'Hosts list spaces and track bookings from their dashboard, while tenants move from search to payment in a few steps.',
    ],
    featured: true,
  },
  {
    slug: 'swapam',
    name: 'SwapAm',
    summary: 'Peer-to-peer marketplace for swapping items with people nearby.',
    category: 'Web app',
    cover: SwapAm,
    liveUrl: 'https://swap-am-mauve.vercel.app/',
    stack: ['React', 'Express.js', 'MongoDB', 'WebSockets'],
    description: [
      'SwapAm lets people list items they no longer need and swap them with others in their area.',
      'It includes chat, user ratings, matching and item condition checks so trades stay safe and trustworthy.',
    ],
    featured: true,
  },
  {
    slug: 'careerman',
    name: 'CareerMan',
    summary: 'Job application tracker with resume versions and AI mock interviews.',
    category: 'Web app',
    cover: CareerMan,
    liveUrl: 'https://careerman.vercel.app/',
    stack: ['React', 'Firebase', 'Tailwind CSS', 'OpenAI API'],
    description: [
      'CareerMan helps job seekers manage their pipeline: applications, resume versions, interviews and AI-powered mock interview practice.',
      'A board layout keeps dozens of applications easy to follow from first send to offer.',
    ],
  },
  {
    slug: 'qr-generator',
    name: 'Event QR generator',
    summary: 'Generates and validates QR entry tickets for events, in bulk.',
    category: 'Web app',
    cover: QrGenerator,
    liveUrl: 'https://qr-code-generator-sandy-eight.vercel.app/',
    stack: ['React', 'Canvas API', 'Node.js', 'QRCode.js'],
    description: [
      'A tool for event organisers to generate unique QR codes for entry tickets, in bulk, and send them by email.',
      'On the day, codes are checked with a phone scanner, so large events can verify entry in seconds.',
    ],
  },
  {
    slug: 'emeyo-shop',
    name: 'Emeyo Trend Wears',
    summary: 'Fashion store with lookbook galleries and Paystack checkout.',
    category: 'E-commerce',
    cover: EmeyoShop,
    liveUrl: 'https://emayotrendwears.com/',
    stack: ['React', 'SCSS', 'Paystack', 'Cloudinary'],
    description: [
      'Emeyo Trend Wears is a fashion store with lookbook-style product galleries for the latest clothing and accessories.',
      'Images load lazily and checkout is built mobile first, so the store stays fast on any connection.',
    ],
  },
  {
    slug: 'coach-seyifunmi',
    name: 'Coach Seyifunmi',
    summary: 'Personal brand site for a coach, with services and session booking.',
    category: 'Website',
    cover: CoachSeyifunmi,
    liveUrl: 'https://coachseyifunmi.com/',
    stack: ['React', 'SCSS', 'Framer Motion', 'Calendly API'],
    description: [
      'A personal brand website for Coach Seyifunmi that presents coaching services and client stories in a clean editorial layout.',
      'Visitors can read about each service and schedule a session from any device.',
    ],
  },
  {
    slug: 'emayo-portfolio',
    name: 'Emayo portfolio',
    summary: 'Gallery-led portfolio for a designer, with case study pages.',
    category: 'Website',
    cover: EmayoPortfolio,
    liveUrl: 'https://emmanuel.emayotrendwears.com/',
    stack: ['React', 'SCSS', 'Framer Motion', 'GSAP'],
    description: [
      'A portfolio for Emayo that presents design work through a curated project grid and case study pages.',
      'Scroll-driven animation and careful typography tell the story behind each project.',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
