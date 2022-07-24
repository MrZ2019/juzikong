
import React from 'react'

import imgAvatar from '../assets/avatar.jpeg'

import './User.css'

class UserPage extends React.PureComponent {

    render() {
        return (
            <div className="top">
                <div className="col col-6">
                    <img src={imgAvatar} alt="" className="avatar"/>
                </div>
                <div className="col col-18">
                    <div className="row">
                        <div className="username">北陌</div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default UserPage