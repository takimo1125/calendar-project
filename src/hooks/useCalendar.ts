import { useEffect, useState } from "react";
import { eachDayOfInterval, eachWeekOfInterval, endOfMonth, endOfWeek, isSameDay, startOfMonth } from "date-fns";
import { getScheduleList } from "../api/calendar";
import type { DateList, Schedule } from "../types/calendar";

type PropsType = {
  currentDate: Date;
};

export const useCalendar = ({ currentDate }: PropsType) => {
  const [dateList, setDateList] = useState<DateList>([]);

  const getDateListIndex = (currentDateList: DateList, schedule: Schedule): number[] => {
    const firstIndex = currentDateList.findIndex((oneWeek) => {
      return oneWeek.some((item) => isSameDay(item.date, schedule.date));
    });
    if (firstIndex === -1) return [-1, -1];
    const secondIndex = currentDateList[firstIndex].findIndex((item) => {
      return isSameDay(item.date, schedule.date);
    });
    return [firstIndex, secondIndex];
  };

  const addSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
    if (firstIndex === -1) return;

    newDateList[firstIndex][secondIndex].schedules = [...newDateList[firstIndex][secondIndex].schedules, schedule];
    setDateList(newDateList);
  };

  const updateSchedule = (schedule: Schedule) => {
    const newDateList = [...dateList];

    const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
    if (firstIndex === -1) return;

    // IDが一致するオブジェクトだけを更新した新しい配列を作る
    newDateList[firstIndex][secondIndex].schedules = newDateList[firstIndex][secondIndex].schedules.map((item) => {
      console.log(item.id, schedule.id);
      if (item.id === schedule.id) {
        return { ...item, ...schedule };
      }
      return item;
    });
    setDateList(newDateList);
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

    const scheduleList = getScheduleList();
    scheduleList.forEach((schedule) => {
      const [firstIndex, secondIndex] = getDateListIndex(newDateList, schedule);
      if (firstIndex === -1) return;

      newDateList[firstIndex][secondIndex].schedules = [...newDateList[firstIndex][secondIndex].schedules, schedule];
    });

    setDateList(newDateList);
  }, [currentDate]);

  return {
    dateList,
    addSchedule,
    updateSchedule,
  };
};
