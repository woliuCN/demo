import React from 'react';
import { Input } from 'antd';
import { Tree } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';

const { Search } = Input;
function TreeSelect(props) {
    const {searchTableDataByclickNode} = props;
    const onSelect = (selectedKeys, info) => {
        sessionStorage.setItem('query',info.node.title);
        if(info.node.title==='救灾物品'){
            sessionStorage.setItem('query','');
        }
        searchTableDataByclickNode(info.node.title);
    };
    const treeData = [
        {
            title: '救灾物品',
            key: '0-0',
            icon: <CarryOutOutlined />,
            children: [
                {
                    title: '居住类',
                    key: '0-0-0',
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            title: '救灾帐篷',
                            key: '0-0-0-0',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '移动桌子',
                            key: '0-0-0-1',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '折叠床',
                            key: '0-0-0-2',
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    title: '床上用品类',
                    key: '0-0-1',
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            title: '棉被',
                            key: '0-0-1-0',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '毛毯',
                            key: '0-0-1-1',
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    title: '衣着类',
                    key: '0-0-2',
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            title: '毛衣',
                            key: '0-0-2-0',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '棉裤',
                            key: '0-0-2-1',
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    title: '救灾设备类',
                    key: '0-0-3',
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            title: '灭火器',
                            key: '0-0-3-0',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '铲子',
                            key: '0-0-3-1',
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
                {
                    title: '基本生活类',
                    key: '0-0-4',
                    icon: <CarryOutOutlined />,
                    children: [
                        {
                            title: '方便面',
                            key: '0-0-4-0',
                            icon: <CarryOutOutlined />,
                        },
                        {
                            title: '矿泉水',
                            key: '0-0-4-1',
                            icon: <CarryOutOutlined />,
                        },
                    ],
                },
            ],
        },
    ];
    return (
        <div>
            <Search
                placeholder="请输入要搜索的物资"
                onSearch={value => console.log(value)}
                style={{ width: '100%' }}
            />
            <Tree
                showLine={true}
                showIcon={false}
                defaultExpandedKeys={['0-0']}
                onSelect={onSelect}
                treeData={treeData}
            />
        </div>

    )
}

export default TreeSelect