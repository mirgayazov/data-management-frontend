import styles from './Orders.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateOrderForm = (props) => {
  return (
    <Formik
      initialValues={{ name: '', customerId: '', cost: '', customerFeedback: '', technicalTask: '', orderType: '' }}
      onSubmit={(order, { setSubmitting }) => {
        props.onSubmit(order)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.orderInfo}>
            <tbody>
              <tr>
                <td>Название</td><td><Field className={styles.item} type='text' name='name' />
                  <ErrorMessage name='name' component='div' /></td>
              </tr>
              <tr>
                <td>Номер заказчика</td><td><Field className={styles.item} type='text' name='customerId' />
                  <ErrorMessage name='customerId' component='div' /></td>
              </tr>
              <tr>
                <td>Цена</td><td><Field className={styles.item} type='text' name='cost' />
                  <ErrorMessage name='cost' component='div' /></td>
              </tr>
              <tr>
                <td>Отзыв заказчика</td><td><Field className={styles.item} type='text' name='customerFeedback' />
                  <ErrorMessage name='customerFeedback' component='div' /></td>
              </tr>
              <tr>
                <td>Техническое задание</td><td><Field className={styles.item} type='text' name='technicalTask' />
                  <ErrorMessage name='technicalTask' component='div' /></td>
              </tr>
              <tr>
                <td>Тип заказа</td><td><Field className={styles.item} type='text' name='orderType' />
                  <ErrorMessage name='orderType' component='div' /></td>
              </tr>
            </tbody>
          </table>
          <table >
            <tbody>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Добвить
                </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      )}
    </Formik>
  )
}

export const UpdateOrderForm = (props) => {
  return (
    <Formik
      initialValues={{ name: props.order.name, customerId: props.order.customer_id, cost: props.order.cost, customerFeedback: props.order.customer_feedback, technicalTask: props.order.technical_task, orderType: props.order.order_type }}
      validate={values => {
        const errors = {};
        if (!values.telephoneNumber) {
          errors.telephoneNumber = 'Required';
        }
        return errors;
      }}
      onSubmit={(order, { setSubmitting }) => {
        order.personnel_number = props.order.personnel_number
        props.onSubmit(order)
        setSubmitting(false);
        props.setEditMode(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.orderInfo}>
            <tbody>
              <tr>
                <td>Название</td><td><Field className={styles.item} type='text' name='name' />
                  <ErrorMessage name='name' component='div' /></td>
              </tr>
              <tr>
                <td>Номер заказчика</td><td><Field className={styles.item} type='text' name='customerId' />
                  <ErrorMessage name='customerId' component='div' /></td>
              </tr>
              <tr>
                <td>Цена</td><td><Field className={styles.item} type='text' name='cost' />
                  <ErrorMessage name='cost' component='div' /></td>
              </tr>
              <tr>
                <td>Отзыв заказчика</td><td><Field className={styles.item} type='text' name='customerFeedback' />
                  <ErrorMessage name='customerFeedback' component='div' /></td>
              </tr>
              <tr>
                <td>Техническое задание</td><td><Field className={styles.item} type='text' name='technicalTask' as='textarea'/>
                  <ErrorMessage name='technicalTask' component='div' /></td>
              </tr>
              <tr>
                <td>Тип заказа</td><td><Field className={styles.item} type='text' name='orderType' />
                  <ErrorMessage name='orderType' component='div' /></td>
              </tr>
            </tbody>
          </table>
          <table >
            <tbody>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Сохранить
               </button>
                </td>
              </tr>
            </tbody>
          </table>
        </Form>
      )}
    </Formik>
  )
}
