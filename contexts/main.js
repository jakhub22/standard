import React, { createContext, useContext, useState } from 'react';

const MainContext = createContext({});

export default function MainProvider({ children }) {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [collapse, setcollapse] = useState(false);

    return (
        <MainContext.Provider
            value={{ selectedMenu, setSelectedMenu, collapse, setcollapse }}
        >
            {children}
        </MainContext.Provider>
    );
}

export const useMain = () => useContext(MainContext);
