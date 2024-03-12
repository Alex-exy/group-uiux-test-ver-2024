import "./Loader.css";
const Loader = ({ component }) => {
  return (
    <div
      className={`loader ${
        component === "Products" ? "loader_Products" : "loader_Login"
      }`}
    ></div>
  );
};

export default Loader;