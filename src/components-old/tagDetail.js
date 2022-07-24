

import List from './list'

import {useParams } from 'react-router-dom'

const TagDetail= () => {
    let {tag} = useParams();
    
    return (
        <div className="tag-detail">
            <List type="tag" tag={tag}/>
        </div>
    )
}


export default TagDetail