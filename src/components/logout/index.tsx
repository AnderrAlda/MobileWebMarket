import { useNavigate } from "react-router";
import { UserKey, resetUser } from "../../redux/states/user";
import { clearLocalStorage } from "../../utils/localStorage";

import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logOut = () => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate("/login");
  };

  return (
    <button onClick={logOut} className="text-white">
      Log out
    </button>
  );
};

export default Logout;
