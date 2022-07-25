import {useLocation, useNavigate, useMatch, useParams} from 'react-router-dom'

export function withRouter(Child) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        // const match = useMatch();
        const params = useParams();

        return <Child {...props} navigate={navigate} location={location} params={params} />;
    }
}