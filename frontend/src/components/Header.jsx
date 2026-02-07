import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

export default function Header() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="app-header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Mini Task Manager</h1>
      </div>

      <div className="header-right">
        {user && <span className="user-name">Hi, {user.name}  </span>}
        <LogoutButton />
      </div>
    </header>
  );
}