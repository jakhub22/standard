import React, { createContext, useContext, useEffect, useState } from 'react';
import { routes } from '@/src/routes';

const MainContext = createContext({});

export default function MainProvider({ children }) {
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [collapse, setcollapse] = useState(false);
    const [breadCrumbList, setBreadCrumbList] = useState([
        {
            title: <a href="/">Нүүр</a>,
        },
    ]);
    const [routers, setRouters] = useState([]);

    useEffect(() => {
        let keyCount = 1;
        let newRoutes = routes;
        addKeys(newRoutes);

        function addKeys(routes1) {
            routes1.forEach((item) => {
                item.key = keyCount.toString();
                keyCount++;

                if (item.children) {
                    addKeys(item.children);
                }
            });
        }
        setRouters([...newRoutes]);
    }, [routes]);

    function changeMenu(key) {
        console.log(key, 'key');
        console.log(routers, 'routers');
        var a = routers.find((x) => x.key === key);
        console.log(a, 'AA');
    }

    return (
        <MainContext.Provider
            value={{
                selectedMenu,
                setSelectedMenu,
                collapse,
                setcollapse,
                breadCrumbList,
                changeMenu,
                routers,
            }}
        >
            {children}
        </MainContext.Provider>
    );
}

export const useMain = () => useContext(MainContext);
