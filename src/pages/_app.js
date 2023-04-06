import { ConfigProvider } from 'antd';
import mnMN from 'antd/lib/locale/mn_MN';
import NextNProgress from 'nextjs-progressbar';
import AuthProvider from '@/contexts/auth';
import MainProvider from '@/contexts/main';
import MLayout from '@/components/Layout/MLayout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <ConfigProvider locale={mnMN}>
            <AuthProvider>
                <MainProvider>
                    <NextNProgress
                        color="#21cda8"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={false}
                    />
                    <MLayout>
                        <Component {...pageProps} />
                    </MLayout>
                </MainProvider>
            </AuthProvider>
        </ConfigProvider>
    );
}
