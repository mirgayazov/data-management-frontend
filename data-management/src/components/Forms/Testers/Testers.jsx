import styles from './Testers.module.css'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, passport } from '../../../utils/validators/validators';
import { Input } from '../../Common/FormControls/FormControls';


let maxLength11 = maxLength(11);

const AddNewTesterForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.item} component={Input} validate={[required]} placeholder="ФИО сотрудника" name={'fullName'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Специализация" name={'testMethod'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Опыт работы" name={'workExperience'} type={'number'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Текущая должность" name={'position'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Номер телефона" name={'telephoneNumber'} />
      <Field className={styles.item} component={Input} validate={[required, passport, maxLength11]} placeholder="Паспортные данные через пробел" name={'passportDetails'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Зарплата" name={'salary'} type={'number'} />
      <button>Добавить</button>
    </form>
  );
};

export const AddNewTesterFormRedux = reduxForm({ form: 'AddNewTesterForm' })(AddNewTesterForm);
