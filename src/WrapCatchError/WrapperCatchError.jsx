import React from 'react'
import { Navigate } from 'react-router-dom';

export default class WrapperCatchError extends React.Component {
    constructor(props) {
        super(props)
        this.state= {error: undefined}
    }
    componentDidCatch(error) {
        this.setState({error: error.name})
    }
    render() {
        const {error} = this.state;
        if(error) {
            return (
                <div className={"wrapper-catch-error-center"}>
                    <Navigate to={"/account"} />
                </div>
            )
        }
        else {
            return <>
                {this.props.children}
            </>
        }
    }
}

