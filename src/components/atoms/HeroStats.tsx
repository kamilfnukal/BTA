import { Stat, StatProps } from './Stat'

type HeroStatsProps = {
  thisMonth: StatProps
  thisYear: StatProps
  allTime: StatProps
}

const HeroStats: React.FC<HeroStatsProps> = ({ thisMonth, thisYear, allTime }) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <Stat title={thisMonth.title} value={thisMonth.value} desc={thisMonth.value} />
      <Stat title={thisYear.title} value={thisYear.value} desc={thisYear.value} />
      <Stat title={allTime.title} value={allTime.value} desc={allTime.value} />
    </div>
  )
}

export { HeroStats }
