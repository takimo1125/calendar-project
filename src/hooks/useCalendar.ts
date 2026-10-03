import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, isSameDay, startOfMonth } from "date-fns";
import type { DateList, Schedule } from "../types/calendar";

type PropsType = {
  currentDate: Date;
  scheduleList: Schedule[];
  setScheduleList: Dispatch<SetStateAction<Schedule[]>>;
};

export const useCalendar = ({ currentDate, scheduleList, setScheduleList }: PropsType) => {
  const [dateList, setDateList] = useState<DateList>([]);

  const getDateListIndex = (currentDateList: DateList, schedule: Schedule): number[] => {
    const firstIndex = currentDateList.findIndex((oneWeek) => {
      return oneWeek.some((item) => isSameDay(item.date, schedule.date));
    });
    if (firstIndex === -1) return [-1, -1];
    const secondIndex = currentDateList[firstIndex].findIndex((item) => {
      return isSameDay(item.date, schedule.date);
    });
    if (secondIndex === -1) return [-1, -1];
    const thirdIndex = currentDateList[firstIndex][secondIndex].schedules.findIndex((item) => {
      return item.id === schedule.id;
    });
    return [firstIndex, secondIndex, thirdIndex];
  };

  const addSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => [...prevScheduleList, schedule]);
  };

  const updateSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => prevScheduleList.map((item) => (item.id === schedule.id ? { ...item, ...schedule } : item)));
  };

  const deleteSchedule = (schedule: Schedule) => {
    setScheduleList((prevScheduleList) => prevScheduleList.filter((item) => item.id !== schedule.id));
  };

  useEffect(() => {
    const monthOfSundayList = eachWeekOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
    const newDateList: DateList = monthOfSundayList.map((date) => {
      return eachDayOfInterval({
        start: date,
        end: endOfWeek(date),
      }).map((date) => ({ date, schedules: [] as Schedule[] }));
    });
    scheduleList.forEach((schedule) => {
      const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
      if (firstIndex === -1) return;

      newDateList[firstIndex][secondIndex].schedules = [...newDateList[firstIndex][secondIndex].schedules, schedule];
    });

    setDateList(newDateList);
  }, [currentDate, scheduleList]);

  return {
    dateList,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
