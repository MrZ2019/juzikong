import React from 'react'
import {NavLink, Link} from 'react-router-dom'

import {Input, Button, Dropdown, Menu, Space} from 'antd'
import { DownOutlined} from '@ant-design/icons';

import './Header.less'

import imgLogo from '../assets/logo.png'

import PublishModal from '../modals/Publish'

import {AuthContext} from '../provider'
import bus from '../bus';
class Header extends React.PureComponent {
    static contextType = AuthContext

    // state = {
    //     search: '123'
    // }

    menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  小说摘抄
                </a>
              ),
            },
            {
              key: '2',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                  散文美句
                </a>
              ),
            },
            {
              key: '3',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                  书籍名句
                </a>
              ),
            },
          ]}
        />
      )

    onSearch(value)  {
        bus.emit('fetch-list', value)
    } 

    showPublishModal() {
        this.refs.modalPublish.showModal()
    }

    render() {
        let activeStyle = {
            textDecoration: "underline",
        };

        let activeClassName = "underline";


        return (
            <nav class="header">
                <PublishModal ref="modalPublish"></PublishModal>

                <div className="header-sub">
                <img className="logo" src={imgLogo} alt=""/>
                <span className="desc">收集与分享你喜欢的句子</span>
                <Input.Search className="search" placeholder="搜索..." onSearch={this.onSearch.bind(this)} 
                enterButton />
                <Button type="primary" className="btn-publish" onClick={this.showPublishModal.bind(this)}>发布句子</Button>
                <ul>
                    <li>
                        <Link to="/">首页</Link>
                    </li>
                    <li>
                        <Link to="/mingren">名人</Link>
                    </li>
                    <li>
                        <Link to="/channels/诗词">古诗词</Link>
                    </li>
                    <li>
                    
                    <Dropdown overlay={this.menu} placement="bottomLeft">
                    <Space>
                    <Link to="/channels/诗词">书籍</Link> <DownOutlined />
                    </Space>
      </Dropdown>
                    
                        
                    </li>
                    <li>
                        <Link to="/u">
                        <img src={require('../assets/avatar.jpeg')} alt="" className="avatar"/>
                        <span className="username">{this.context.user}</span>
                        </Link>
                    </li>
                    {/* <li>
                        <NavLink
                            to="add"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            发布
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <NavLink
                            to="list"
                            style={({ isActive }) =>
                                isActive ? activeStyle : undefined
                            }
                        >
                            列表
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="tags">
                            {({ isActive }) => (
                                <span
                                    className={
                                        isActive ? activeClassName : undefined
                                    }
                                >
                                    标签
                                </span>
                            )}
                        </NavLink>
                    </li> */}
                </ul>
                </div>
            </nav>
        );

    }
}

export default Header