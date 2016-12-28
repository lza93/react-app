import { connect } from 'react-redux';

import { loginActiveSession } from '../actionCreators/userAuth';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    appLoading: state.loading.appLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginActiveSession() {
      dispatch(loginActiveSession());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
