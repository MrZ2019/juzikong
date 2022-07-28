
import React from 'react'

import {connect} from 'react-redux'
import {Modal, Button, message} from 'antd'

import './AddTag.less'

import request from '../request'
import eventBus from '../bus'

class AddTagModal extends React.PureComponent {
    state = {
        visible: false,
        selectedTags: []
    }
    juzi = {}
    closeModal() {
        this.setState({
            visible: false
        })
    }   
    showModal(juzi) {
        this.juzi = juzi
        let tags = []
        if (juzi.tags_id) {
            tags = juzi.tags_id.split(',').map((num)=>num - 0)
        }
        this.setState({
            visible: true,
            selectedTags: tags
        })
    }   
    selectTag(item) {
        let index = this.state.selectedTags.indexOf(item.id)
        if (index != -1) {
            this.state.selectedTags.splice(index, 1)
        } else {
            this.state.selectedTags.push(item.id)
        }
        this.setState({
            selectedTags: JSON.parse(JSON.stringify(this.state.selectedTags))
        })
        
    } 

    addTag() {
        request.get('/tag/add?juzi_id=' + this.juzi.id + '&tags=' + this.state.selectedTags)
        .then((res) => {
            message.success("添加成功")
            this.closeModal()
            setTimeout(() => {
                eventBus.emit('fetch-list')        
            }, 500)
            
        })
    }
    render() {
        return (
            <Modal className="modal-add-tag" title="添加标签" visible={this.state.visible} footer={null} onCancel={this.closeModal.bind(this)}>
                <div className="tag-box">
                    {this.props.tag.map((item) => {
                        return (<span className={'tag ' + ((this.state.selectedTags.indexOf(item.id) != -1) ? 'selected' : '')} onClick={this.selectTag.bind(this, item)}>{item.name}</span>)
                    })
                    }
                </div>
                <div className="bottom-box">
                <Button type="primary" onClick={this.addTag.bind(this)}>确定</Button>
                </div>
            </Modal>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        tag: state.tag
    }
}
export default connect(mapStateToProps, null, null, { forwardRef: true })(AddTagModal)