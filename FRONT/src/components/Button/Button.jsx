import "./Button.css";

const Button = ({ text, icon, onClick, className = "" }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      <span className="text">{text}</span>
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;
