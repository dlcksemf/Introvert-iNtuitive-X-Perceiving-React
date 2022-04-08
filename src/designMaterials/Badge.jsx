function Badge({ children, color }) {
  // bg-yellow-100 bg-red-100 bg-green-100 bg-indigo-100
  // text-yellow-800 text-red-800 text-green-800 text-indigo-800

  return (
    <span
      className={`bg-${color}-100 text-${color}-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded h-6`}
    >
      {children}
    </span>
  );
}

export default Badge;
