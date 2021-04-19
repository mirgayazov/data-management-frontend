import styles from './Testers.module.css'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, passport, telephoneNumber, minValue } from '../../../utils/validators/validators';
import { Input } from '../../Common/FormControls/FormControls';

const maxLength11 = maxLength(11);
const minValue4 = minValue(4);
const minValue15000 = minValue(15000);

const AddNewDeveloperForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.item} component={Input} validate={[required]} placeholder="ФИО сотрудника" name={'fullName'} />
      <Field className={styles.item} component={Input} validate={[required, minValue4]} placeholder="Опыт работы" name={'workExperience'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Текущая должность" name={'position'} />
      <Field className={styles.item} component={Input} validate={[required, telephoneNumber]} placeholder="Номер телефона" name={'telephoneNumber'} />
      <Field className={styles.item} component={Input} validate={[required, passport, maxLength11]} placeholder="Паспортные данные через пробел" name={'passportDetails'} />
      <Field className={styles.item} component={Input} validate={[required, minValue15000]} placeholder="Зарплата" name={'salary'} />
      <button>Добавить</button>
    </form>
  );
};

export const AddNewDeveloperFormRedux = reduxForm({ form: 'AddNewTesterForm' })(AddNewDeveloperForm);
