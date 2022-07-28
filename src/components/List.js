
import React from 'react'
import { connect } from 'react-redux'

import request from '../request'
import bus from '../bus'

import './List.less'

import {Modal} from 'antd'
import {HeartOutlined, PlusOutlined, DeleteOutlined, ExclamationCircleOutlined, HighlightOutlined} from '@ant-design/icons'

import AddToCollection from '../modals/AddToCollection'
import AddTag from '../modals/AddTag'

class ListComponent extends React.PureComponent {

    fetchAll(search='') {
        return request.get('/list?search=' + (search)).then((res) => {
            console.log(res)
            return res
        }).then((res) => {
            this.props.dispatch({
                type: 'SET_LIST',
                payload: res
            })
        });
    }

    showAddCollection(item) {
        this.refs.addToCollection.showModal(item.id)
    }

    removeJuzi(item) {
        Modal.confirm({
            title: '确认删除',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                request.get('/remove?id=' + item.id).then(() => {
                    this.fetchAll()
                })
            }
        });        
    }

    showAddTag(item) {
        this.refs.addTag.showModal(item)
    }

    componentDidMount() {
        this.fetchAll()

        bus.on('fetch-list', (search) => {
            this.fetchAll(search)
        })
    }
    render() {
        return (
            <div className="list-box">
                <AddToCollection ref="addToCollection"></AddToCollection>
                <AddTag ref="addTag"></AddTag>
                {/* <h1 >Test</h1> */}
                <div class="card-list">
                    {
                        this.props.list.map((item) => (
                            <div className="card">
                                <div className="top-box">
                                <HighlightOutlined onClick={this.showAddTag.bind(this, item)}/>
                                <span className="tag-list">
                                    {item.tags}
                                </span>
                                </div>
                                <div className="content">{item.content}</div>
                                
                                <div className="icon-box">
                                {/* <HeartOutlined /> */}
                                <PlusOutlined onClick={this.showAddCollection.bind(this, item)}/>
                                <DeleteOutlined onClick={this.removeJuzi.bind(this, item)}/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state.juzi
    }
}

export default connect(mapStateToProps)(ListComponent)