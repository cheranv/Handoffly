import "./loader.scss";

const Loader = ({ show = false }) => {
  if (!show) return null;

  return (
    <div className="page-loader">
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
