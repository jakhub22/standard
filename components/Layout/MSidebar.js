import { Layout, Menu } from 'antd';

import { useMain } from '@/contexts/main';

const { Sider } = Layout;

export default function MSidebar() {
    const { collapse, setcollapse, changeMenu, routers } = useMain();

    return (
        <Layout>
            <Sider
                theme="light"
                collapsible
                collapsed={collapse}
                onCollapse={(value) => setcollapse(value)}
            >
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={routers}
                    onClick={(e) => changeMenu(e.key)}
                />
            </Sider>
        </Layout>
    );
}
