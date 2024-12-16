const Loader = ({ type="normal" }) => {
  return (
    <div className={type === "normal" ? "lds-ellipsis" : type === "small" ? "lds-ellipsis-small" : ""}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
