import ReactDOM from "react-dom";
import styles from "./loader.module.scss";
import loaderGif from "../../assets/loader.gif";

function Loader() {
  return ReactDOM.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderGif} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export default Loader;
