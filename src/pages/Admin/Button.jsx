const COLORS = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
  success: 'bg-green-500 hover:bg-green-700 text-white',
};

function Button({ type, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${COLORS[type]} font-bold py-2 px-4 mr-3 rounded`}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'primary',
};

export default Button;
