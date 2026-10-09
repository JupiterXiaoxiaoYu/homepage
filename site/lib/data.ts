// ── content model ─────────────────────────────────────────────────────────────
import { BASE_PATH } from "./site";

export type Lang = "en" | "zh";

export const PROFILE = {
  name: "Jupiter Yu",
  handle: "jupiterxiaoxiaoyu",
  tagline: "Agent Engineer · Full-Stack · Researcher",
  bio: "Agent engineer building production AI systems end to end. Agent Engineer at Viciking (AI video production); previously Ecosystem Director at Delphinus Lab (zkWASM) and founder of Resona. MPhil in Data Science @ HKUST (GZ), Cognitive Science @ Edinburgh. 33 hackathon and competition awards.",
  positioning: {
    en: "I build production agent systems — and the full-stack products around them.",
    zh: "从 Agent 运行时到全栈产品，独立构建能上线的 AI 系统。",
  },
  zh: {
    bio: "端到端构建可上线的 AI 系统的 Agent 工程师。现任唯西（AI 视频生产）Agent 工程师；曾任 Delphinus Lab（zkWASM）生态总监、Resona 创始人。香港科技大学（广州）数据科学 MPhil，爱丁堡大学认知科学本科。33 项黑客松与竞赛奖项。",
    tagline: "Agent 工程师 · 全栈 · 研究员",
  },
  email: "jupiterxiaoxiaoyu@gmail.com",
  github: "https://github.com/JupiterXiaoxiaoYu",
  linkedin: "https://www.linkedin.com/in/jupiter-yu-0a7052aa/",
  resume: `${BASE_PATH}/Xiaoxiao-YU-CV.pdf`,
  location: "REMOTE / HK / UK",
  stats: [
    { k: "hackathon & competition awards", v: "33" },
    { k: "first-place finishes", v: "12" },
    { k: "agent outputs with no manual re-edit", v: "~90%" },
    { k: "open-source stars", v: "200" },
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
    id: "socialattributionqa",
    title: "SocialAttributionQA",
    venue: "WISE 2026 · CCF B · First author",
    period: "2026",
    summary:
      "A benchmark for attribution-evidence-aware question answering on the social web: 1,200 four-choice questions across eight task types over 725,282 Mastodon posts, with gold evidence withheld from solvers. The ATLAS solver combines attribution constraints, graph operations, semantic ranking and answer comparison.",
    metrics: [
      { k: "accuracy (ATLAS)", v: "95.3%" },
      { k: "questions", v: "1,200" },
      { k: "posts", v: "725K" },
    ],
    tags: ["RAG", "benchmark", "knowledge graphs", "evaluation"],
    zh: {
      title: "SocialAttributionQA",
      summary:
        "面向社交网络、要求给出归因证据的问答基准：基于 725,282 条 Mastodon 帖子构建 1,200 道四选一题目、覆盖 8 类任务，答题系统看不到标准证据。ATLAS 求解器结合归因约束、图操作、语义排序与答案比较。",
    },
  },
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
    id: "viciking",
    role: "Agent Engineer (full-time)",
    org: "Viciking (Beijing Weixi)",
    backing: "AI video production",
    period: "2026.07 — now",
    current: true,
    points: [
      "Sole engineer, frontend to agent runtime, on four internal AI video-production products",
      "Agent mode turns a script into a finished 1-minute episode in 15–30 min; ~90% need no manual re-editing",
      "Doubled production efficiency vs. manual editing; dozens of internal users across business lines",
      "Agent tasks that survive crashes, MCP tools for outside agents, alerts on failing runs, and evals that decide what ships",
    ],
    zh: {
      role: "Agent 工程师",
      points: [
        "四个内部 AI 视频生产产品的唯一工程师，从前端一直做到 Agent 运行时",
        "Agent 模式下 1 分钟成片从剧本到出片 15–30 分钟，约 90% 无需人工返工",
        "相比人工剪辑生产效率提升 2 倍，几十名内部用户、覆盖多条业务线",
        "崩溃后能继续的 Agent 任务、供外部 Agent 使用的 MCP 工具、失败告警，以及决定什么能上线的评测",
      ],
    },
  },
  {
    id: "resona",
    role: "Founder & Sole Engineer",
    org: "Resona",
    backing: "Ant Group MaShang AI Accelerator",
    period: "2026.05 — 2026.06",
    points: [
      "URL in, product demo video out: browser agents explore products in cloud sandboxes and render demos",
      "When an agent hits a login page, the user signs in once and it carries on; trial customers",
    ],
    zh: {
      role: "创始人 & 独立工程师",
      points: [
        "输入网址、输出产品 Demo 视频：浏览器 Agent 在云端沙箱里探索产品并渲染成片",
        "遇到登录页时用户登录一次，Agent 就能继续；有试用客户",
      ],
    },
  },
  {
    id: "delphinus",
    role: "Ecosystem Director / DevRel Engineer",
    org: "Delphinus Lab",
    backing: "OKX Ventures · Binance Labs · Mirana",
    period: "2024.11 — 2026.07",
    points: [
      "Promoted to Ecosystem Director (Jun 2025); remote, alongside the MPhil",
      "Rebuilt the zkWASM browser SDK and wrote the CLI that scaffolds new apps",
      "Solo-built staking, launchpad, prediction-market and social-binder apps — thousands of users, multi-million-USD TVL",
      "Led the team behind a hosted Kubernetes deployment platform running 10+ projects",
    ],
    zh: {
      role: "生态总监 / DevRel 工程师",
      points: [
        "2025 年 6 月晋升生态总监；远程工作，与 MPhil 学业并行",
        "从零重写 zkWASM 浏览器 SDK，编写生成新应用骨架的 CLI",
        "独立开发 Staking、Launchpad、预测市场与社交绑定应用——数千用户、数百万美元 TVL",
        "带队搭建托管式 Kubernetes 部署平台，承载 10+ 个项目",
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

export type Category = "agent" | "ai" | "web3" | "research" | "hackathon";

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
    id: "weichuang",
    name: "WeiChuang Drama Studio",
    hash: "0xWE1CH",
    role: "Agent Engineer · Viciking",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "AI short-drama and ad production: script → cast and scenes → storyboard → finished, subtitled video, in agent or manual mode, batched and run in parallel.",
    impact: "1-min episode in 15–30 min · ~90% need no manual re-edit · 2× production efficiency",
    detail:
      "Agent mode takes a script through cast and scenes, storyboard and video to a finished, subtitled episode — about 15–30 minutes for a one-minute episode, with many episodes running in parallel. If a model call fails mid-batch, only the failed shots rerun, so finished shots are never regenerated or paid for twice. Bad generations fall back to another model or get their voice repaired, storyboard rules keep empty shots out, and subtitles and packaging are automatic — about 90% of episodes need no manual re-editing. Every model call is logged with its inputs, tokens and errors, so a slow or stuck job can be traced to the exact call. Episodes export as editable CapCut (Jianying) drafts. ~5,000 tests plus browser end-to-end tests.",
    stack: ["React 19", "FastAPI", "Temporal", "PostgreSQL", "SSE", "Seedance", "Qwen"],
    links: [],
    zh: {
      name: "唯创 · AI 短剧工作台",
      role: "Agent 工程师 · 唯西",
      summary: "AI 短剧与广告生产：剧本 → 角色与场景 → 分镜 → 带字幕的成片，支持 Agent 与手动两种模式，批量并发运行。",
      impact: "1 分钟成片 15–30 分钟 · ~90% 无需人工返工 · 生产效率提升 2 倍",
      detail:
        "Agent 模式把剧本依次做成角色与场景、分镜、视频，直到带字幕的成片——1 分钟成片约 15–30 分钟，多集可以并行。批量生成中某次模型调用失败时，只重跑失败的镜头，已完成的镜头不会重新生成，也不会重复付费。生成效果不好时自动换模型或修复配音，分镜规则避免空镜，字幕和包装自动完成——约 90% 的成片无需人工返工。每次模型调用都记录输入、token 和报错，任务变慢或卡住时能定位到具体是哪一次调用。成片可导出为可编辑的剪映草稿。约 5,000 个测试，外加浏览器端到端测试。",
    },
  },
  {
    id: "weixi-studio",
    name: "Weixi Studio",
    hash: "0xWX5TD",
    role: "Agent Engineer · Viciking",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "Turned OpenChatCut, a local-first single-user agentic video editor, into a multi-tenant SaaS where editors and agents work on the same timeline.",
    impact: "multi-tenant SaaS · used across business lines",
    detail:
      "Added what a team needs: workspaces, roles and feature permissions, a shared asset library with a managed tag tree, bulk upload from the browser that resumes after a dropped connection, and a production center that turns one template into a batch of editable projects; plus semantic media search and speech recognition. Agent work runs in separate workers that survive crashes and resume where they stopped. A paid or irreversible tool call is never retried blindly — if its outcome is unclear, a person decides. Through MCP, outside agents can edit the same timeline as people without overwriting their changes.",
    stack: ["TypeScript", "React", "Remotion", "Node.js", "PostgreSQL", "MCP"],
    links: [],
    zh: {
      name: "唯镜 Studio",
      role: "Agent 工程师 · 唯西",
      summary: "把本地优先、单用户的开源 Agent 剪辑器 OpenChatCut 改造成多租户 SaaS，剪辑师和 Agent 在同一条时间线上协作。",
      impact: "多租户 SaaS · 多条业务线在用",
      detail:
        "补上团队协作需要的一切：工作区、角色与功能权限、带受控标签树的共享素材库、断网后能续传的浏览器批量上传，以及用一个模板批量生成可编辑工程的生产中心；另有语义素材检索和语音识别。Agent 任务在独立的 Worker 里运行，进程崩溃后能从中断处继续。付费或不可逆的工具调用绝不盲目重试——结果不明时交给人决定。通过 MCP，外部 Agent 也能编辑同一条时间线，而不会覆盖人的修改。",
    },
  },
  {
    id: "screenplay-studio",
    name: "Screenplay Agent Studio",
    hash: "0x5CR1P",
    role: "Agent Engineer · Viciking",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "A writers' room of agents that adapts a novel into a series across six stages, with writers approving every edit before it lands.",
    impact: "eval: specialists cost 3.7× tokens for no quality gain → kept off",
    detail:
      "An eval compared a single lead agent with a lead plus specialists on quality, tokens and latency. The specialists cost 3.7× the tokens for no measurable gain, so every stage runs one lead agent. Drafts live in files rather than chat history, so long sessions can be compressed without losing work. Each stage only gets the tools it needs; writers approve every edit; alerts fire when agent runs start failing or a decision waits too long, and every change is kept in an audit log.",
    stack: ["FastAPI", "Bun", "Pi agent SDK", "PostgreSQL", "OpenTelemetry"],
    links: [],
    zh: {
      name: "剧本多 Agent 工作室",
      role: "Agent 工程师 · 唯西",
      summary: "由 Agent 组成的编剧室，分六个阶段把小说改编成剧集，每一处修改都要编剧批准后才生效。",
      impact: "评测：专家协作多花 3.7 倍 token、质量无提升 → 不上线",
      detail:
        "用评测对比了“单个主导 Agent”与“主导 + 专家 Agent”两种方式的质量、token 和耗时：专家方式多花 3.7 倍 token，质量却没有可测量的提升，所以每个阶段只用一个主导 Agent。草稿保存在文件里而不是对话记录里，长会话压缩上下文时不会丢稿。每个阶段只开放它需要的工具；每处修改都由编剧批准；Agent 运行开始频繁失败、或某个决定等太久时会触发告警，所有改动都有审计记录。",
    },
  },
  {
    id: "resona",
    name: "Resona",
    hash: "0xRES0N",
    role: "Founder · Sole Engineer",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "URL in, product demo video out — browser agents explore a product in cloud sandboxes, record a walkthrough and render it into a demo.",
    impact: "Ant Group MaShang AI Accelerator · trial customers",
    detail:
      "Browser agents first map the product, then explore each section in parallel in cloud sandboxes, keeping track of what they have covered and going back for anything missed. Any action that changes data needs a check first, and payments are blocked outright. When an agent hits a login page, the user signs in once in the same browser and the agent carries on from there. Explore, record and render run as separate job queues, and each step picks its own model from OpenAI, Anthropic or Gemini; render agents (GSAP, Remotion) cut the recordings into the finished demo. ~500 tests.",
    stack: ["Node.js", "Stagehand", "Playwright", "AgentBay", "BullMQ", "Remotion"],
    links: [],
    zh: {
      role: "创始人 · 独立工程师",
      summary: "输入网址，输出产品 Demo 视频——浏览器 Agent 在云端沙箱里探索产品、录制演示，再渲染成片。",
      impact: "入选蚂蚁集团蚂上加速器 · 有试用客户",
      detail:
        "浏览器 Agent 先摸清产品结构，再在云端沙箱里并行探索每个版块，记录已经覆盖的地方，遗漏的再回头补。任何会修改数据的操作都要先过一道检查，支付操作直接禁止。遇到登录页时，用户在同一个浏览器里登录一次，Agent 就能接着往下走。探索、录制、渲染是三条独立的任务队列，每一步各自选用 OpenAI、Anthropic 或 Gemini 的模型；渲染 Agent（GSAP、Remotion）把录屏剪成最终的 Demo。约 500 个测试。",
    },
  },
  {
    id: "novel-to-script",
    name: "Novel-to-Script-Team",
    hash: "0xN0V3L",
    role: "Author · Maintainer",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "Open-source multi-agent harness that runs inside Claude Code or Codex and adapts a novel into a series — analysis, episode plans, scripts, reviews and storyboards.",
    impact: "175★ · 33 forks",
    detail:
      "17 role agents and 25 skills. A review director checks every episode and sends failures back for rewriting. Progress is saved to files, so a run can stop and resume at any episode without the context window filling up. Hybrid ChromaDB + TF-IDF search pulls similar reference scripts to ground the writing.",
    stack: ["Agent Skills", "Python", "ChromaDB", "Claude Code", "Codex"],
    links: [{ label: "github", href: "https://github.com/Supreme-Ultimate/novel-to-script-team" }],
    zh: {
      name: "小说改编多 Agent 团队",
      role: "作者 · 维护者",
      summary: "开源的多 Agent 框架，运行在 Claude Code 或 Codex 里，把小说改编成剧集——从分析、分集规划到剧本、审稿和分镜。",
      impact: "175★ · 33 个 fork",
      detail:
        "17 个角色 Agent、25 个 Skill。审稿总监检查每一集，不合格就打回重写。进度保存在文件里，可以在任意一集停下再继续，上下文窗口不会被撑满。ChromaDB + TF-IDF 混合检索找出相似的参考剧本，为写作提供依据。",
    },
  },
  {
    id: "shotloom",
    name: "ShotLoom",
    hash: "0x5H0T5",
    role: "Author · Maintainer",
    year: "2026",
    category: ["ai"],
    summary:
      "Upload a film, get a shot-by-shot breakdown — scene detection, Qwen vision analysis and speech recognition on one inspectable timeline, exported to Excel or PDF.",
    impact: "107 end-to-end tests",
    detail:
      "Each shot is analysed for size, camera movement, lighting and narrative function and lined up with its dialogue, plus a continuity report for the whole film. Long films are split into overlapping chunks so no scene is lost at a boundary; progress streams live and survives a page refresh.",
    stack: ["FastAPI", "Redis / RQ", "React", "TypeScript", "Qwen"],
    links: [{ label: "github", href: "https://github.com/Supreme-Ultimate/shotloom" }],
    zh: {
      name: "ShotLoom 拉片台",
      role: "作者 · 维护者",
      summary: "上传一部片子，得到逐镜头拉片——镜头检测、Qwen 视觉分析与语音识别对齐在同一条可检查的时间线上，可导出 Excel 或 PDF。",
      impact: "107 个端到端测试",
      detail:
        "逐镜头分析景别、运镜、光线和叙事作用，并与台词对齐，另生成全片连贯性报告。长片切成相互重叠的片段分析，不会在切分处漏掉镜头；进度实时推送，刷新页面也不会丢。",
    },
  },
  {
    id: "production-tools",
    name: "Viciking Production Tools",
    hash: "0xT00L5",
    role: "Agent Engineer · Viciking",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "Two tools in daily production: an unattended uploader that pushes drama assets to an ad platform for review, and a GPU pipeline that masks sensitive objects in video.",
    impact: "replaced manual uploading · redaction at 2× real time, ~80% accuracy",
    detail:
      "The uploader batch-submits drama assets for review without anyone watching. If the platform's reply is lost, it checks what actually happened instead of resubmitting, so nothing is uploaded or sent for review twice; restarts skip files already published, and one failing drama is set aside while the rest carry on. The redaction pipeline detects and masks 13 kinds of objects in video, with a Label Studio annotation loop, RF-DETR fine-tuning and TensorRT export, a GPU job queue and a timeline review UI.",
    stack: ["C# / .NET", "SQLite", "FastAPI", "React", "RF-DETR", "TensorRT"],
    links: [],
    zh: {
      name: "唯西生产工具",
      role: "Agent 工程师 · 唯西",
      summary: "两个每天在线运行的工具：一个无人值守地把短剧素材上传到广告平台并送审，一个用 GPU 自动为视频打码。",
      impact: "取代人工上传 · 打码速度为视频时长的 2 倍、准确率约 80%",
      detail:
        "上传工具无人值守地批量提交短剧素材送审。平台回执丢失时，先去核实实际结果再决定，绝不直接重提，所以不会重复上传或重复送审；重启后跳过已发布的文件，某部剧出错就先搁置，其余继续。打码流水线能识别并遮挡视频中的 13 类目标，配有 Label Studio 标注闭环、RF-DETR 微调与 TensorRT 导出、GPU 任务队列和时间轴审核界面。",
    },
  },
  {
    id: "creative-engine",
    name: "Creative Engine",
    hash: "0xCR3AT",
    role: "Agent Engineer · Viciking",
    year: "2026",
    category: ["agent", "ai", "research"],
    summary:
      "A writing agent for short-video scripts: it analyses reference videos, maps what happens and why, and drafts new scripts from that map.",
    impact: "14 ablation / LLM-judge experiments decide what stays",
    detail:
      "The agent keeps what it observed in a video apart from what it inferred, and can only reach the tools its job needs. Fourteen controlled experiments with an LLM judge — after first checking the judge agreed with itself across 2,560 repeat judgments — decided which prompt techniques stayed; anything that did not measurably help was removed.",
    stack: ["TanStack Start", "Vercel AI SDK", "PostgreSQL", "pgvector", "Qwen"],
    links: [],
    zh: {
      name: "唯灵创意引擎",
      role: "Agent 工程师 · 唯西",
      summary: "短视频编导 Agent：分析参考视频，梳理出“发生了什么、为什么有效”，再据此写出新脚本。",
      impact: "14 组消融 / LLM 评审实验决定保留什么",
      detail:
        "Agent 会把“在视频里看到的”和“自己推断的”分开记录，并且只能调用工作需要的工具。先用 2,560 次重复判断确认 LLM 评审自身前后一致，再做了 14 组对照实验，决定哪些提示技巧保留；没有可测量收益的一律删掉。",
    },
  },
  {
    id: "ringchat",
    name: "RingChat",
    hash: "0xR1NG",
    role: "Team Lead · Client Engineer",
    year: "2026",
    category: ["agent", "ai"],
    summary:
      "An agent-native messenger on Web, iOS and Android where every user gets a personal AI agent, built on Tinode and OpenClaw.",
    impact: "6-person team · continued by another team as Gold House",
    detail:
      "Led the team and worked mainly on the clients. On Android, built the chat UI, optimistic media upload, contact and group search, unread badges and multi-device sync.",
    stack: ["Kotlin", "Jetpack Compose", "React", "Go", "OpenClaw"],
    links: [],
    zh: {
      role: "团队负责人 · 客户端工程师",
      summary: "Agent 原生的即时通讯应用，覆盖 Web、iOS 与 Android，每位用户都有自己的 AI Agent，基于 Tinode 与 OpenClaw。",
      impact: "6 人团队 · 现由其他团队以黄金屋（Gold House）继续开发",
      detail: "带领团队并主要负责客户端。在 Android 上实现了聊天界面、乐观发送的媒体上传、联系人与群组搜索、未读角标和多端同步。",
    },
  },
  {
    id: "outcomex",
    name: "OutcomeX",
    hash: "0x0UTCX",
    role: "Sole Developer",
    year: "2026",
    category: ["agent", "web3", "hackathon"],
    summary:
      "Pay for an AI deliverable, not a chatbot: an agent runtime does the work, and payment sits in escrow on HashKey Chain until the buyer accepts.",
    impact: "2nd · DeFi Track, HashKey Chain Horizon Hackathon 2026",
    detail:
      "The backend hands each paid job to AgentSkillOS, an open-source agent runtime, and streams its progress and results back to the buyer. Money never touches the agent: seven Foundry contracts handle escrow, settlement, refunds and revenue sharing for the machines that did the work.",
    stack: ["FastAPI", "AgentSkillOS", "Solidity", "Foundry"],
    links: [{ label: "github", href: "https://github.com/Contrarian3-Labs/OutcomeX" }],
    zh: {
      role: "独立开发者",
      summary: "为 AI 交付的结果付费，而不是为聊天付费：Agent 完成任务，款项托管在 HashKey Chain 上，买家验收后才放款。",
      impact: "HashKey Chain Horizon 黑客松 2026 · DeFi 赛道第二名",
      detail:
        "后端把每个付费任务交给开源 Agent 运行时 AgentSkillOS 执行，并把进度和结果实时推给买家。资金完全不经过 Agent：7 个 Foundry 合约负责托管、结算、退款，以及给执行任务的机器分成。",
    },
  },
  {
    id: "ava-box",
    name: "Ava Box",
    hash: "0xAVA80",
    role: "Sole Developer",
    year: "2026",
    category: ["agent", "web3", "hackathon"],
    summary:
      "A handheld voice agent for crypto trading on an ESP32-S3 — speak to it, read the answer on screen, confirm every order with a button.",
    impact: "Champion · AVE CLAW Hackathon 2026",
    detail:
      "What you say is routed to the right trading tool for the screen you are on — feed, portfolio, watchlist, buy or sell — with paper and real trading. The same interface code runs on the device and in a desktop simulator. Later turned into DeviceKit, an open framework where the chain, speech and language models can be swapped, with over-the-air updates.",
    stack: ["ESP32-S3", "C++", "LVGL", "Python"],
    links: [
      { label: "github", href: "https://github.com/JupiterXiaoxiaoYu/ava-trading-esp32" },
      { label: "devicekit", href: "https://github.com/JupiterXiaoxiaoYu/ava-devicekit" },
    ],
    zh: {
      role: "独立开发者",
      summary: "跑在 ESP32-S3 上的掌上语音交易 Agent——对它说话，在屏幕上看结果，每一笔下单都要按键确认。",
      impact: "AVE CLAW 黑客松 2026 · 冠军",
      detail:
        "根据当前所在页面，把语音指令交给对应的交易工具——行情、持仓、自选、买卖，支持模拟盘和实盘。同一套界面代码同时跑在设备和桌面模拟器上。之后整理成开源框架 DeviceKit：链、语音和语言模型都可以替换，并支持远程升级。",
    },
  },
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
    year: "2024 — 2026",
    category: ["web3"],
    summary:
      "The zkWASM developer and product surface at Delphinus Lab — a rebuilt browser SDK, a dApp-starter CLI, staking, launchpad and prediction-market apps, and a hosted Kubernetes deployment platform.",
    impact: "thousands of users · multi-million-USD TVL · 10+ projects on the K8s platform",
    detail:
      "Rebuilt the zkWASM browser SDK from scratch so apps use one wallet connection across both chain layers, wrote the CLI that scaffolds new apps, and maintained the TypeScript services that settle deposits and withdrawals. Solo-built staking, launchpad, prediction-market and social-binder apps, plus the zkWASM Hub site and developer docs, and ran operations for 8+ ecosystem apps. Led the team behind a hosted Kubernetes platform where developers deploy straight from GitHub and watch build status and logs live.",
    stack: ["TypeScript", "zkWASM", "React", "Kubernetes", "Helm", "CI/CD"],
    links: [
      { label: "hub", href: "https://zkwasmhub.com/" },
      { label: "apps", href: "https://dapps.zkwasmhub.com/" },
      { label: "docs", href: "https://development-recipe.zkwasm.ai/" },
    ],
    zh: {
      role: "生态总监 · 工程师",
      summary:
        "Delphinus Lab 的 zkWASM 开发者与产品矩阵——重写的浏览器 SDK、dApp 脚手架 CLI、Staking / Launchpad / 预测市场应用，以及托管式 Kubernetes 部署平台。",
      impact: "数千用户 · 数百万美元 TVL · K8s 平台承载 10+ 项目",
      detail:
        "从零重写 zkWASM 浏览器 SDK，让应用用一个钱包连接同时打通两层链；编写生成新应用骨架的 CLI；维护负责充值与提现结算的 TypeScript 服务。独立开发 Staking、Launchpad、预测市场与社交绑定应用，以及 zkWASM Hub 官网和开发者文档，并负责 8+ 个生态应用的运维。带队搭建托管式 Kubernetes 平台，开发者直接从 GitHub 部署，实时查看构建状态和日志。",
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
  "weichuang",
  "weixi-studio",
  "screenplay-studio",
  "resona",
  "novel-to-script",
  "zkwasm-suite",
  "ava-box",
  "outcomex",
];

// ── Awards / proof of work ────────────────────────────────────────────────────

export type Award = { year: string; event: string; result: string };

export const AWARDS: Award[] = [
  { year: "2026", event: "AVE CLAW Hackathon", result: "Champion" },
  { year: "2026", event: "HashKey Chain Horizon Hackathon", result: "2nd · DeFi Track" },
  { year: "2025", event: "15th ICBC Cup FinTech Innovation (Guangdong)", result: "First Prize" },
  { year: "2025", event: "Zama Bounty Program — Universal FHEVM SDK", result: "Bounty Track Winner" },
  { year: "2024", event: "Shenzhen International FinTechathon", result: "2nd · Blockchain" },
  { year: "2024", event: "MEME.ZKWASM() Hackathon", result: "2nd · Game Track" },
  { year: "2024", event: "Amber.ac BUIDL_QUESTS", result: "Finalist · Top 5" },
  { year: "2024", event: "NEAR “[REDACTED]” Hackathon", result: "ZettaBlock AI/Web3 Bounty" },
  { year: "2024", event: "ETH Shanghai Bethink", result: "Overall Champion · 1st Defending the System" },
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
  { year: "2022", event: "MoleHack — NFT 2.0", result: "Early Promising Mole" },
  { year: "2022", event: "MoleHack — NFT 2.0", result: "Bronze Mole · 3rd Prize" },
  { year: "2021", event: "Conflux Beidou Entrepreneurship Camp", result: "3rd Prize" },
  { year: "2021", event: "Reach on Conflux Bounty Hack", result: "Champion" },
  { year: "2021", event: "Unihack Conflux", result: "Enterprise Award" },
  { year: "2021", event: "Conflux Practitioner Programme", result: "Practitioner Medal" },
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
  { label: "agents", items: ["Context engineering", "MCP", "Multi-agent", "Browser agents", "Evals", "Temporal"] },
  { label: "language", items: ["Rust", "TypeScript", "Python", "Solidity", "Go", "Java", "R", "Haskell"] },
  { label: "frontier", items: ["zkWASM", "ZK proofs", "FHE", "Smart contracts", "DeFi", "Tokenomics"] },
  { label: "web", items: ["React", "Next.js", "TanStack", "React Native", "Kotlin", "Node.js", "FastAPI"] },
  { label: "mind", items: ["PyTorch", "TensorFlow", "RAG", "Neo4j", "Cognitive Science"] },
  { label: "infra", items: ["Kubernetes", "Docker", "CI/CD", "OpenTelemetry", "PostgreSQL", "Redis", "AWS"] },
];

// ── Orgs for the marquee ──────────────────────────────────────────────────────

export const ORGS = [
  "Viciking",
  "Ant Group MaShang Accelerator",
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
