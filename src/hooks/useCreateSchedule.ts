import { format, parse } from "date-fns";
import type { NewSchedule, Schedule } from "../types/calendar";
import { useState, type ChangeEvent, type FormEvent } from "react";

const INIT_SCHEDULE: NewSchedule = {
  title: "",
  date: format(new Date(), "yyyy-MM-dd"),
  description: "",
};

type PropsType = {
  closeModal: () => void;
  addSchedule: (schedule: Schedule) => void;
};

export const useCreateSchedule = ({ closeModal, addSchedule }: PropsType) => {
  const [newSchedule, setNewSchedule] = useState<NewSchedule>(INIT_SCHEDULE);
  const [errorMessage, setErrorMessage] = useState("");

  const changeNewSchedule = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };
  const handleCreateSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, date, description } = newSchedule;
    if (title === "") {
      setErrorMessage("タイトルを入力してください");
      return;
    } else {
      setErrorMessage("");
    }
    const schedule: Schedule = {
      id: 100001,
      title,
      date: parse(date, "yyyy-MM-dd", new Date()),
      description: description,
    };
    addSchedule(schedule);
    setNewSchedule({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
    });
    setNewSchedule(INIT_SCHEDULE);
    closeModal();
  };

  return {
    errorMessage,
    newSchedule,
    changeNewSchedule,
    handleCreateSchedule,
  };
};
