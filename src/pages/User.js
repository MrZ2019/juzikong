
import React from 'react'

import {connect} from 'react-redux'
import {Tabs} from 'antd'

import {Link} from 'react-router-dom'

import imgAvatar from '../assets/avatar.jpeg'
import { PlusOutlined } from '@ant-design/icons'
import './User.less'

import CreateCollectionModal from '../modals/CreateCollection'

import request from '../request'
import {PIC_PATH} from '../config'
import bus from '../bus'
const {TabPane} = Tabs


class UserPage extends React.PureComponent {

    // fetchCollection() {
    //     return request.get('/collection/query').then((res) => {
    //         console.log(res)
    //         return res
    //     }).then((res) => {
    //         this.props.dispatch({
    //             type: 'SET_COLLECTION',
    //             payload: res
    //         })
    //     });
    // }

    componentDidMount() {
        // this.fetchCollection()
        bus.emit('fetchCollection')
    }

    onChange() {}

    showCreateCollection() {
        this.refs.createCollectionModal.showModal()
    }
    render() {
        return (
            <div className="user-page">
                <CreateCollectionModal ref="createCollectionModal"></CreateCollectionModal>
                <div className="top">
                    <div className="col col-6">
                        <img src={imgAvatar} alt="" className="avatar" />
                    </div>
                    <div className="col col-18">
                        <div className="row">
                            <div className="username">北陌</div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <Tabs defaultActiveKey="1" onChange={this.onChange}>
                        <TabPane tab="专辑" key="1">
                            <div className="collection-list">
                            <div className="btn-create-collection" onClick={this.showCreateCollection.bind(this)}>
                            <PlusOutlined></PlusOutlined>
                                <span className="text">创建专辑</span>
                            </div>

                            {
                                
                                this.props.collection.map((item) => (
                                    <div className="item">
                                        <Link to={`/collection/${item.id}`}>
                                        <div className="img-box">
                                            <img src={PIC_PATH + item.cover_file} alt="" className="cover"/>
                                        </div>
                                        </Link>
                                        <div className="info-box">
                                            <span className="name">{item.name}</span>
                                            <span className="total">{item.rows || 0}条句子</span>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </TabPane>
                        <TabPane tab="句子" key="2"></TabPane>
                        <TabPane tab="喜欢" key="3"></TabPane>
                        <TabPane tab="关注的专辑" key="4"></TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        collection: state.collection.data || []
    }
}
export default connect(mapStateToProps)(UserPage)