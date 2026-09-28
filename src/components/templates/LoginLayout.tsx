import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLoginUser } from "../../hooks/useLoginUser";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

export const LoginLayout = () => {
  const { loginUser, setLoginUser } = useLoginUser();
  const navitate = useNavigate();

  const handleLogout = () => {
    setLoginUser({ id: 0, name: "" });
    navitate("/login");
  };

  if (loginUser.id === 0) return <Navigate to="/login" />;

  return (
    <div className="relative">
      <header className="bg-white fixed top-0 left-0 right-0 leading-[50px]">
        <div className="sm:container sm:mx-auto flex justify-between">
          <Link to="/">スケジュール管理APP</Link>
          <nav>
            <ul className="flex justify-center gap-5 text-lime-800">
              <li className="flex items-center">
                <FaUser />
                {loginUser.name}
              </li>
              <li className="flex items-center">
                <MdLogout />
                <a onClick={handleLogout}>ログアウト</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="pt-[50px] bg-gradient-to-r from-lime-100 to-lime-200 h-screen flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
};
