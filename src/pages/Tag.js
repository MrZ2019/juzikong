
import React from 'react'
import {connect} from 'react-redux'

import { Breadcrumb, Button, message } from 'antd'

// import {withRouter } from 'react-router-dom'
import { withRouter } from '../utils/withRouter'

import request from '../request'
import { PIC_PATH } from '../config'
import {SET_LIST, SET_COLLECTION} from '../actions'

import './Tag.less'

class TagPage extends React.Component {
    state = {
        collectionItem: {}
    }
    getTagJuziById(id) {
        request.get('/tag/juzi/' + id).then((res) => {
            this.props.dispatch({type: SET_LIST, payload: res})
        })
    }
    componentDidMount() {
        // this.getCollectionById(this.props.params.id)
        this.getTagJuziById(this.props.params.id)
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
                                <a href="">标签</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{this.props.params.name}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="left-juzi-list">
                    {
                        this.props.juzi.map((item) => (
                            <div className="card">
                                <div className="content">{item.content}</div>
                            </div>
                        ))
                    }                        
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
export default connect(mapStateToProps)(withRouter(TagPage))