import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types'
import { logoutUser } from '../../redux/reducers/authReducer';
import { connect } from 'react-redux';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickLogout(e) {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a onClick={this.onClickLogout.bind(this)} className="nav-link">
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', marginRight: '5px' }}
            title="You must have a Gravatar connected to your email to display an image"
          />
            Logout</a>
        </li>
      </ul>
    )

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">DevConnector</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles"> Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  auth: propTypes.object.isRequired,
  logoutUser: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logoutUser })(Navbar);