import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer'
import { LoginForm } from '../Forms/Login/Login';

const Login = (props) => {
  const onSubmit = (authData) => {
    props.login(authData.email, authData.password)
  }

  return (
    <div>
      <LoginForm onSubmit={onSubmit} count={props.count} />
    </div>
  );
};

export default connect(null, { login })(Login);
