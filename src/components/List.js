
import React from 'react'
import { connect } from 'react-redux'

import request from '../request'

import './List.css'

import {HeartOutlined, PlusOutlined} from '@ant-design/icons'

import AddToCollection from '../modals/AddToCollection'

class ListComponent extends React.PureComponent {

    fetchAll() {
        return request.get('/list').then((res) => {
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

    componentDidMount() {
        this.fetchAll()
    }
    render() {
        return (
            <div className="list-box">
                <AddToCollection ref="addToCollection"></AddToCollection>
                {/* <h1 >Test</h1> */}
                <div class="card-list">
                    {
                        this.props.list.map((item) => (
                            <div className="card">
                                <div className="content">{item.content}</div>
                                <PlusOutlined onClick={this.showAddCollection.bind(this, item)}/>
                                <HeartOutlined />
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