import { connect } from 'react-redux';
import { login, resetPassword } from '../../redux/auth-reducer'
import { LoginForm } from '../Forms/Login/Login';

const Login = (props) => {
  const onSubmit = (authData) => {
    props.login(authData.email, authData.password)
  }

  const onResetPassword = (email) => {
    props.resetPassword(email)
  }

  return (
    <div>
      <LoginForm onSubmit={onSubmit} onResetPassword={onResetPassword} count={props.count} />
    </div>
  );
};

export default connect(null, { login, resetPassword })(Login);
