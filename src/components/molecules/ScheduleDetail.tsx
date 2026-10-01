import { format } from "date-fns";
import type { Schedule } from "../../types/calendar";

type PropsType = {
  selectedSchedule: Schedule | null;
};

export const ScheduleDetail = ({ selectedSchedule }: PropsType) => {
  return (
    <>
      {selectedSchedule && (
        <div className="flex flex-col gap-8">
          <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">{selectedSchedule.title}</h3>
          <p>{format(selectedSchedule.date, "yyyy年M月d日")}</p>
          <p>{selectedSchedule.description}</p>
        </div>
      )}
    </>
  );
};
