import styles from './Customers.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateCustomerForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: '', passportSeries: '', passportNumber: '', telephoneNumber: '', address: '', email: '', remarksToCustomer: '', }}
      onSubmit={(customer, { setSubmitting, resetForm }) => {
        props.onSubmit(customer)
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo3}>
            <tbody>
              <tr>
                <td>ФИО</td><td><Field className={styles.item} type='text' name='fullName' />
                  <ErrorMessage name='fullName' component='div' /></td>
              </tr>
              <tr>
                <td>Серия паспорта</td><td><Field className={styles.item} type='text' name='passportSeries' />
                  <ErrorMessage name='passportSeries' component='div' /></td>
              </tr>
              <tr>
                <td>Номер паспорта</td><td><Field className={styles.item} type='text' name='passportNumber' />
                  <ErrorMessage name='passportNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Контакты</td><td><Field className={styles.item} type='text' name='telephoneNumber' />
                  <ErrorMessage name='telephoneNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Адрес</td><td><Field className={styles.item} type='text' name='address' />
                  <ErrorMessage name='address' component='div' /></td>
              </tr>
              <tr>
                <td>Электронная почта</td><td><Field className={styles.item} type='text' name='email' />
                  <ErrorMessage name='email' component='div' /></td>
              </tr>
              <tr>
                <td>Отзыв о заказчике</td><td><Field className={styles.item} type='text' name='remarksToCustomer' />
                  <ErrorMessage name='remarksToCustomer' component='div' /></td>
              </tr>
            </tbody>
          </table>
          <table >
            <tbody>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Добавить
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

export const UpdateCustomerForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: props.customer.full_name, passportSeries: props.customer.passport_details.series, passportNumber: props.customer.passport_details.number, telephoneNumber: props.customer.telephone_number, address: props.customer.address, email: props.customer.email, remarksToCustomer: props.customer.remarks_to_customer, }}
      validate={values => {
        const errors = {};
        if (!values.telephoneNumber) {
          errors.telephoneNumber = 'Required';
        }
        return errors;
      }}
      onSubmit={(customer, { setSubmitting }) => {
        customer.id = props.customer.id
        props.onSubmit(customer)
        setSubmitting(false);
        props.setEditMode(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>ФИО</td><td><Field className={styles.item} type='text' name='fullName' />
                  <ErrorMessage name='fullName' component='div' /></td>
              </tr>
              <tr>
                <td>Серия паспорта</td><td><Field className={styles.item} type='text' name='passportSeries' />
                  <ErrorMessage name='passportSeries' component='div' /></td>
              </tr>
              <tr>
                <td>Номер паспорта</td><td><Field className={styles.item} type='text' name='passportNumber' />
                  <ErrorMessage name='passportNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Контакты</td><td><Field className={styles.item} type='text' name='telephoneNumber' />
                  <ErrorMessage name='telephoneNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Адрес</td><td><Field className={styles.item} type='text' name='address' />
                  <ErrorMessage name='address' component='div' /></td>
              </tr>
              <tr>
                <td>Электронная почта</td><td><Field className={styles.item} type='text' name='email' />
                  <ErrorMessage name='email' component='div' /></td>
              </tr>
              <tr>
                <td>Отзыв о заказчике</td><td><Field className={styles.item} type='text' name='remarksToCustomer' />
                  <ErrorMessage name='remarksToCustomer' component='div' /></td>
              </tr>
              <tr>
                <td colSpan={2}>
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

export const ChangeCommentForm = (props) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(fields, { setSubmitting, setFieldValue }) => {
        props.onSubmit(fields)
        setSubmitting(false);
        setFieldValue('comment', '')
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>Новый отзыв</td><td><Field className={styles.item} type='text' name='comment' as='textarea' />
                  <ErrorMessage name='comment' component='div' /></td>
                <td> <button type='submit' disabled={isSubmitting}>
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

