import { useState } from "react";
import styles from "./auth.module.scss";
import reset from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../componets/card/Card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../componets/loader/Loader";

function Reset() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Check Your mail for reset.");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={reset} alt="" width="400" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2 className="">Reset Password</h2>
            <form onSubmit={resetPassword}>
              <input
                type="text"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Reset
              </button>
              <ToastContainer />
              <div className={styles.links}>
                <p>
                  <Link to="/login">Login</Link>
                </p>
                <p>
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
}

export default Reset;
