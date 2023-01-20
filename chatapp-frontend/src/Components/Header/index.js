import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Header = () => {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  const handleLogout = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/signout`,
      { userCredentials: true }
    );
    if (response) {
      removeCookie("accessToken");
      navigate("/login");
    }
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        ChatApp
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <button onClick={handleLogout}>Login/Logout</button>
      </div>
    </nav>
  );
};

export default Header;
