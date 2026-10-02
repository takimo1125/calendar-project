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
  updateSchedule: (schedule: Schedule) => void;
  selectedSchedule: Schedule | null;
  setIsEdit: (isEdit: boolean) => void;
};

export const useUpdateSchedule = ({ closeModal, updateSchedule, selectedSchedule, setIsEdit }: PropsType) => {
  const [editSchedule, setEditSchedule] = useState<NewSchedule>({
    title: selectedSchedule?.title ?? "",
    date: format(selectedSchedule?.date ?? new Date(), "yyyy-MM-dd"),
    description: selectedSchedule?.description ?? "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const changeEditSchedule = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setEditSchedule({ ...editSchedule, [name]: value });
  };

  const handleUpdateSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, date, description } = editSchedule;
    if (title === "") {
      setErrorMessage("タイトルを入力してください");
      return;
    } else {
      setErrorMessage("");
    }
    const schedule: Schedule = {
      id: selectedSchedule?.id ?? 100001,
      title,
      date: parse(date, "yyyy-MM-dd", new Date()),
      description: description,
    };
    updateSchedule(schedule);
    setEditSchedule({
      title: "",
      date: format(new Date(), "yyyy-MM-dd"),
      description: "",
    });
    setEditSchedule(INIT_SCHEDULE);
    setIsEdit(false);
    closeModal();
  };

  return {
    errorMessage,
    editSchedule,
    changeEditSchedule,
    handleUpdateSchedule,
  };
};
