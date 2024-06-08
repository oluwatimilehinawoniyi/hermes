import style from "./stats.module.css";

interface ItemProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isLink?: boolean;
  stat: number | string;
  colour: string;
}

export default function OverviewStatItem({
  title,
  stat,
  icon: Icon,
  colour,
}: ItemProps): React.JSX.Element {
  return (
    <div className={style.statsHolder}>
      <div>
        <p>{title}</p>
        <h1>{stat}</h1>
      </div>
      <div className={style.iconHolder}>
        <Icon width={24} fill={colour} />
      </div>
    </div>
  );
}
