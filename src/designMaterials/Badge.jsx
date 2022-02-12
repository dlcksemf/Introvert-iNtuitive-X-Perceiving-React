function Badge({ children, color }) {
  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded h-6`}
    >
      {children}
    </span>
  );
}

export default Badge;
