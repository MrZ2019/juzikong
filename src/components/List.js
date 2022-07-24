
import React from 'react'
import { connect } from 'react-redux'

import request from '../request'

import './List.css'

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

    componentDidMount() {
        this.fetchAll()
    }
    render() {
        return (
            <div class="card-list">
                {
                    this.props.list.map((item) => (
                        <div className="card">
                            <div className="content">{item.content}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        list: state
    }
}

export default connect(mapStateToProps)(ListComponent)