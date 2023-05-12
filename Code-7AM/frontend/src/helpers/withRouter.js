import React from 'react'
import { useParams } from 'react-router-dom'

const withRouter = (Component) => {
    const WithRouter = () => {
        const params = useParams();
        return <Component {...{ match: { params } }} />
    }
    return WithRouter;
}

export default withRouter;