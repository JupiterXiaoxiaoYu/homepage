// ── content model ─────────────────────────────────────────────────────────────
import { BASE_PATH } from "./site";

export const PROFILE = {
  name: "JUPITER YU",
  handle: "jupiterxiaoxiaoyu",
  tagline: "Engineer · Researcher · Founder",
  bio: "Building verifiable systems at the edge of AI and cryptography. Ecosystem Director at Delphinus Lab (zkWASM), MPhil in Data Science @ HKUST, Cognitive Science @ Edinburgh. 27× hackathon winner.",
  email: "jupiterxiaoxiaoyu@gmail.com",
  github: "https://github.com/JupiterXiaoxiaoYu",
  linkedin: "https://www.linkedin.com/in/jupiter-yu-0a7052aa/",
  resume: `${BASE_PATH}/Jupiter-YU-2026-05-07-FullStack-Resume.pdf`,
  location: "REMOTE / HK / UK",
  stats: [
    { k: "hackathon wins", v: "27+" },
    { k: "chains shipped on", v: "8" },
    { k: "retrieval scale", v: "1.36M posts" },
    { k: "query latency", v: "<100ms" },
  ],
};

export type Section = {
  id: string;
  label: string;
  index: string;
  title: string;
  blurb: string;
};

export const SECTIONS: Section[] = [
  { id: "origin", label: "ORIGIN", index: "00", title: "Jupiter Yu", blurb: "root node" },
  { id: "research", label: "RESEARCH", index: "01", title: "Research", blurb: "local-first retrieval over decentralized graphs" },
  { id: "work", label: "WORK", index: "02", title: "Experience", blurb: "protocols, startups, ecosystems" },
  { id: "projects", label: "PROJECTS", index: "03", title: "Selected Works", blurb: "16 shipped systems" },
  { id: "proof", label: "PROOF", index: "04", title: "Proof of Work", blurb: "27+ competition results" },
  { id: "contact", label: "CONTACT", index: "05", title: "Open Channel", blurb: "handshake protocol" },
];

// ── Research ──────────────────────────────────────────────────────────────────

export type Research = {
  id: string;
  title: string;
  venue: string;
  period: string;
  summary: string;
  metrics: { k: string; v: string }[];
  tags: string[];
};

export const RESEARCH: Research[] = [
  {
    id: "sovereign-rag",
    title: "Sovereign RAG",
    venue: "MPhil Thesis · HKUST",
    period: "2024 — 2026",
    summary:
      "Locality-aware, local-first retrieval over decentralized social networks. Designed a GMP (Generative Metapath Planning) query compiler and TAQ (Topology-Aware Quantization) index that exploit instance and community locality — retrieval that never leaves the graph it serves.",
    metrics: [
      { k: "accuracy", v: "79.3%" },
      { k: "latency", v: "<100ms" },
      { k: "corpus", v: "1.36M posts" },
      { k: "api cost", v: "$0" },
    ],
    tags: ["PyTorch", "Neo4j", "RAG", "Mastodon", "local-first"],
  },
  {
    id: "defi-formal",
    title: "Economic Security in DeFi",
    venue: "Undergraduate Thesis · U. Edinburgh",
    period: "2023 — 2024",
    summary:
      "Automated security analysis pipeline for DeFi smart contracts using the Certora Prover. Built extraction tooling for on-chain transaction patterns and wrote formal verification specs targeting economic vulnerabilities in token behavior.",
    metrics: [
      { k: "method", v: "formal verification" },
      { k: "tooling", v: "Certora" },
    ],
    tags: ["Certora", "Web3.js", "Python", "DeFi security"],
  },
];

// ── Experience ────────────────────────────────────────────────────────────────

export type Work = {
  id: string;
  role: string;
  org: string;
  backing?: string;
  period: string;
  points: string[];
  current?: boolean;
};

export const WORK: Work[] = [
  {
    id: "delphinus",
    role: "Ecosystem Director / DevRel Engineer",
    org: "Delphinus Lab",
    backing: "OKX Ventures · Binance Labs · Mirana",
    period: "2024.11 — now",
    current: true,
    points: [
      "Promoted to Ecosystem Director; leading ecosystem growth and developer community for zkWASM",
      "Maintaining 8+ ecosystem projects; built Staking, Solar, Prediction Market end-to-end",
      "Shipped Merkle-tree airdrop system and a Launchpad where off-chain ZK proofs trigger on-chain liquidity",
      "Built scaffolding framework, CLI tooling, and a fully automated K8s CI/CD platform",
    ],
  },
  {
    id: "2pm",
    role: "Co-Founder & CEO",
    org: "2PM.Network",
    backing: "Amber Group",
    period: "2024.05 — 2024.10",
    points: [
      "Privacy-AI startup on ZK/FHE data infrastructure; led product strategy and team",
      "Built frontend components; led investor pitches",
    ],
  },
  {
    id: "rosen",
    role: "Founding Engineer / Full-Stack",
    org: "Rosen Bridge",
    backing: "500 Global team · PayPal · Circle",
    period: "2022.08 — 2023.08",
    points: [
      "SocialFi/GameFi app on Solana — a mirrored virtual world over real-world addresses",
      "React Native + React for iOS/Android/Web; multi-chain wallet integration (Solana, BSC)",
    ],
  },
  {
    id: "1circle",
    role: "Full-Stack Engineer, Blockchain",
    org: "1Circle",
    backing: "Algorand Foundation",
    period: "2021.12 — 2022.12",
    points: [
      "TigerChi: 888 tiger NFTs, sold out; top-3 on Algorand",
      "Dynamic NFT systems on ARC-19/ARC-69; POAP badge app in Reach",
    ],
  },
  {
    id: "hashpunk",
    role: "Product & Project Manager",
    org: "HashPunk",
    period: "2021.09 — 2022.08",
    points: [
      "GameFi product lead under ex-Conflux ecosystem director",
      "Project backed by KuCoin Ventures, Chain Capital, K300",
    ],
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  name: string;
  hash: string; // decorative on-chain-style id
  role: string;
  year: string;
  summary: string;
  detail?: string;
  stack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "neurodaos",
    name: "NeuroDAOs",
    hash: "0xN3UR0",
    role: "Founder · Full-Stack",
    year: "2024",
    summary: "DeFi+DAO protocol that mimics neural-network decision making — composable collective intelligence for on-chain investment.",
    detail:
      "NeuroDAOs treats a DAO like a neural network: members act as neurons, proposals propagate like signals, and DeFi composability becomes the weight layer. Collective investment decisions emerge from the topology instead of a ballot box.",
    stack: ["React", "Sophia", "TypeScript"],
    links: [
      { label: "devpost", href: "https://devpost.com/software/neuraldaos" },
      { label: "deck", href: "https://gamma.app/docs/NeuroDAOs-A-Defi-DAO-Protocol-for-Collective-Investment-Decision--vbe3n7su7x2nwdm?mode=doc" },
    ],
    featured: true,
  },
  {
    id: "trustai",
    name: "TrustAI DAO",
    hash: "0x7RUST",
    role: "Founder · CEO · Tech Coach",
    year: "2023",
    summary: "AI-ethics auditing infrastructure — decentralized evaluation of AI content, datasets and safety, on-chain.",
    detail:
      "A DAO for trusted AI: content evaluation, ethical assessment tech and blockchain-based dataset construction, aimed at safety, fairness and interpretability of AI systems.",
    stack: ["Next.js", "Solidity", "Python", "Streamlit", "Thirdweb"],
    links: [{ label: "video", href: "https://youtu.be/F9ujMCNbbY4" }],
    featured: true,
  },
  {
    id: "rosen-app",
    name: "Rosen Bridge",
    hash: "0xR0S3N",
    role: "Founding Engineer",
    year: "2022",
    summary: "Social DApp implementing NFT/metaverse-as-a-service — a parallel world where lands map to real addresses.",
    detail:
      "Founded by the China team of 500 Global. Rosen Bridge is an intersection of real and virtual worlds: land on Rosen's planet is bound to real-world addresses, a mirrored world where web3 features are experienced smoothly.",
    stack: ["React Native", "TypeScript", "Solana"],
    links: [{ label: "site", href: "https://gorosen.xyz/" }],
    featured: true,
  },
  {
    id: "social-chain",
    name: "Social Chain",
    hash: "0xS0C1A",
    role: "Frontend Developer",
    year: "2023",
    summary: "Web3 social-graph protocol — creators own their connections; developers compose over a user-controlled graph.",
    stack: ["React", "Next.js", "Go", "TypeScript"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/socialchainapp" }],
    featured: true,
  },
  {
    id: "daily-lens",
    name: "Daily Lens",
    hash: "0xDA1LY",
    role: "Founder · Full-Stack",
    year: "2023",
    summary: "Attention-rewarded content subscriptions — creators reach users directly, no algorithmic intermediary.",
    stack: ["React", "GraphQL", "Solidity", "MongoDB"],
    links: [{ label: "site", href: "https://dailylens.social/" }],
  },
  {
    id: "martech3",
    name: "Martech3",
    hash: "0xMAR73",
    role: "Founder · Smart Contracts",
    year: "2023",
    summary: "First AIGC × Web3 precision-marketing platform — AI-powered targeting, content and analytics for web3-native enterprise.",
    stack: ["React", "Python", "GPT", "Thirdweb", "MongoDB"],
    links: [{ label: "github", href: "https://github.com/orgs/Martech3/repositories" }],
  },
  {
    id: "superfans",
    name: "SuperFans DAO",
    hash: "0x5UP3R",
    role: "Founder · Full-Stack",
    year: "2022",
    summary: "Influence- and event-driven DAO protocol — spin up a DAO with voting, NFT sales and member credentials in minutes.",
    stack: ["React", "Solidity", "Thirdweb"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/2022Q4-hackathon" }],
  },
  {
    id: "nft-similarity",
    name: "NFT Similarity Engine",
    hash: "0x51M1L",
    role: "Data Engineer",
    year: "2022",
    summary: "Clustering + ML pricing oracle for Algorand NFT marketplaces — N nearest NFTs with predicted prices from sales history.",
    detail:
      "Dual databases for listings and sales; a clustering algorithm retrieves N similar NFTs and a model predicts price from historical sales. Built for the AlgoSeas PIRATEs API.",
    stack: ["Python", "ML", "MongoDB"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/Algorand-NFT-Similarity-Service-In-Marketplace" }],
  },
  {
    id: "disaster-container",
    name: "Disaster Container",
    hash: "0xD15A5",
    role: "Smart Contract Engineer",
    year: "2021",
    summary: "Real-time disaster-data platform born from the 2021 Henan floods — REST APIs + transparent on-chain crowdfunding.",
    stack: ["Java", "SpringBoot", "Reach", "Conflux"],
    links: [{ label: "devpost", href: "https://devpost.com/software/group-62" }],
  },
  {
    id: "danmao",
    name: "Danmao Plan",
    hash: "0xCAT5",
    role: "Lead Developer",
    year: "2022",
    summary: "5,000 unique Fudan campus-cat avatars — NFTs jointly launched by Fudan's blockchain, stray-cat and painting societies.",
    stack: ["React", "Node.js", "TypeScript"],
    links: [{ label: "site", href: "https://www.danmao.xyz" }],
  },
  {
    id: "nft-ticket",
    name: "NFT Ticket System",
    hash: "0x71CK3",
    role: "Developer",
    year: "2022",
    summary: "ARC-0020 smart-ASA ticketing — royalties and role-based transfer rules enforced by the protocol itself.",
    stack: ["Python", "Pyteal", "Algorand"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/NFT_tickets_system_that_supports_royalties_and_role-based_transfer" }],
  },
  {
    id: "drone-delivery",
    name: "Drone Delivery Planner",
    hash: "0xDR0N3",
    role: "Backend Developer",
    year: "2021",
    summary: "Data-driven routing engine generating feasible drone delivery paths in real time.",
    stack: ["Java", "SpringBoot"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/ILP-CW" }],
  },
  {
    id: "antifraud",
    name: "Anti-Fraud Predictor",
    hash: "0xFRAUD",
    role: "Data Engineer",
    year: "2021",
    summary: "Click-fraud detection over ~500K simulated clicks — won 1st place in Baidu PaddlePaddle MarTech challenge.",
    stack: ["Python", "Deep Learning", "PaddlePaddle"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/BaiduCompetion1" }],
  },
  {
    id: "horoscope",
    name: "Horoscope DApp",
    hash: "0xH0R0",
    role: "Full-Stack",
    year: "2021",
    summary: "Oracle-generated personalized NFT metadata bridging horoscope culture between Web2 and Web3.",
    stack: ["React", "Reach", "Conflux"],
    links: [{ label: "demo", href: "https://reach-sh.github.io/cfx-demo-horoscope/" }],
  },
  {
    id: "yunda",
    name: "YunDa",
    hash: "0xYUND4",
    role: "Developer",
    year: "2023",
    summary: "Low-code AI decision-support engine — pattern discovery, anomaly detection and prediction for enterprise data.",
    stack: ["Python", "Streamlit"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/speech-app" }],
  },
];

// ── Awards / proof of work ────────────────────────────────────────────────────

export type Award = { year: string; event: string; result: string };

export const AWARDS: Award[] = [
  { year: "2026", event: "AVE CLAW Hackathon", result: "Champion" },
  { year: "2026", event: "HashKey Chain Horizon Hackathon", result: "2nd · DeFi Track" },
  { year: "2025", event: "15th ICBC Cup FinTech Innovation (Guangdong)", result: "First Prize" },
  { year: "2024", event: "Shenzhen International FinTechathon", result: "2nd · Blockchain" },
  { year: "2024", event: "MEME.ZKWASM() Hackathon", result: "2nd · Game Track" },
  { year: "2024", event: "Amber.ac BUIDL_QUESTS", result: "Finalist · Top 5" },
  { year: "2024", event: "NEAR [REDACTED] Hackathon", result: "ZettaBlock AI/Web3 Bounty" },
  { year: "2024", event: "ETH Shanghai Bethink", result: "Champion · Defending the System" },
  { year: "2024", event: "ETH Beijing — Scroll Track", result: "1st Place" },
  { year: "2024", event: "ETH Beijing — Public Goods", result: "2nd Place" },
  { year: "2024", event: "Decentralized AI Buildathon", result: "Finalist · zkPass Bounty" },
  { year: "2024", event: "BeWater AI Crypto Hackathon", result: "1st · Security & Privacy" },
  { year: "2024", event: "OnePiece × 0G × CAMP AI+Web3", result: "Track Prize · 4th" },
  { year: "2023", event: "DAO-Fi Fusion Code Challenge", result: "2nd · Best Tech + Community" },
  { year: "2023", event: "EduDAO Hackathon — Mantle Track", result: "Best NFT/Gaming" },
  { year: "2023", event: "Cosmos Chinese Developer Hackathon", result: "1st Place" },
  { year: "2022", event: "Algorand Green House Hack 2 — ARC-0020", result: "Champion" },
  { year: "2022", event: "Algorand Green House Hack 2 — Similarity Svc", result: "Champion" },
  { year: "2022", event: "Algorand Green House Hack 1 — SoulBound NFT", result: "Champion" },
  { year: "2022", event: "LianFang Cup Blockchain Economy", result: "3rd Prize" },
  { year: "2022", event: "YRDA Data Open Innovation — Fin Security", result: "2nd Prize" },
  { year: "2022", event: "OpenMPC Privacy Computing Competition", result: "Winning Prize" },
  { year: "2021", event: "MoleHack — NFT 2.0", result: "Promising + Bronze Mole" },
  { year: "2021", event: "Conflux Beidou Entrepreneurship Camp", result: "3rd Prize" },
  { year: "2021", event: "Reach on Conflux Bounty Hack", result: "Champion" },
  { year: "2021", event: "Unihack Conflux", result: "Enterprise Award" },
  { year: "2021", event: "Huawei College Blockchain Competition", result: "Distinction" },
  { year: "2021", event: "Huawei Cloud Cup National AI Contest", result: "Winning Prize" },
  { year: "2021", event: "Deloitte Digital Difference Camp", result: "Top 10" },
  { year: "2021", event: "PaddlePaddle MarTech Anti-Fraud", result: "1st Place" },
];

// ── Education & certs ─────────────────────────────────────────────────────────

export const EDUCATION = [
  { school: "HKUST (GZ)", degree: "MPhil · Data Science & Analytics", period: "2024 — 2026" },
  { school: "U. of Edinburgh", degree: "MA Cognitive Science · First Class Honours", period: "2020 — 2024" },
  { school: "Fudan University", degree: "Exchange · Computer Science", period: "2022 — 2023" },
];

export const CERTS =
  "Neuromatch CompNeuro · MIIT Blockchain Ops/Infra/App ×3 · T-lab VC · Encode Solidity";

// ── Skills as capability clusters ─────────────────────────────────────────────

export const SKILLS: { label: string; items: string[] }[] = [
  { label: "language", items: ["Rust", "TypeScript", "Python", "Solidity", "Go", "Java", "R", "Haskell"] },
  { label: "frontier", items: ["zkWASM", "ZK proofs", "FHE", "Smart contracts", "DeFi", "Tokenomics"] },
  { label: "web", items: ["React", "Next.js", "React Native", "Node.js", "GraphQL", "Tailwind"] },
  { label: "mind", items: ["PyTorch", "TensorFlow", "RAG", "Neo4j", "Cognitive Science"] },
  { label: "infra", items: ["AWS", "Kubernetes", "Docker", "CI/CD", "MongoDB", "PostgreSQL", "Redis"] },
];
