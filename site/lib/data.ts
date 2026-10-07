// ── content model ─────────────────────────────────────────────────────────────
import { BASE_PATH } from "./site";

export type Lang = "en" | "zh";

export const PROFILE = {
  name: "Jupiter Yu",
  handle: "jupiterxiaoxiaoyu",
  tagline: "Engineer · Researcher · Founder",
  bio: "Building verifiable systems at the edge of AI and cryptography. Ecosystem Director at Delphinus Lab (zkWASM), MPhil in Data Science @ HKUST, Cognitive Science @ Edinburgh. 27× hackathon winner.",
  positioning: {
    en: "I build AI systems and on-chain products — from research to shipped.",
    zh: "从研究到上线，独立构建 AI 系统与链上产品。",
  },
  zh: {
    bio: "在 AI 与密码学的交界处构建可验证系统。Delphinus Lab（zkWASM）生态总监，香港科技大学数据科学 MPhil，爱丁堡大学认知科学本科。27 次黑客松冠军。",
    tagline: "工程师 · 研究员 · 创业者",
  },
  email: "jupiterxiaoxiaoyu@gmail.com",
  github: "https://github.com/JupiterXiaoxiaoYu",
  linkedin: "https://www.linkedin.com/in/jupiter-yu-0a7052aa/",
  resume: `${BASE_PATH}/Jupiter-YU-2026-05-07-FullStack-Resume.pdf`,
  location: "REMOTE / HK / UK",
  stats: [
    { k: "hackathon wins", v: "27+" },
    { k: "chains shipped on", v: "8" },
    { k: "posts indexed", v: "1.36M" },
    { k: "query latency", v: "<100ms" },
  ],
};

// ── Research ──────────────────────────────────────────────────────────────────

export type Research = {
  id: string;
  title: string;
  venue: string;
  period: string;
  summary: string;
  metrics: { k: string; v: string }[];
  tags: string[];
  zh?: { title?: string; summary?: string };
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
    zh: {
      title: "Sovereign RAG",
      summary:
        "面向去中心化社交网络的局部性感知、本地优先检索系统。设计 GMP（生成式元路径规划）查询编译器与 TAQ（拓扑感知量化）索引，利用实例与社区局部性——检索永不离开它所服务的图。",
    },
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
    zh: {
      title: "DeFi 经济安全",
      summary:
        "基于 Certora Prover 的 DeFi 智能合约自动化安全分析流水线。构建链上交易模式提取工具，并编写针对代币行为中经济漏洞的形式化验证规范。",
    },
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
  zh?: { role?: string; points?: string[] };
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
    zh: {
      role: "生态总监 / DevRel 工程师",
      points: [
        "晋升为生态总监，负责 zkWASM 生态增长与开发者社区",
        "维护 8+ 生态项目；端到端构建 Staking、Solar、预测市场",
        "上线 Merkle 树空投系统，以及由链下 ZK 证明触发链上流动性的 Launchpad",
        "搭建脚手架框架、CLI 工具链与全自动 K8s CI/CD 平台",
      ],
    },
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
    zh: {
      role: "联合创始人 & CEO",
      points: [
        "基于 ZK/FHE 数据基础设施的隐私 AI 创业；主导产品战略与团队",
        "构建前端组件；主导投资人路演",
      ],
    },
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
    zh: {
      role: "创始工程师 / 全栈",
      points: [
        "Solana 上的 SocialFi/GameFi 应用——映射真实地址的镜像虚拟世界",
        "React Native + React 覆盖 iOS/Android/Web；多链钱包集成（Solana、BSC）",
      ],
    },
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
    zh: {
      role: "区块链全栈工程师",
      points: [
        "TigerChi：888 枚老虎 NFT 售罄，Algorand 前三",
        "ARC-19/ARC-69 动态 NFT 系统；Reach 编写的 POAP 徽章应用",
      ],
    },
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
    zh: {
      role: "产品 & 项目经理",
      points: [
        "在前 Conflux 生态总监麾下负责 GameFi 产品",
        "项目获 KuCoin Ventures、Chain Capital、K300 支持",
      ],
    },
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────

export type Category = "ai" | "web3" | "research" | "hackathon";

export type Project = {
  id: string;
  name: string;
  hash: string; // decorative on-chain-style id
  role: string;
  year: string;
  category: Category[];
  summary: string;
  impact?: string; // one-line factual result for cards
  detail?: string;
  stack: string[];
  links: { label: string; href: string }[];
  cover?: string; // e.g. "/work/<id>/cover.jpg" — real media later
  video?: string; // optional mp4 loop
  featured?: boolean;
  zh?: {
    name?: string;
    role?: string;
    summary?: string;
    detail?: string;
    impact?: string;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "sovereign-rag",
    name: "Sovereign RAG",
    hash: "0x50VRGN",
    role: "MPhil Researcher · HKUST",
    year: "2026",
    category: ["ai", "research"],
    summary:
      "Local-first retrieval over decentralized social graphs — a GMP query compiler and TAQ index that exploit community locality.",
    impact: "79.3% accuracy · <100ms · 1.36M posts · $0 API cost",
    detail:
      "Locality-aware, local-first retrieval over decentralized social networks. Designed a GMP (Generative Metapath Planning) query compiler and TAQ (Topology-Aware Quantization) index that exploit instance and community locality — retrieval that never leaves the graph it serves.",
    stack: ["PyTorch", "Neo4j", "RAG", "Mastodon", "local-first"],
    links: [],
    zh: {
      role: "MPhil 研究员 · 香港科技大学",
      summary:
        "面向去中心化社交图谱的本地优先检索——利用社区局部性的 GMP 查询编译器与 TAQ 索引。",
      impact: "79.3% 准确率 · <100ms · 136 万帖子 · API 成本 $0",
      detail:
        "面向去中心化社交网络的局部性感知、本地优先检索系统。设计 GMP（生成式元路径规划）查询编译器与 TAQ（拓扑感知量化）索引，利用实例与社区局部性——检索永不离开它所服务的图。",
    },
  },
  {
    id: "neurodaos",
    name: "NeuroDAOs",
    hash: "0xN3UR0",
    role: "Founder · Full-Stack",
    year: "2024",
    category: ["web3", "hackathon"],
    summary:
      "DeFi+DAO protocol that mimics neural-network decision making — composable collective intelligence for on-chain investment.",
    detail:
      "NeuroDAOs treats a DAO like a neural network: members act as neurons, proposals propagate like signals, and DeFi composability becomes the weight layer. Collective investment decisions emerge from the topology instead of a ballot box.",
    stack: ["React", "Sophia", "TypeScript"],
    links: [
      { label: "devpost", href: "https://devpost.com/software/neuraldaos" },
      { label: "deck", href: "https://gamma.app/docs/NeuroDAOs-A-Defi-DAO-Protocol-for-Collective-Investment-Decision--vbe3n7su7x2nwdm?mode=doc" },
    ],
    zh: {
      role: "创始人 · 全栈",
      summary:
        "模拟神经网络决策的 DeFi+DAO 协议——面向链上投资的可组合集体智能。",
      detail:
        "NeuroDAOs 将 DAO 视作神经网络：成员是神经元，提案如信号般传播，DeFi 可组合性成为权重层。集体投资决策从拓扑结构中涌现，而非票箱。",
    },
  },
  {
    id: "trustai",
    name: "TrustAI DAO",
    hash: "0x7RUST",
    role: "Founder · CEO · Tech Coach",
    year: "2023",
    category: ["ai", "web3"],
    summary:
      "AI-ethics auditing infrastructure — decentralized evaluation of AI content, datasets and safety, on-chain.",
    detail:
      "A DAO for trusted AI: content evaluation, ethical assessment tech and blockchain-based dataset construction, aimed at safety, fairness and interpretability of AI systems.",
    stack: ["Next.js", "Solidity", "Python", "Streamlit", "Thirdweb"],
    links: [{ label: "video", href: "https://youtu.be/F9ujMCNbbY4" }],
    zh: {
      role: "创始人 · CEO · 技术教练",
      summary: "AI 伦理审计基础设施——在链上对 AI 内容、数据集与安全性进行去中心化评估。",
      detail:
        "可信 AI 的 DAO：内容评估、伦理评估技术与基于区块链的数据集构建，面向 AI 系统的安全、公平与可解释性。",
    },
  },
  {
    id: "rosen-app",
    name: "Rosen Bridge",
    hash: "0xR0S3N",
    role: "Founding Engineer",
    year: "2022",
    category: ["web3"],
    summary:
      "Social DApp implementing NFT/metaverse-as-a-service — a parallel world where lands map to real addresses.",
    detail:
      "Founded by the China team of 500 Global. Rosen Bridge is an intersection of real and virtual worlds: land on Rosen's planet is bound to real-world addresses, a mirrored world where web3 features are experienced smoothly.",
    stack: ["React Native", "TypeScript", "Solana"],
    links: [{ label: "site", href: "https://gorosen.xyz/" }],
    zh: {
      role: "创始工程师",
      summary: "NFT/元宇宙即服务的社交 DApp——土地映射真实地址的平行世界。",
      detail:
        "由 500 Global 中国团队创立。Rosen Bridge 是真实与虚拟世界的交汇：Rosen 星球上的土地绑定真实地址，一个让 web3 体验顺畅发生的镜像世界。",
    },
  },
  {
    id: "social-chain",
    name: "Social Chain",
    hash: "0xS0C1A",
    role: "Frontend Developer",
    year: "2023",
    category: ["web3"],
    summary:
      "Web3 social-graph protocol — creators own their connections; developers compose over a user-controlled graph.",
    stack: ["React", "Next.js", "Go", "TypeScript"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/socialchainapp" }],
    zh: {
      role: "前端开发",
      summary: "Web3 社交图谱协议——创作者拥有自己的连接，开发者在用户掌控的图谱上组合创新。",
    },
  },
  {
    id: "daily-lens",
    name: "Daily Lens",
    hash: "0xDA1LY",
    role: "Founder · Full-Stack",
    year: "2023",
    category: ["web3"],
    summary:
      "Attention-rewarded content subscriptions — creators reach users directly, no algorithmic intermediary.",
    stack: ["React", "GraphQL", "Solidity", "MongoDB"],
    links: [{ label: "site", href: "https://dailylens.social/" }],
    zh: {
      role: "创始人 · 全栈",
      summary: "注意力激励的内容订阅——创作者直接触达用户，无算法中介。",
    },
  },
  {
    id: "martech3",
    name: "Martech3",
    hash: "0xMAR73",
    role: "Founder · Smart Contracts",
    year: "2023",
    category: ["ai", "web3"],
    summary:
      "First AIGC × Web3 precision-marketing platform — AI-powered targeting, content and analytics for web3-native enterprise.",
    stack: ["React", "Python", "GPT", "Thirdweb", "MongoDB"],
    links: [{ label: "github", href: "https://github.com/orgs/Martech3/repositories" }],
    zh: {
      role: "创始人 · 智能合约",
      summary: "首个 AIGC × Web3 精准营销平台——为 web3 原生企业提供 AI 驱动的投放、内容与分析。",
    },
  },
  {
    id: "superfans",
    name: "SuperFans DAO",
    hash: "0x5UP3R",
    role: "Founder · Full-Stack",
    year: "2022",
    category: ["web3", "hackathon"],
    summary:
      "Influence- and event-driven DAO protocol — spin up a DAO with voting, NFT sales and member credentials in minutes.",
    stack: ["React", "Solidity", "Thirdweb"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/2022Q4-hackathon" }],
    zh: {
      role: "创始人 · 全栈",
      summary: "影响力与事件驱动的 DAO 协议——几分钟内启动带投票、NFT 销售与成员凭证的 DAO。",
    },
  },
  {
    id: "nft-similarity",
    name: "NFT Similarity Engine",
    hash: "0x51M1L",
    role: "Data Engineer",
    year: "2022",
    category: ["ai", "web3", "hackathon"],
    summary:
      "Clustering + ML pricing oracle for Algorand NFT marketplaces — N nearest NFTs with predicted prices from sales history.",
    impact: "Champion · Algorand Green House Hack 2",
    detail:
      "Dual databases for listings and sales; a clustering algorithm retrieves N similar NFTs and a model predicts price from historical sales. Built for the AlgoSeas PIRATEs API.",
    stack: ["Python", "ML", "MongoDB"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/Algorand-NFT-Similarity-Service-In-Marketplace" }],
    zh: {
      name: "NFT 相似度引擎",
      role: "数据工程师",
      summary: "面向 Algorand NFT 市场的聚类 + ML 定价预言机——基于销售历史返回 N 个最相似 NFT 与预测价格。",
      impact: "冠军 · Algorand Green House Hack 2",
      detail:
        "挂单与销售双数据库；聚类算法检索 N 个相似 NFT，模型基于历史销售预测价格。为 AlgoSeas PIRATEs API 构建。",
    },
  },
  {
    id: "disaster-container",
    name: "Disaster Container",
    hash: "0xD15A5",
    role: "Smart Contract Engineer",
    year: "2021",
    category: ["web3", "hackathon"],
    summary:
      "Real-time disaster-data platform born from the 2021 Henan floods — REST APIs + transparent on-chain crowdfunding.",
    stack: ["Java", "SpringBoot", "Reach", "Conflux"],
    links: [{ label: "devpost", href: "https://devpost.com/software/group-62" }],
    zh: {
      role: "智能合约工程师",
      summary: "诞生于 2021 河南洪灾的实时灾情数据平台——REST API + 透明链上众筹。",
    },
  },
  {
    id: "danmao",
    name: "Danmao Plan",
    hash: "0xCAT5",
    role: "Lead Developer",
    year: "2022",
    category: ["web3"],
    summary:
      "5,000 unique Fudan campus-cat avatars — NFTs jointly launched by Fudan's blockchain, stray-cat and painting societies.",
    stack: ["React", "Node.js", "TypeScript"],
    links: [{ label: "site", href: "https://www.danmao.xyz" }],
    zh: {
      name: "旦猫计划",
      role: "主开发者",
      summary: "5000 个独特的复旦校园猫头像——由复旦区块链协会、流浪猫社团与绘画社团联合发行的 NFT。",
    },
  },
  {
    id: "nft-ticket",
    name: "NFT Ticket System",
    hash: "0x71CK3",
    role: "Developer",
    year: "2022",
    category: ["web3", "hackathon"],
    summary:
      "ARC-0020 smart-ASA ticketing — royalties and role-based transfer rules enforced by the protocol itself.",
    impact: "Champion · Algorand Green House Hack 2",
    stack: ["Python", "Pyteal", "Algorand"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/NFT_tickets_system_that_supports_royalties_and_role-based_transfer" }],
    zh: {
      role: "开发者",
      summary: "ARC-0020 智能 ASA 票务——版税与基于角色的转让规则由协议本身强制执行。",
      impact: "冠军 · Algorand Green House Hack 2",
    },
  },
  {
    id: "drone-delivery",
    name: "Drone Delivery Planner",
    hash: "0xDR0N3",
    role: "Backend Developer",
    year: "2021",
    category: ["ai"],
    summary:
      "Data-driven routing engine generating feasible drone delivery paths in real time.",
    stack: ["Java", "SpringBoot"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/ILP-CW" }],
    zh: {
      role: "后端开发",
      summary: "数据驱动的路由引擎，实时生成可行的无人机配送路径。",
    },
  },
  {
    id: "antifraud",
    name: "Anti-Fraud Predictor",
    hash: "0xFRAUD",
    role: "Data Engineer",
    year: "2021",
    category: ["ai"],
    summary:
      "Click-fraud detection over ~500K simulated clicks — won 1st place in Baidu PaddlePaddle MarTech challenge.",
    impact: "1st place · Baidu PaddlePaddle MarTech",
    stack: ["Python", "Deep Learning", "PaddlePaddle"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/BaiduCompetion1" }],
    zh: {
      role: "数据工程师",
      summary: "基于约 50 万模拟点击的点击欺诈检测——百度飞桨 MarTech 挑战赛第一名。",
      impact: "第一名 · 百度飞桨 MarTech 挑战赛",
    },
  },
  {
    id: "horoscope",
    name: "Horoscope DApp",
    hash: "0xH0R0",
    role: "Full-Stack",
    year: "2021",
    category: ["web3", "hackathon"],
    summary:
      "Oracle-generated personalized NFT metadata bridging horoscope culture between Web2 and Web3.",
    stack: ["React", "Reach", "Conflux"],
    links: [{ label: "demo", href: "https://reach-sh.github.io/cfx-demo-horoscope/" }],
    zh: {
      role: "全栈",
      summary: "预言机生成的个性化 NFT 元数据，在 Web2 与 Web3 之间桥接星座文化。",
    },
  },
  {
    id: "zkwasm-suite",
    name: "zkWASM Ecosystem Suite",
    hash: "0xZKW45M",
    role: "Ecosystem Director · Engineer",
    year: "2024 — now",
    category: ["web3"],
    summary:
      "The zkWASM product surface built end-to-end at Delphinus Lab — Staking, Solar, a prediction market, a Merkle-tree airdrop system, and a launchpad where off-chain ZK proofs trigger on-chain liquidity.",
    detail:
      "Maintaining 8+ ecosystem projects for zkWASM at Delphinus Lab. Built Staking, Solar and a Prediction Market end-to-end; shipped a Merkle-tree airdrop system and a Launchpad where off-chain ZK proofs trigger on-chain liquidity. Also built the scaffolding framework, CLI tooling and a fully automated K8s CI/CD platform underneath it all.",
    stack: ["zkWASM", "ZK proofs", "TypeScript", "CLI", "Kubernetes", "CI/CD"],
    links: [],
    zh: {
      role: "生态总监 · 工程师",
      summary:
        "在 Delphinus Lab 端到端构建的 zkWASM 产品矩阵——Staking、Solar、预测市场、Merkle 树空投系统，以及由链下 ZK 证明触发链上流动性的 Launchpad。",
      detail:
        "在 Delphinus Lab 维护 8+ 个 zkWASM 生态项目。端到端构建 Staking、Solar 与预测市场；上线 Merkle 树空投系统和由链下 ZK 证明触发链上流动性的 Launchpad。同时搭建了底层的脚手架框架、CLI 工具链与全自动 K8s CI/CD 平台。",
    },
  },
  {
    id: "yunda",
    name: "YunDa",
    hash: "0xYUND4",
    role: "Developer",
    year: "2023",
    category: ["ai"],
    summary:
      "Low-code AI decision-support engine — pattern discovery, anomaly detection and prediction for enterprise data.",
    stack: ["Python", "Streamlit"],
    links: [{ label: "github", href: "https://github.com/JupiterXiaoxiaoYu/speech-app" }],
    zh: {
      role: "开发者",
      summary: "低代码 AI 决策支持引擎——面向企业数据的模式发现、异常检测与预测。",
    },
  },
];

export const FEATURED = [
  "sovereign-rag",
  "trustai",
  "martech3",
  "social-chain",
  "neurodaos",
  "zkwasm-suite",
  "nft-similarity",
  "rosen-app",
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

export const EDUCATION_ZH = [
  { school: "香港科技大学（广州）", degree: "MPhil · 数据科学与分析", period: "2024 — 2026" },
  { school: "爱丁堡大学", degree: "MA 认知科学 · 一等荣誉学位", period: "2020 — 2024" },
  { school: "复旦大学", degree: "交换 · 计算机科学", period: "2022 — 2023" },
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

// ── Orgs for the marquee ──────────────────────────────────────────────────────

export const ORGS = [
  "Delphinus Lab",
  "HKUST",
  "University of Edinburgh",
  "Fudan University",
  "OKX Ventures",
  "Binance Labs",
  "Mirana",
  "Amber Group",
  "Algorand Foundation",
  "500 Global",
  "KuCoin Ventures",
];
