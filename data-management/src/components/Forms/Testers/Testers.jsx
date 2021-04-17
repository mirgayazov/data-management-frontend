// import classes from './Testers.module.css'
import { Field, reduxForm } from 'redux-form'

const AddNewTesterForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={'textarea'} placeholder="Enter tester full name" name={'testerFullName'} />
      </div>
      <div>
        <button >Send</button>
      </div>
    </form>
  );
};

export const AddNewTesterFormRedux = reduxForm({ form: 'AddNewTesterForm' })(AddNewTesterForm);
