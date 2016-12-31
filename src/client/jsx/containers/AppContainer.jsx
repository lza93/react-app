import { connect } from 'react-redux';

import { loginActiveSession } from '../redux/actionCreators/userAuth';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => ({
  appLoading: state.loading.appLoading,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  loginActiveSession() {
    dispatch(loginActiveSession());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
