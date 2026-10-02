import type { Schedule } from "../types/calendar";
import { useState } from "react";

type PropsType = {
  closeModal: () => void;
  deleteSchedule: (schedule: Schedule) => void;
};

export const useDeleteSchedule = ({ closeModal, deleteSchedule }: PropsType) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleDeleteSchedule = (schedule: Schedule | null) => {
    if (schedule == null) {
      setErrorMessage("スケジュールが存在しません");
      return;
    } else {
      setErrorMessage("");
      deleteSchedule(schedule);
      closeModal();
    }
  };

  return {
    errorMessage,
    handleDeleteSchedule,
  };
};
