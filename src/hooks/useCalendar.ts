import { useState } from "react";
import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, isSameDay, startOfMonth } from "date-fns";
import { getScheduleList } from "../api/calendar";
import type { DateList, Schedule } from "../types/calendar";

type PropsType = {
  currentDate: Date;
};

export const useCalendar = ({ currentDate }: PropsType) => {
  const [scheduleList, setScheduleList] = useState<Schedule[]>(getScheduleList);

  const monthOfSundayList = eachWeekOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });
  const dateList: DateList = monthOfSundayList.map((weekStart) =>
    eachDayOfInterval({
      start: weekStart,
      end: endOfWeek(weekStart),
    }).map((date) => ({
      date,
      schedules: scheduleList.filter((schedule) => isSameDay(schedule.date, date)),
    })),
  );

  const addSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => [...prevScheduleList, schedule]);
  };

  const updateSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => prevScheduleList.map((item) => (item.id === schedule.id ? { ...item, ...schedule } : item)));
  };

  const deleteSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => prevScheduleList.filter((item) => item.id !== schedule.id));
  };

  return {
    dateList,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
