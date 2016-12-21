import { connect } from 'react-redux';

import { loginActiveSession } from '../actionCreators/userAuth';
import App from '../components/App';

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    loginActiveSession() {
      dispatch(loginActiveSession())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
