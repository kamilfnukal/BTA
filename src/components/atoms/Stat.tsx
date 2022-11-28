type StatProps = {
  title: string
  value: string
  desc: string
}

const Stat: React.FC<StatProps> = ({ title, value, desc }) => {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  )
}

export { Stat }
export type { StatProps }
