"use client";

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
import 'antd/dist/reset.css';
import styles from './AntdLayout.module.css';

// const styles = {
//   content: {
//     width: '80%',
//     margin: '0 auto',
//     'margin-top': '16px',
//   }
// };

export const AntdLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          style={{lineHeight: '63px' }}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
      <Content className={styles.container}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};
