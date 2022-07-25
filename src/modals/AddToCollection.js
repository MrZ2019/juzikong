

import React from 'react'

import {Modal, Button, message} from 'antd'

import {connect} from 'react-redux'

import {PIC_PATH} from '../config'
import './AddToCollection.less'

import bus from '../bus'
import request from '../request'
import {SET_COLLECTION} from '../actions'

class AddToCollection extends React.PureComponent {
    juzi_id = ''
    state = {
        visible: false,
    }
    showModal(juzi_id) {
        this.setState({
            visible: true
        })
        this.juzi_id = juzi_id

        bus.emit('fetchCollection', juzi_id)
    }
    closeModal() {
        this.setState({
            visible: false
        })
    }

    addToCollection(item) {
        request.post(`/collection/addToCollection?juzi_id=${this.juzi_id}&collection_id=${item.id}`).then((res) => {
            if (res == 'success') {
                message.success('收藏成功')
                item.exist = true
                let data = JSON.parse(JSON.stringify(this.props.data))
                this.props.dispatch({type: SET_COLLECTION, payload: data})
            }
        })
    }
    removeFromCollection(item) {
        request.post(`/collection/removeFromCollection?juzi_id=${this.juzi_id}&collection_id=${item.id}`).then((res) => {
            if (res == 'success') {
                message.success('移除收藏成功')
                item.exist = false
                let data = JSON.parse(JSON.stringify(this.props.data))
                this.props.dispatch({type: SET_COLLECTION, payload: data})
            }
        })
    }
    render() {
        return (
            <Modal title="添加到专辑" visible={this.state.visible} footer={null} className="modal-add-collection" onCancel={this.closeModal.bind(this)}>
                <div className="collection-list">
                    {
                        
                        this.props.collection.map((item) => 
                            (
                                <div className="item">
                                    <span className="img-box">
                                    <img className="cover" src={PIC_PATH + item.cover_file}/>
                                    </span>
                                    <span className="text-box">
                                        <span className="name">{item.name}</span>
                                        <span className="total">{item.rows || 0}条句子</span>
                                    </span>
                                    {item.exist ? <Button type="default" onClick={this.removeFromCollection.bind(this, item)}>已收藏</Button> : <Button type="primary" onClick={this.addToCollection.bind(this, item)}>收藏</Button>}
                                </div>
                            )
                        )
}
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.collection,
        collection: state.collection.data || [],
        countCollection: state.collection.countData || [],
    }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(AddToCollection)