import { useLoginUser } from "../../hooks/useLoginUser";

export const CalendarPage = () => {
  const { loginUser } = useLoginUser();

  return (
    <div>
      <p>{loginUser.id}</p>
      <p>{loginUser.name}</p>
    </div>
  );
};
