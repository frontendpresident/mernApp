import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../redux/reducers/profileReducer'
import Preloader from '../common/Preloader'
import { Link } from 'react-router-dom'
import ProfileActions from './ProfileActions';
import Education from './Education'
import Experience from './Experience'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getCurrentProfile()
    }

    onDeleteClick(e) {
        this.props.deleteAccount();
    }


    render() {
        const { user } = this.props.auth
        const { profile, loading } = this.props.profile

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Preloader />;
        } else {
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                        <div style={{ marginBottom: '60px' }} />
                        <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-danger"
                        >
                            Delete My Account</button>
                    </div>
                );
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome {user.name}</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }


        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
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
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
