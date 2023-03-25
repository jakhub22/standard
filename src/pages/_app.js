import { ConfigProvider } from 'antd';
import mnMN from 'antd/lib/locale/mn_MN';
import AuthProvider from '@/contexts/auth';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <ConfigProvider locale={mnMN}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ConfigProvider>
    );
}
