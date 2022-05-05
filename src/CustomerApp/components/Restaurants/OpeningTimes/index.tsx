import { getDay } from "date-fns";
import { OpeningTimeReadDto } from "../../../../common/models/Restaurant";
import OpeningTime from "./OpeningTime";
import classes from "./styles.module.scss";


type Props = {
  openingTimes: OpeningTimeReadDto[];
};

export default function OpeningTimes({ openingTimes }: Props) {
  let currentDayOfWeek = 1
  const todayOpeningTimes = openingTimes.filter(
    (openingTime) => openingTime.dayOfWeek === currentDayOfWeek
  );

  if (todayOpeningTimes.length === 0) {
    return <p>Fermé aujourd'hui</p>;
  }

  return (
    <div className={classes.wrapper}>
      {todayOpeningTimes.map((openingTime, index) => (
        <div key={openingTime.id}>
          <OpeningTime  openingTime={openingTime} />
          {todayOpeningTimes[index + 1] && <span> et </span>}
        </div>
      ))}
    </div>
  );
}
