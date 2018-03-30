import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/actions';
import { Helmet } from 'react-helmet';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }
  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users`}</title>
        <meta property="og:title" context="Users App" />
      </Helmet>
    )
  }
  render() {
    return (
      <div>
        {this.head()}
        Heres a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

// not using connect/Provider so we can render once on the server
// call store.dispatch manually, return as a promise
function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(Users)
}
