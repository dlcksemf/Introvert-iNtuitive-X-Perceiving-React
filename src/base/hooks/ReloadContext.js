import { createContext, useContext, useState } from 'react';

const ReloadContext = createContext();

function ReloadProvider({ children }) {
  const [reload, setReload] = useState(false);

  return (
    <ReloadContext.Provider value={[reload, setReload]}>
      {children}
    </ReloadContext.Provider>
  );
}

function useReload() {
  return useContext(ReloadContext);
}

export { ReloadProvider, useReload };
