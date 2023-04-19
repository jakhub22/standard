import { useMain } from '@/contexts/main';
import { Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';

export default function MHeader() {
    const [timeRemaining, setTimeRemaining] = useState(3600);
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const { collapse, breadCrumbList } = useMain();

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeRemaining(timeRemaining - 1);
        }, 1000);

        if (timeRemaining <= 0) {
            clearTimeout(timer);
        }
    }, [timeRemaining]);

    return (
        <div id="MHeader" className="border-b px-4 py-3 pr-7">
            <div className="flex w-full justify-between">
                <div
                    className={`duration-500 ease-in-out ${
                        collapse ? 'w-20' : 'w-72'
                    }`}
                >
                    {collapse ? (
                        <img
                            src="/assets/image/mbank_icon_black.svg"
                            alt="mbank_logo"
                            className="flex h-8 w-8 justify-start"
                        />
                    ) : (
                        <img
                            src="/assets/image/mbank_logo_black.svg"
                            alt="mbank_logo"
                            className="h-8 w-20"
                        />
                    )}
                </div>
                <div className="flex w-full items-center justify-between">
                    <div className="flex">
                        <Breadcrumb items={breadCrumbList} />
                    </div>
                    <div className="flex w-full items-center justify-end gap-7">
                        <div className="text-sm">Central Tower 201</div>
                        <div className="rounded border px-3 py-1 shadow-md">
                            <div
                                className={`font-semibold ${
                                    timeRemaining <= 600 && 'text-red-500'
                                }`}
                            >{`${minutes}:${
                                seconds < 10 ? `0${seconds}` : seconds
                            }`}</div>
                        </div>
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 21h4c0 1.1-.9 2-2 2s-2-.9-2-2m11-2v1H3v-1l2-2v-6c0-3.1 2-5.8 5-6.7V4c0-1.1.9-2 2-2s2 .9 2 2v.3c3 .9 5 3.6 5 6.7v6l2 2m-4-8c0-2.8-2.2-5-5-5s-5 2.2-5 5v7h10v-7Z"
                                />
                            </svg>
                        </div>
                        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-green-500 p-2">
                            <div className="text-sm font-semibold text-white">
                                JB
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
