import { createContext, useContext, useState } from 'react';

const RenderContext = createContext();

function RenderProvider({ children }) {
  const [reload, setReload] = useState(false);

  return (
    <RenderContext.Provider value={[reload, setReload]}>
      {children}
    </RenderContext.Provider>
  );
}

function useRender() {
  return useContext(RenderContext);
}

export { RenderProvider, useRender };
