import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2021 – 2025',
        place: 'Beijing Information Science & Technology University',
        role: 'Information Management & Information Systems · B.S.',
        points: [
          'Core courses: Database Systems, Python Programming, Data Structures, Data Analysis & Mining',
          'Also: Computer Networks, Information Systems Analysis & Design, Java Enterprise Development',
        ],
      },
      {
        period: '2021 – 2023',
        place: 'Youth League Volunteer Service Department',
        role: 'Member → Vice Minister',
        points: [
          'Coordinated multiple campus-wide volunteer events, from planning to on-site execution',
          'Volunteer at the 85th Anniversary celebration, responsible for alumni reception',
        ],
      },
      {
        period: '2025.02 – 2025.07',
        place: 'Beijing Huisheng Zhixin Technology Co., Ltd.',
        role: 'Asset Management Intern',
        points: [
          'Collected and cleaned business data using SQL and Excel; handled document sealing and processing',
          'Gained a deep understanding of the full pipeline from raw data to analysis-ready data',
        ],
      },
      {
        period: '2025.10 – 2026.04',
        place: 'Beijing Changping Shahe Wanda Commercial Management Co., Ltd.',
        role: 'Operations Assistant',
        points: [
          'Collected and organized daily reports; produced weekly and monthly operations analysis reports',
          'Compiled department data and activity information; resolved cross-department operational issues',
          'Organized operations meetings and followed up on key tasks',
        ],
      },
      {
        period: '',
        place: 'Skills',
        role: 'Data Analysis · Visualization · AI Collaboration',
        points: [
          'Data analysis: Proficient in Excel and complex SQL; data cleaning, multi-table joins, trend analysis',
          'Data visualization: Tableau, interactive business dashboards',
          'Python: Pandas/NumPy, Matplotlib/Seaborn',
          'Product design: UML, Axure/Moqups prototypes',
          'AI collaboration: Claude Code, WorkBuddy, DeepSeek',
          'Honors: 2022–2023 Social Contribution Scholarship',
        ],
      },
    ],
  },
  zh: {
    title: '履历',
    entries: [
      {
        period: '2021 – 2025',
        place: '北京信息科技大学',
        role: '信息管理与信息系统 · 本科',
        points: [
          '主修课程：数据库系统、Python 程序设计、数据结构、数据分析与数据挖掘',
          '兼修：计算机网络、信息系统分析与设计、Java 企业级开发与实践',
        ],
      },
      {
        period: '2021 – 2023',
        place: '校团委志愿服务部',
        role: '干事 → 副部长',
        points: [
          '统筹协调多场校级志愿活动，全程参与策划、协调与现场执行',
          '2022 年校庆 85 周年志愿者，负责校友接待，获志愿服务荣誉证书',
        ],
      },
      {
        period: '2025.02 – 2025.07',
        place: '北京汇盛智信科技有限公司',
        role: '资产管理部实习生',
        points: [
          '利用 SQL 与 Excel 完成业务数据收集、清洗及案件用印与处理',
          '深入理解从原始数据到可分析数据的完整处理流程，提升团队协作能力',
        ],
      },
      {
        period: '2025.10 – 2026.04',
        place: '北京昌平沙河万达商业管理有限公司',
        role: '营运助理',
        points: [
          '负责日常报表收集整理，完成营运周报、月报等分析报告制作',
          '统计各部门数据与活动信息，协调解决跨部门营运问题',
          '筹备组织营运会议，督促重点工作任务落实并反馈进展',
        ],
      },
      {
        period: '',
        place: '技能特长',
        role: '数据分析 · 可视化 · AI 协作',
        points: [
          '数据分析：精通 Excel 与复杂 SQL，擅长数据清洗、多表关联及趋势分析',
          '数据可视化：熟练使用 Tableau，将数据转化为可交互业务看板',
          'Python 开发：熟悉 Pandas/NumPy 与 Matplotlib/Seaborn',
          '产品设计：擅长 UML 业务抽象，熟练 Axure/墨刀交互原型',
          'AI 协作：熟练运用 Claude Code、WorkBuddy、DeepSeek',
          '荣誉：2022–2023 学年社会贡献奖学金',
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}
