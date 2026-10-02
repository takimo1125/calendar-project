import { useUpdateSchedule } from "../../hooks/useUpdateSchedule";
import type { Schedule } from "../../types/calendar";
import { Input } from "../atoms/Input";
import { PrimaryBtn } from "../atoms/PrimaryBtn";
import { Textarea } from "../atoms/Textarea";

type PropsType = {
  selectedSchedule: Schedule | null;
  closeModal: () => void;
  updateSchedule: (schedule: Schedule) => void;
  setIsEdit: (isEdit: boolean) => void;
};
export const ScheduleEditForm = ({ selectedSchedule, closeModal, updateSchedule, setIsEdit }: PropsType) => {
  const { editSchedule, errorMessage, changeEditSchedule, handleUpdateSchedule } = useUpdateSchedule({ closeModal, updateSchedule, selectedSchedule, setIsEdit });
  return (
    <>
      <div>
        <h3 className="text-center text-3xl text-lime-800 font-bold pb-5">予定更新</h3>
        {errorMessage !== "" && <div className="p-5 mb-5 bg-red-500 text-white text-center rounded-lg">{errorMessage}</div>}
        <form className="flex flex-col gap-8" onSubmit={handleUpdateSchedule}>
          <div className="w-[100%] flex items-center">
            <label htmlFor="title-form" className="w-[30%] text-lime-800">
              タイトル
            </label>
            <Input id="title-form" name="title" type="text" value={editSchedule.title} onChange={changeEditSchedule} />
          </div>
          <div className="w-[100%] flex items-center">
            <label htmlFor="description-form" className="w-[30%] text-lime-800">
              内容
            </label>
            <Textarea name="description" value={editSchedule.description} onChange={changeEditSchedule} />
          </div>
          <div className="flex justify-center">
            <PrimaryBtn size="lg" onClick={() => null}>
              更新
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </>
  );
};
