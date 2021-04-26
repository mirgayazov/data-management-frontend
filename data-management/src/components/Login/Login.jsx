import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer'
import { LoginForm } from '../Forms/Login/Login';

const Login = (props) => {
  const onSubmit = (authData) => {
    props.login(authData.email, authData.password, props.setIsAuth, props.setCount)
  }

  return (
    <div>
      <LoginForm onSubmit={onSubmit} count={props.count}/>
      {/* <LoginReduxForm onSubmit={onSubmit} /> */}
    </div>
  );
};

export default connect(null, { login })(Login);
