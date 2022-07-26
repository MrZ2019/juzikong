
import React from 'react'
import {connect} from 'react-redux'

import { Breadcrumb, Button, message } from 'antd'

// import {withRouter } from 'react-router-dom'
import { withRouter } from '../utils/withRouter'

import request from '../request'
import { PIC_PATH } from '../config'
import {SET_LIST, SET_COLLECTION} from '../actions'

import './Collection.less'

class CollectionPage extends React.Component {
    state = {
        collectionItem: {}
    }
    getCollectionById(id) {
        request.get('/collection/get/' + id).then((res) => {
            this.setState({
                collectionItem: res[0]
            })
        })
    }
    getCollectionJuziById(id) {
        request.get('/collection/juzi/' + id).then((res) => {
            this.props.dispatch({type: SET_LIST, payload: res})
        })
    }
    componentDidMount() {
        this.getCollectionById(this.props.params.id)
        this.getCollectionJuziById(this.props.params.id)
    }
    removeFromCollection(item) {
        request.post(`/collection/removeFromCollection?juzi_id=${item.id}&collection_id=${this.props.params.id}`).then((res) => {
            if (res == 'success') {
                message.success('移除收藏成功')
                let index = this.props.juzi.indexOf(item)
                this.props.juzi.splice(index, 1)
                let data = JSON.parse(JSON.stringify(this.props.juzi))
                this.props.dispatch({type: SET_LIST, payload: data})
            }
        })
    }    
    render() {
        const collection = this.state.collectionItem
        return (
            <div class="collection-page">
                <div className="left-box">
                    <div className="top-nav">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/">首页</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <a href="">推荐专辑</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{collection.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="left-juzi-list">
                    {
                        this.props.juzi.map((item) => (
                            <div className="card">
                                <div className="content">{item.content}</div>
                                <div className="btn-box">
                                    <Button type="text" onClick={this.removeFromCollection.bind(this, item)}>[取消收藏]</Button>
                                </div>
                            </div>
                        ))
                    }                        
                    </div>
                </div>
                <div className="right-box">
                    <div className="right-top-box">
                        <div className="img-box">
                            <img src={PIC_PATH + collection.cover_file} alt="" />
                        </div>
                        <div className="collection-name">{collection.name}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        juzi: state.juzi || []
    }
}
export default connect(mapStateToProps)(withRouter(CollectionPage))