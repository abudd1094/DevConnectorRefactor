import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import{ getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  
  return loading && profile === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
    {/* if the user exists, show "Welcome " {the user's name} */}
    <i className="fas fa-user"></i> Welcome { user && user.name } </p> 
    {profile !== null ? (
      <Fragment>
        <DashboardActions />
        <Experience experience={profile.experience} />
        <Education education={profile.education} />

        <div>
          <button className="btn btn-danger" onClick={() => deleteAccount()}>
            <i className="fa fa-user-minus"></i> Delete my Account
          </button>
        </div>
      </Fragment>
      ) : (
      <Fragment>
        <p>You have not set up a profile yet, please add some info</p>
        <Link to='/create-profile' className="btn btn-primary my-1">
          Create Profile
        </Link>
      </Fragment>)}
  </Fragment>// if the profile is null and still loading, show the spinner
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({ 
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);