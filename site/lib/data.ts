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
    { k: "agent outputs publish-ready", v: "~90%" },
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
    role: "Agent Engineer",
    org: "Viciking (Beijing Weixi)",
    backing: "AI video production",
    period: "2026.07 — now",
    current: true,
    points: [
      "Sole engineer, frontend to agent runtime, on four internal AI video-production products",
      "Agent mode turns a script into a finished 1-minute episode in 15–30 min; ~90% of outputs publish-ready",
      "Doubled production efficiency vs. manual editing; dozens of internal users across business lines",
      "Durable agent runtimes, MCP tools, OpenTelemetry alerts and eval harnesses that decide what ships",
    ],
    zh: {
      role: "Agent 工程师",
      points: [
        "四个内部 AI 视频生产产品的唯一工程师，从前端一直做到 Agent 运行时",
        "Agent 模式下 1 分钟成片从剧本到出片 15–30 分钟，约 90% 可直接发布",
        "相比人工剪辑生产效率提升 2 倍，几十名内部用户、覆盖多条业务线",
        "可恢复的 Agent 运行时、MCP 工具、OpenTelemetry 告警，以及决定什么能上线的评测框架",
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
      "Human login handoff over CDP; explore / record / render queues; trial customers",
    ],
    zh: {
      role: "创始人 & 独立工程师",
      points: [
        "输入网址、输出产品 Demo 视频：浏览器 Agent 在云端沙箱里探索产品并渲染成片",
        "通过 CDP 交接人工登录；探索 / 录制 / 渲染任务队列；有试用客户",
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
      "Rebuilt the zkWASM browser SDK and wrote the dApp-starter CLI",
      "Solo-built staking, launchpad, prediction-market and social-binder apps — thousands of users, multi-million-USD TVL",
      "Led the team behind a hosted Kubernetes deployment platform running 10+ projects",
    ],
    zh: {
      role: "生态总监 / DevRel 工程师",
      points: [
        "2025 年 6 月晋升生态总监；远程工作，与 MPhil 学业并行",
        "从零重写 zkWASM 浏览器 SDK，编写 dApp 脚手架 CLI",
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
    impact: "1-min episode in 15–30 min · ~90% publish-ready · 2× production efficiency",
    detail:
      "A durable production coordinator on Temporal and PostgreSQL. Generation inputs are frozen into immutable snapshots, writes use idempotency keys and compare-and-set checks, failures are classified before retrying, and batches allow partial success — only failed items rerun, finished shots are never regenerated. Model routing and fallback, voice repair, storyboard rules that avoid empty shots, and automatic subtitles and packaging get ~90% of outputs publish-ready. Every text-model call is traced (redacted I/O, cached tokens, stream checkpoints, failure evidence) so slow or stuck calls can be diagnosed. Exports to editable CapCut (Jianying) drafts. ~1,900 commits, ~5,000 tests plus Playwright end-to-end.",
    stack: ["React 19", "FastAPI", "Temporal", "PostgreSQL", "SSE", "Seedance", "Qwen"],
    links: [],
    zh: {
      name: "唯创 · AI 短剧工作台",
      role: "Agent 工程师 · 唯西",
      summary: "AI 短剧与广告生产：剧本 → 角色与场景 → 分镜 → 带字幕的成片，支持 Agent 与手动两种模式，批量并发运行。",
      impact: "1 分钟成片 15–30 分钟 · ~90% 可直接发布 · 生产效率提升 2 倍",
      detail:
        "基于 Temporal 与 PostgreSQL 的可恢复生产协调器：生成输入冻结为不可变快照，写入带幂等键与 CAS 版本校验，失败先分类再重试；批次允许部分成功，只重跑失败项，已完成的镜头不会重新生成。模型路由与兜底、语音修复、减少空镜的分镜规则、自动字幕与包装，让约 90% 的产出可以直接发布。每次文本模型调用都有完整轨迹（脱敏输入输出、缓存 token、流式断点、失败证据），用来排查慢调用和卡住的调用。可导出为可编辑的剪映草稿。约 1,900 次提交，约 5,000 个测试，外加 Playwright 端到端测试。",
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
    impact: "multi-tenant SaaS · dozens of internal users · ~1,500 commits",
    detail:
      "Workspaces, roles and feature grants; a shared asset library with a governed tag tree; resumable browser-to-cloud bulk upload; a template-driven production center that yields one editable project per output; semantic media search and ASR. Underneath, separate agent, generation, export and media workers run on Postgres leases with fencing tokens, checkpointed agent turns, human-decision states and per-call idempotency keys — paid or irreversible tools escalate to a person instead of replaying. A session-bound, revision-safe MCP server lets external agents edit the same timeline.",
    stack: ["TypeScript", "React", "Remotion", "Node.js", "PostgreSQL", "MCP"],
    links: [],
    zh: {
      name: "唯镜 Studio",
      role: "Agent 工程师 · 唯西",
      summary: "把本地优先、单用户的开源 Agent 剪辑器 OpenChatCut 改造成多租户 SaaS，剪辑师和 Agent 在同一条时间线上协作。",
      impact: "多租户 SaaS · 几十名内部用户 · 约 1,500 次提交",
      detail:
        "工作区、角色与功能授权；带受控标签树的共享素材库；可续传的浏览器直传云端批量上传；按模板批量生产、每个产出对应一个可编辑工程的生产中心；语义素材检索与 ASR。底层是独立的 Agent、生成、导出与媒体 Worker，基于带 fencing token 的 Postgres 租约、可断点恢复的 Agent 回合、人工决策状态和逐次调用幂等键运行——付费或不可逆的工具交给人工确认，而不是盲目重放。会话绑定、带版本校验的 MCP 服务让外部 Agent 也能编辑同一条时间线。",
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
      "Novel-to-series writing with 6 stage contracts and 13 role agents on the Pi agent SDK; humans approve every atomic edit set.",
    impact: "eval: specialists cost 3.7× tokens for no quality gain → kept off",
    detail:
      "Per-stage tool allowlists; fixed, versioned knowledge prefixes keep prompt caching effective; workspace files stay the single source of truth and are re-attached after compaction; sessions are append-only JSONL with checkpoints. OpenTelemetry metrics drive alerts on agent-run failure ratio and stalled human decisions, alongside an append-only audit log. An eval harness compared single-lead and specialist-assisted runs on quality, tokens and latency: the specialists cost 3.7× tokens for no measurable gain, so production stayed single-lead.",
    stack: ["FastAPI", "Bun", "Pi agent SDK", "PostgreSQL", "OpenTelemetry"],
    links: [],
    zh: {
      name: "剧本多 Agent 工作室",
      role: "Agent 工程师 · 唯西",
      summary: "小说改编剧集：6 个阶段契约、13 个角色 Agent，基于 Pi Agent SDK；每一组原子修改都由人工批准。",
      impact: "评测：专家协作多花 3.7 倍 token、质量无提升 → 不上线",
      detail:
        "按阶段配置工具白名单；固定、带版本的知识前缀保证 prompt 缓存命中；工作区文件是唯一事实来源，上下文压缩后重新挂载；会话为只追加的 JSONL 并有检查点。OpenTelemetry 指标驱动告警（Agent 运行失败率、人工决策积压），另有只追加的审计日志。评测框架对比了单 Lead 与专家协作两种模式的质量、token 与延迟：专家模式多花 3.7 倍 token 却没有可测量的提升，因此生产环境保持单 Lead。",
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
      "A breadth scan, then parallel per-section depth agents on Stagehand and Playwright in AgentBay cloud sandboxes, with a coverage ledger and retry rounds, a risk gate before data-changing actions, hard payment blocks and memory compaction for long runs. When the agent hits a login wall, a person signs in on the same browser profile over CDP and the agent restores the session and carries on. Explore, record and render run as BullMQ jobs behind an OpenAI / Anthropic / Gemini gateway; GSAP and Remotion render agents compose the final video. 209 commits, ~500 tests.",
    stack: ["Node.js", "Stagehand", "Playwright", "AgentBay", "BullMQ", "Remotion"],
    links: [],
    zh: {
      role: "创始人 · 独立工程师",
      summary: "输入网址，输出产品 Demo 视频——浏览器 Agent 在云端沙箱里探索产品、录制演示，再渲染成片。",
      impact: "入选蚂蚁集团蚂上加速器 · 有试用客户",
      detail:
        "先做广度扫描，再按版块并行派出深度探索 Agent（Stagehand + Playwright，运行在 AgentBay 云沙箱），配合覆盖账本与补漏重试、修改数据前的风险闸门、支付硬拦截，以及长任务的记忆压缩。遇到登录墙时，用户通过 CDP 在同一个浏览器 profile 中登录，Agent 恢复会话后继续。探索、录制、渲染都是 BullMQ 任务，统一接入 OpenAI / Anthropic / Gemini 网关；GSAP 与 Remotion 渲染 Agent 合成最终视频。209 次提交，约 500 个测试。",
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
    impact: "175★ · 33 forks · grown by my own promotion",
    detail:
      "17 role agents and 25 skills. A review director gates every episode, and failures loop back for rewrite and re-review. The next phase is derived from which files exist, and per-project agent state lets work resume within an episode and reset between episodes to avoid context overflow. Hybrid ChromaDB + jieba TF-IDF retrieval grounds the writing in reference scripts.",
    stack: ["Agent Skills", "Python", "ChromaDB", "Claude Code", "Codex"],
    links: [{ label: "github", href: "https://github.com/Supreme-Ultimate/novel-to-script-team" }],
    zh: {
      name: "小说改编多 Agent 团队",
      role: "作者 · 维护者",
      summary: "开源的多 Agent 框架，运行在 Claude Code 或 Codex 里，把小说改编成剧集——从分析、分集规划到剧本、审稿和分镜。",
      impact: "175★ · 33 个 fork · 靠自己推广",
      detail:
        "17 个角色 Agent、25 个 Skill。审稿总监把关每一集，不通过就打回重写再审。下一阶段由已存在的文件推导，每个项目有独立的 Agent 状态，同一集内可断点续写，跨集时重置以避免上下文溢出。ChromaDB + jieba TF-IDF 混合检索，用参考剧本为写作提供依据。",
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
    impact: "24★ · 107 end-to-end tests",
    detail:
      "Each shot is analysed for size, camera movement, lighting and narrative function and aligned with its transcript, plus a whole-film continuity report. Long videos route to a single whole-video pass or overlapping chunked passes, with deduplicated transcripts, bounded model concurrency and retries. RQ workers stream SSE progress that survives a page refresh.",
    stack: ["FastAPI", "Redis / RQ", "React", "TypeScript", "Qwen"],
    links: [{ label: "github", href: "https://github.com/Supreme-Ultimate/shotloom" }],
    zh: {
      name: "ShotLoom 拉片台",
      role: "作者 · 维护者",
      summary: "上传一部片子，得到逐镜头拉片——镜头检测、Qwen 视觉分析与语音识别对齐在同一条可检查的时间线上，可导出 Excel 或 PDF。",
      impact: "24★ · 107 个端到端测试",
      detail:
        "逐镜头分析景别、运镜、光线与叙事功能并对齐台词，另生成全片连贯性报告。长视频按长度走整片一次分析或重叠分段分析，台词去重、模型并发有上限并支持重试。RQ Worker 通过 SSE 推送进度，刷新页面也不会丢。",
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
    impact: "in production",
    detail:
      "The uploader persists its intent and takes a one-time authorization before every irreversible write; a lost receipt triggers read-only reconciliation instead of a resubmit; per-file checkpoints skip published files after a restart; and a failing drama is quarantined while the rest of the queue carries on. The redaction pipeline detects and masks 13 object classes, with a Label Studio annotation loop, RF-DETR fine-tuning and TensorRT export, a lease-based job API and a timeline review UI.",
    stack: ["C# / .NET", "SQLite", "FastAPI", "React", "RF-DETR", "TensorRT"],
    links: [],
    zh: {
      name: "唯西生产工具",
      role: "Agent 工程师 · 唯西",
      summary: "两个每天在线运行的工具：一个无人值守地把短剧素材上传到广告平台并送审，一个用 GPU 自动为视频打码。",
      impact: "已上线",
      detail:
        "上传工具在每次不可逆写入前先持久化意图并领取一次性授权；回执丢失时只做只读核对，绝不盲目重提；按文件设检查点，重启后跳过已发布的文件；某部剧出错就单独隔离，其余队列继续运行。打码流水线识别并遮挡 13 类目标，包含 Label Studio 标注闭环、RF-DETR 微调与 TensorRT 导出、基于租约的任务 API 和时间轴审核界面。",
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
      "Ontology-driven writer/director agent: multimodal video analysis becomes evidence-anchored event graphs that a tool-using writer agent drafts from.",
    impact: "14 ablation / LLM-judge experiments decide what stays",
    detail:
      "Nine least-privilege tools over frozen, provenance-labelled context (observation, interpretation, inference, proposal). The experiments included a 2,560-judgment A/A reliability check on the LLM judge; prompt mechanisms that showed no measurable gain were removed.",
    stack: ["TanStack Start", "Vercel AI SDK", "PostgreSQL", "pgvector", "Qwen"],
    links: [],
    zh: {
      name: "唯灵创意引擎",
      role: "Agent 工程师 · 唯西",
      summary: "本体驱动的编导 Agent：多模态视频分析生成带证据锚点的事件图谱，再由会用工具的写作 Agent 据此出稿。",
      impact: "14 组消融 / LLM 评审实验决定保留什么",
      detail:
        "9 个最小权限工具，作用在冻结且标注了来源类型（观察、解读、推断、提议）的上下文上。实验包括对 LLM 评审做 2,560 次判断的 A/A 一致性检验；没有可测量收益的提示机制都被删除。",
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
      "Pay for an AI deliverable, not a chatbot: agent jobs run in an AgentSkillOS runtime while escrow, refunds and revenue sharing settle on HashKey Chain.",
    impact: "2nd · DeFi Track, HashKey Chain Horizon Hackathon 2026",
    detail:
      "The FastAPI backend dispatches paid jobs to an AgentSkillOS subprocess that streams DAG status, logs and artifacts back, keeping agent execution apart from seven Foundry contracts for escrow, settlement, refunds and machine revenue claims. 173 commits.",
    stack: ["FastAPI", "AgentSkillOS", "Solidity", "Foundry"],
    links: [{ label: "github", href: "https://github.com/Contrarian3-Labs/OutcomeX" }],
    zh: {
      role: "独立开发者",
      summary: "为 AI 交付结果付费，而不是为聊天付费：Agent 任务在 AgentSkillOS 中执行，托管、退款与收益分成在 HashKey Chain 上结算。",
      impact: "HashKey Chain Horizon 黑客松 2026 · DeFi 赛道第二名",
      detail:
        "FastAPI 后端把付费任务派发给 AgentSkillOS 子进程，实时回传 DAG 状态、日志与产物；Agent 执行与 7 个负责托管、结算、退款和机器收益领取的 Foundry 合约相互隔离。173 次提交。",
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
      "Speech is routed to trading tools (feed, portfolio, watchlist, buy and sell) depending on the current screen, with paper and real trading. The LVGL interface is shared between the firmware and a desktop simulator. Later extracted into DeviceKit, an open framework with pluggable chain, ASR, LLM and TTS adapters and OTA updates.",
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
        "根据当前页面把语音指令路由到交易工具（行情、持仓、自选、买卖），支持模拟盘与实盘。LVGL 界面在固件和桌面模拟器之间共用。之后抽象为开源框架 DeviceKit，可插拔链、ASR、LLM、TTS 适配器，并支持 OTA 升级。",
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
      "Rebuilt the zkWASM browser SDK from scratch (unified wallet context, L1/L2 signing and deposits) and wrote the dApp-starter CLI; maintained the TypeScript mini-rollup services for deposits and settlement. Solo-built staking, launchpad, prediction-market and social-binder apps, plus the zkWASM Hub site and developer docs, and ran DevOps for 8+ ecosystem apps. Led the team that built a hosted Kubernetes deployment platform with GitHub integration, Helm jobs, async status and log tracking, and CI/CD.",
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
        "从零重写 zkWASM 浏览器 SDK（统一钱包上下文、L1/L2 签名与充值），编写 dApp 脚手架 CLI，维护负责充值与结算的 TypeScript mini-rollup 服务。独立开发 Staking、Launchpad、预测市场与社交绑定应用，以及 zkWASM Hub 官网与开发者文档，并负责 8+ 个生态应用的运维。带队搭建托管式 Kubernetes 部署平台：GitHub 集成、Helm 任务、异步状态与日志追踪、CI/CD。",
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
