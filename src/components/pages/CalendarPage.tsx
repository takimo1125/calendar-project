import { getMonth } from "date-fns";
import { CalendarHeader } from "../organisms/CalendarHeader";
import { CalendarBody } from "../organisms/CalendarBody";
import { useCalendar } from "../../hooks/useCalendar";
import { useState } from "react";
import { CalendarNav } from "../organisms/CalendarNav";

export const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { dateList, addSchedule, updateSchedule } = useCalendar({ currentDate: currentDate });

  return (
    <>
      <h1 className=" font-bold text-3xl mb-5">{`${getMonth(currentDate) + 1}月`}</h1>
      <CalendarNav setCurrentDate={setCurrentDate} addSchedule={addSchedule} />
      <table className="w-[80%] border-collapse border-2 border-solid border-lime-800 table-fixed">
        <CalendarHeader />
        <CalendarBody currentDate={currentDate} dateList={dateList} updateSchedule={updateSchedule} />
      </table>
    </>
  );
};
