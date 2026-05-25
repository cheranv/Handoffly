import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const Toaster = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
    }
  }, [show]);

  if (!show && !visible) return null;

  return createPortal(
    <div
      className={`loader-wrapper ${show ? "toast-enter" : "toast-exit"}`}
      onTransitionEnd={() => {
        if (!show) {
          setVisible(false);
        }
      }}
    >
      <svg
        width={"32"}
        height={"32"}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16.0004" cy="15.9999" r="15.225" fill="#4AB216" />
        <path
          d="M23.4957 12.315L14.5748 21.2359C14.4652 21.347 14.3347 21.4353 14.1907 21.4955C14.0467 21.5557 13.8923 21.5867 13.7362 21.5867C13.5802 21.5867 13.4257 21.5557 13.2817 21.4955C13.1377 21.4353 13.0072 21.347 12.8976 21.2359L8.73455 17.0728C8.51215 16.8504 8.38721 16.5488 8.38721 16.2342C8.38721 15.9197 8.51215 15.6181 8.73455 15.3957C8.95695 15.1733 9.25859 15.0483 9.57312 15.0483C9.88764 15.0483 10.1893 15.1733 10.4117 15.3957L13.7362 18.7143L21.8185 10.6379C22.0409 10.4155 22.3426 10.2905 22.6571 10.2905C22.9716 10.2905 23.2733 10.4155 23.4957 10.6379C23.7181 10.8603 23.843 11.1619 23.843 11.4764C23.843 11.791 23.7181 12.0926 23.4957 12.315Z"
          fill="white"
        />
      </svg>{" "}
      <p>Copied to clipboard</p>
    </div>,
    document.body
  );
};

export default Toaster;
