import Dashboard from '../../assets/dashboard.png';
import Furniture from '../../assets/furniture.png';
import Carelynk from '../../assets/carelynk.png';
import Rydexo from '../../assets/rydexo.png';
import RentXSpace from '../../assets/rentxspace.png';
import SwapAm from '../../assets/swapam.png';

import CareerMan from '../../assets/career.png';
import QrGenerator from '../../assets/eleventh.png';
import EmeyoShop from '../../assets/emayoShop.png';
import CoachSeyifunmi from '../../assets/coach.png';
import EmayoPortfolio from '../../assets/emayo.png';

// ============================================
//  FULL PROJECT DATA (used by detail pages)
// ============================================

export const allProjects = [
  {
    id: 't1',
    slug: 'staffium',
    name: 'Staffium',
    img: Dashboard,
    liveUrl: 'https://stafflo.vercel.app/',
    description:
      'Staffium is a modern HR dashboard built to streamline employee management workflows. It features real-time analytics, team performance tracking, and an intuitive interface designed for fast decision-making.\n\nThe platform provides comprehensive tools for managing staff records, attendance, payroll summaries, and departmental overviews — all within a clean, responsive dashboard experience.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    screenshots: [Dashboard, Dashboard, Dashboard, Dashboard],
  },
  {
    id: 't2',
    slug: 'furniture',
    name: 'Furniture eCommerce',
    img: Furniture,
    liveUrl: 'https://furniture-beryl-seven.vercel.app/',
    description:
      'A premium furniture eCommerce platform designed with a focus on elegant product presentation and seamless shopping experiences. The interface uses warm tones and generous whitespace to let each furniture piece shine.\n\nBuilt with a headless architecture, the store features advanced filtering, wishlist functionality, cart management, and a streamlined checkout process optimized for conversions.',
    techStack: ['React', 'SCSS', 'Firebase', 'Stripe'],
    screenshots: [Furniture, Furniture, Furniture],
  },
  {
    id: 't3',
    slug: 'carelynk',
    name: 'Carelynk',
    img: Carelynk,
    liveUrl: 'https://carelynk.vercel.app/',
    description:
      'Carelynk is a healthcare connectivity platform that bridges the gap between patients and healthcare providers. It offers appointment scheduling, medical records access, and real-time communication tools.\n\nDesigned with accessibility and trust at its core, the interface uses calming colors and clear information hierarchy to reduce friction in healthcare interactions.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io'],
    screenshots: [Carelynk, Carelynk, Carelynk],
  },
  {
    id: 't4',
    slug: 'rydexo',
    name: 'Rydexo',
    img: Rydexo,
    liveUrl: 'https://rydexo.vercel.app/',
    description:
      'Rydexo is a ride-sharing and logistics platform that connects riders with drivers efficiently. The app features real-time tracking, fare estimation, route optimization, and a driver rating system.\n\nThe clean, map-centric UI ensures users can book rides quickly while having full visibility into their journey details and driver information.',
    techStack: ['React Native', 'Node.js', 'Google Maps API', 'MongoDB'],
    screenshots: [Rydexo, Rydexo, Rydexo],
  },
  {
    id: 't5',
    slug: 'rentxspace',
    name: 'RentXSpace',
    img: RentXSpace,
    liveUrl: 'https://rentxspace.vercel.app/',
    description:
      'RentXSpace is a property rental marketplace that simplifies the process of finding and renting spaces. It provides listings search, virtual tours, booking management, and secure payment processing.\n\nThe user-centric dashboard allows hosts to list their spaces effortlessly and track bookings, while tenants enjoy a smooth search-to-payment journey.',
    techStack: ['Next.js', 'Sass', 'MongoDB', 'Clerk', 'Stripe'],
    screenshots: [RentXSpace, RentXSpace, RentXSpace],
  },
  {
    id: 't6',
    slug: 'swapam',
    name: 'SwapAm',
    img: SwapAm,
    liveUrl: 'https://swap-am-mauve.vercel.app/',
    description:
      'SwapAm is a peer-to-peer item swapping marketplace that encourages sustainable consumer habits. Users can list items they no longer need and request swaps with others in their local area.\n\nFeatures include chat messaging, user ratings, matching algorithms, and item condition verification to ensure secure and trustworthy trades.',
    techStack: ['React', 'Express.js', 'MongoDB', 'WebSockets'],
    screenshots: [SwapAm, SwapAm, SwapAm],
  },
  {
    id: 'b1',
    slug: 'careerman',
    name: 'CareerMan',
    img: CareerMan,
    liveUrl: 'https://careerman.vercel.app/',
    description:
      'CareerMan is a job application tracker and career management tool for professionals. It helps users manage their job search pipeline, store resume versions, track interviews, and prepare with AI-powered mock interviews.\n\nIts visual board layout makes tracking dozens of applications simple, keeping applicants organized and confident throughout their job search journey.',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'OpenAI API'],
    screenshots: [CareerMan, CareerMan, CareerMan],
  },
  {
    id: 'b2',
    slug: 'qr-generator',
    name: 'Event QR Code Generator',
    img: QrGenerator,
    liveUrl: 'https://qr-code-generator-sandy-eight.vercel.app/',
    description:
      'Event QR Code Generator is a utility tool that allows event organizers to generate and distribute unique QR codes for entry tickets. It features bulk generation, email delivery, and checking validation via mobile scanner.\n\nThe simple interface is designed for speed and reliability, supporting large-scale ticket generation and instant verification on event day.',
    techStack: ['React', 'Canvas API', 'Node.js', 'QRCode.js'],
    screenshots: [QrGenerator, QrGenerator, QrGenerator],
  },
  {
    id: 'b3',
    slug: 'emeyo-shop',
    name: 'Emeyo Trend Wears',
    img: EmeyoShop,
    liveUrl: 'https://emayotrendwears.com/',
    description:
      'Emeyo Trend Wears is a fashion eCommerce store featuring the latest trends in clothing and accessories. The shop delivers a visually rich browsing experience with lookbook-style product galleries.\n\nBuilt with performance in mind, the store features lazy-loaded images, smooth page transitions, and a mobile-first checkout flow designed to maximize conversions.',
    techStack: ['React', 'SCSS', 'Paystack', 'Cloudinary'],
    screenshots: [EmeyoShop, EmeyoShop, EmeyoShop],
  },
  {
    id: 'b4',
    slug: 'coach-seyifunmi',
    name: 'Coach Seyifunmi',
    img: CoachSeyifunmi,
    liveUrl: 'https://coachseyifunmi.com/',
    description:
      'A personal branding website for Coach Seyifunmi, designed to showcase coaching services, client testimonials, and booking capabilities. The site emphasizes trust and professionalism through a clean, editorial layout.\n\nThe responsive design ensures potential clients can easily navigate services, read success stories, and schedule sessions from any device.',
    techStack: ['React', 'SCSS', 'Framer Motion', 'Calendly API'],
    screenshots: [CoachSeyifunmi, CoachSeyifunmi, CoachSeyifunmi],
  },
  {
    id: 'b5',
    slug: 'emayo-portfolio',
    name: 'Emayo Portfolio',
    img: EmayoPortfolio,
    liveUrl: 'https://emmanuel.emayotrendwears.com/',
    description:
      'A creative portfolio website designed for Emayo, showcasing design work and creative projects through an immersive, gallery-driven experience.\n\nThe portfolio features smooth scroll-driven animations, a curated project grid, and case study pages that tell the story behind each project with rich visuals and thoughtful typography.',
    techStack: ['React', 'SCSS', 'Framer Motion', 'GSAP'],
    screenshots: [EmayoPortfolio, EmayoPortfolio, EmayoPortfolio],
  },
];

export const topRowWorks = allProjects.filter((p) =>
  ['t1', 't2', 't3', 't4', 't5', 't6'].includes(p.id),
);

export const bottomRowWorks = [
  ...allProjects.filter((p) => ['b1', 'b2', 'b3', 'b4', 'b5'].includes(p.id)),
  { ...allProjects.find((p) => p.slug === 'rentxspace'), id: 'b6' },
];

export const getProjectBySlug = (slug) =>
  allProjects.find((p) => p.slug === slug);

export const getNextProject = (slug) => {
  const index = allProjects.findIndex((p) => p.slug === slug);
  if (index === -1) return allProjects[0];
  return allProjects[(index + 1) % allProjects.length];
};
