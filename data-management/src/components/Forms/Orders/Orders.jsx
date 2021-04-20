import styles from './Orders.module.css'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength, minValue } from '../../../utils/validators/validators';
import { Input, Textarea } from '../../Common/FormControls/FormControls';

const minValue4 = minValue(4);
const minValue15000 = minValue(15000);

const AddNewOrderForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Название" name={'name'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Номер заказчика" name={'customerId'} />
      <Field className={styles.item} component={Input} validate={[required, minValue4]} placeholder="Цена в рублях" name={'cost'} />
      <Field className={styles.item} component={Input} validate={[required]} placeholder="Отзыв клиента о продукте" name={'customerFeedback'} />
      <Field className={styles.item} component={Input} validate={[required,]} placeholder="Тип заказа" name={'orderType'} /><br />
      <Field className={styles.item} component={Textarea} validate={[required]} placeholder="Техническое задание" name={'technicalTask'} /><hr />
      <button className={styles.sbmt}>Добавить</button>
    </form>
  );
};

export const AddNewOrderFormRedux = reduxForm({ form: 'AddNewOrderForm' })(AddNewOrderForm);
