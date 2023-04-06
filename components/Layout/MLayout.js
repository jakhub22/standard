import React from 'react';
import { getBodyHeight } from '@/tools/customFunctions';
import { useMain } from '@/contexts/main';
import MHeader from './MHeader';
import MSidebar from './MSidebar';
import { Layout } from 'antd';

export default function MLayout({ children }) {
    const { collapse } = useMain();
    const maxHeight = getBodyHeight(0);

    return (
        <div className="h-screen w-full overflow-hidden">
            <MHeader />
            <div className="flex">
                <div
                    style={{ height: maxHeight }}
                    className={`${
                        collapse ? 'w-2/11' : 'w-2/11'
                    }  overflow-auto`}
                >
                    <MSidebar />
                </div>
                <div
                    style={{ height: maxHeight }}
                    className="w-10/11 overflow-auto border-l p-5"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
