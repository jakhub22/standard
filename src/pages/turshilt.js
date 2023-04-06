import React, { createContext, useContext, useState } from 'react';
import TurshiltPage from '../turshilt/TurshiltPage';

const TurshiltCtx = createContext({});

export default function Turshilt() {
    const [turshiltData, setTurshiltData] = useState({});

    function changeState() {
        setTurshiltData({ ...turshiltData });
    }

    return (
        <TurshiltCtx.Provider value={{ turshiltData, changeState }}>
            <TurshiltPage />
        </TurshiltCtx.Provider>
    );
}

export const useTurshiltCtx = () => useContext(TurshiltCtx)
