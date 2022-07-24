
import './tags.css'
import {NavLink, Outlet, useParams, Link } from 'react-router-dom'

const tags = 
[
    '快乐', '优秀'
]
function TagLink({ tagName, ...props }) {
    let {tag} = useParams();
    let isActive = tag == tagName;
    return (
      <Link
        style={{ color: isActive ? "red" : "" }}
        to={`/tag/${tagName}`}
        {...props}
      />
    );
  }

const Tags = () => {
    let activeStyle = {
        textDecoration: "underline",
      };


    return (
        <div>
        <div className="tags">
            {tags.map(tag => <TagLink 
            tagName={tag}
            to={`${tag}`}
          >
            {tag}
          </TagLink>)}
        </div>
        <Outlet></Outlet>
        </div>
    )
}


export default Tags