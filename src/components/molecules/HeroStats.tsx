import { Stat, StatProps } from '../atoms'

type HeroStatsProps = {
  thisMonth: StatProps
  thisYear: StatProps
  allTime: StatProps
}

const HeroStats: React.FC<HeroStatsProps> = ({ thisMonth, thisYear, allTime }) => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow">
      <Stat {...thisMonth} />
      <Stat {...thisYear} />
      <Stat {...allTime} />
    </div>
  )
}

export { HeroStats }
