import styles from './Testers.module.css'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../utils/validators/validators';
import { Input } from '../../Common/FormControls/FormControls';

const AddNewTesterForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.item} component={Input} validate={[required]} placeholder="ФИО сотрудника" name={'fullName'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Метод тестирования" name={'testMethod'} />
      <Field className={styles.item} component={Input} validate={[required]} type={'number'} placeholder="Опыт работы" name={'workExperience'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Текущая должность" name={'position'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Номер телефона" name={'telephoneNumber'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Паспортные данные" name={'passportDetails'} />
      <button>Добавить</button>
    </form>
  );
};

export const AddNewTesterFormRedux = reduxForm({ form: 'AddNewTesterForm' })(AddNewTesterForm);
