import styles from './Customers.module.css'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, passport, telephoneNumber } from '../../../utils/validators/validators';
import { Input } from '../../Common/FormControls/FormControls';

const maxLength11 = maxLength(11);
// const minValue4 = minValue(4);
// const minValue15000 = minValue(15000);

const AddNewCustomerForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.item} component={Input} validate={[required]} placeholder="ФИО клиента" name={'fullName'} />
      <Field className={styles.item} component={Input} validate={[required, telephoneNumber]} placeholder="Номер телефона" name={'telephoneNumber'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Адрес" name={'address'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Email" name={'email'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Отзыв" name={'remarks'} />
      <Field className={styles.item} component={Input} validate={[required, passport, maxLength11]} placeholder="Паспортные данные через пробел" name={'passportDetails'} />
      <button>Добавить</button>
    </form>
  );
};

export const AddNewCustomerFormRedux = reduxForm({ form: 'AddNewCustomerForm' })(AddNewCustomerForm);
