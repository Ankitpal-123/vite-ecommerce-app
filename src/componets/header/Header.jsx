import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER } from "../../redux/slice/AuthSlice";
import { REMOVE_ACTIVE_USER } from "../../redux/slice/AuthSlice";
import ShowOnLigin, { ShowOnLogout } from "../hiddenLinks/HiddedLink";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e <span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={25} />
      <p>0</p>
    </Link>
  </span>
);

const activLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

function Header() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  // monitor current signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            // or  userName: user.displayName || displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfull..");
        navigate("/");
      })
      .catch((error) => {
        toast.success(error.message);
      });
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={28} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={activLink}>
                  Login
                </NavLink>
              </ShowOnLogout>
              <ShowOnLigin>
                <a href="#">
                  <FaUserCircle size={16} />
                  {displayName}
                </a>
              </ShowOnLigin>
              <ShowOnLogout>
                <NavLink to="/register" className={activLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <ShowOnLigin>
                <NavLink to="/order-history" className={activLink}>
                  My Orders
                </NavLink>
              </ShowOnLigin>
              <ShowOnLigin>
                <NavLink to="/" onClick={logoutUser}>
                  Logout
                </NavLink>
              </ShowOnLigin>
              <ToastContainer />
            </span>
            {cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
}

export default Header;
