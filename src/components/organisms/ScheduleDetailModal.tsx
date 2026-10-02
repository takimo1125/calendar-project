import Modal from "react-modal";
import type { Schedule } from "../../types/calendar";
import { ScheduleDetail } from "../molecules/ScheduleDetail";
import { ScheduleEditForm } from "../molecules/ScheduleEditForm";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { useState } from "react";
import { useDeleteSchedule } from "../../hooks/useDeleteSchedule";

type PropsType = {
  selectedSchedule: Schedule | null;
  closeModal: () => void;
  updateSchedule: (schedule: Schedule) => void;
  deleteSchedule: (schedule: Schedule) => void;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "30%",
    transform: "translate(-50%, -50%)",
  },
};

export const ScheduleDetailModal = ({ selectedSchedule, closeModal, updateSchedule, deleteSchedule }: PropsType) => {
  const [isEdit, setIsEdit] = useState(false);
  const { errorMessage, handleDeleteSchedule } = useDeleteSchedule({ closeModal, deleteSchedule });
  return (
    <Modal isOpen={!!selectedSchedule} style={customStyles} onRequestClose={closeModal}>
      <div className="flex flex-col gap-5">
        {isEdit ? (
          <>
            <div className="flex justify-center">
              <PrimaryBtn size="lg" onClick={() => setIsEdit(false)}>
                詳細へ戻る
              </PrimaryBtn>
            </div>
            <ScheduleEditForm selectedSchedule={selectedSchedule} updateSchedule={updateSchedule} closeModal={closeModal} />
          </>
        ) : (
          <>
            {errorMessage !== "" && <div className="p-5 mb-5 bg-red-500 text-white text-center rounded-lg">{errorMessage}</div>}
            <div className="flex justify-center gap-2">
              <PrimaryBtn size="lg" onClick={() => setIsEdit(true)}>
                編集
              </PrimaryBtn>
              <PrimaryBtn size="lg" onClick={() => handleDeleteSchedule(selectedSchedule)}>
                予定を削除
              </PrimaryBtn>
            </div>
            <ScheduleDetail selectedSchedule={selectedSchedule} />
          </>
        )}
      </div>
    </Modal>
  );
};
