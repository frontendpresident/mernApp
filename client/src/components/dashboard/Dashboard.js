import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../redux/reducers/profileReducer'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
}
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
