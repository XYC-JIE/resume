// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: '技能特长',
    closeLabel: '返回',
    openLabel: '查看详情',
    hint: '继续下滑',
    awardsLabel: '荣誉',
    visitLabel: '相关链接',
    detailPlaceholder: '技能说明（可后续补充）',
    phImageLabel: '示意图',
    phButtonLabel: '相关链接',
    countLabel: (n) => `${n} 项技能`,
    sections: [
      {
        id: 'data',
        no: '01',
        title: '数据分析',
        tagline: 'SQL · Excel',
        items: [
          { name: 'SQL 数据处理', meta: '复杂查询 · 多表关联', tags: ['数据清洗', '趋势分析'] },
          { name: 'Excel 分析', meta: '透视表 · 函数', tags: ['报表制作', '数据整理'] },
        ],
      },
      {
        id: 'viz',
        no: '02',
        title: '数据可视化',
        tagline: 'Tableau',
        items: [
          { name: 'Tableau 看板', meta: '可交互业务看板', tags: ['Dashboard', '数据呈现'] },
          { name: 'Python 图表', meta: 'Matplotlib · Seaborn', tags: ['可视化'] },
        ],
      },
      {
        id: 'python',
        no: '03',
        title: 'Python 开发',
        tagline: 'Pandas · NumPy',
        items: [
          { name: '数据处理', meta: 'Pandas · NumPy', tags: ['数据清洗', '分析'] },
          { name: '可视化', meta: 'Matplotlib · Seaborn', tags: ['图表'] },
        ],
      },
      {
        id: 'product',
        no: '04',
        title: '产品与 AI 协作',
        tagline: 'Axure · Claude Code',
        items: [
          { name: '产品原型', meta: 'UML · Axure · 墨刀', tags: ['交互设计'] },
          { name: 'AI 协作', meta: 'Claude Code · DeepSeek', tags: ['WorkBuddy', '效率提升'] },
        ],
      },
    ],
  },
  en: {
    title: 'Skills',
    closeLabel: 'Back',
    openLabel: 'Details',
    hint: 'Keep scrolling',
    awardsLabel: 'Honors',
    visitLabel: 'Visit',
    detailPlaceholder: 'Skill description (to be added)',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link',
    countLabel: (n) => `${n} skills`,
    sections: [
      {
        id: 'data',
        no: '01',
        title: 'Data Analysis',
        tagline: 'SQL · Excel',
        items: [
          { name: 'SQL Processing', meta: 'Complex queries · Joins', tags: ['Cleaning', 'Trend analysis'] },
          { name: 'Excel Analysis', meta: 'Pivot tables · Formulas', tags: ['Reports'] },
        ],
      },
      {
        id: 'viz',
        no: '02',
        title: 'Data Visualization',
        tagline: 'Tableau',
        items: [
          { name: 'Tableau Dashboards', meta: 'Interactive dashboards', tags: ['Dashboard'] },
          { name: 'Python Charts', meta: 'Matplotlib · Seaborn', tags: ['Charts'] },
        ],
      },
      {
        id: 'python',
        no: '03',
        title: 'Python',
        tagline: 'Pandas · NumPy',
        items: [
          { name: 'Data Processing', meta: 'Pandas · NumPy', tags: ['Cleaning', 'Analysis'] },
          { name: 'Visualization', meta: 'Matplotlib · Seaborn', tags: ['Charts'] },
        ],
      },
      {
        id: 'product',
        no: '04',
        title: 'Product & AI',
        tagline: 'Axure · Claude Code',
        items: [
          { name: 'Prototyping', meta: 'UML · Axure · Moqups', tags: ['UX design'] },
          { name: 'AI Collaboration', meta: 'Claude Code · DeepSeek', tags: ['WorkBuddy'] },
        ],
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}
