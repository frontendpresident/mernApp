import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../redux/reducers/profileReducer'
import Preloader from '../common/Preloader'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Preloader />
        }
        else {
            dashboardContent = (
                <h1>test</h1>
            )
        }

        if(Object.keys(profile).length === 0){
            dashboardContent = <h1>Added Profile please.</h1>
        }
        else {
            dashboardContent = (
                <div className='container'>
                   
                </div>
            )
        }
        return (
            <div>
                <div class="dashboard">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <h1 class="display-4">Dashboard</h1>
                                <div class="btn-group mb-4" role="group">
                                    <h1>TEST</h1>                                 
                                </div>
                                {dashboardContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    profile: propTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
