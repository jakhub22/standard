import { Layout, Menu } from 'antd';
import { useEffect } from 'react';
import { routes } from '@/src/routes';
import { useMain } from '@/contexts/main';

const { Sider } = Layout;

export default function MSidebar() {
    const { collapse, setcollapse } = useMain();

    useEffect(() => {
        let keyCount = 1;
        addKeys(routes);

        function addKeys(routes) {
            routes.forEach((item) => {
                item.key = keyCount.toString();
                keyCount++;

                if (item.children) {
                    addKeys(item.children);
                }
            });
        }
    }, [routes]);

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
                    items={routes}
                />
            </Sider>
        </Layout>
    );
}
