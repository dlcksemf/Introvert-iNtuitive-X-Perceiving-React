function DebugStates(props) {
  return (
    <div>
      <pre className="h-40 text-xs bg-gray-100 p-1 border border-gray-400 overflow-x-scroll">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
}

export default DebugStates;
