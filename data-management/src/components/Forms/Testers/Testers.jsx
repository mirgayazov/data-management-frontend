import styles from './Testers.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateTesterForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: '', testMethod: '', position: '', passportSeries: '', passportNumber: '', salary: '', telephoneNumber: '', workExperience: '', email: '' }}
      onSubmit={(tester, { setSubmitting }) => {
        props.onSubmit(tester)
        setSubmitting(false);
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
                <td>Должность</td><td><Field className={styles.item} type='text' name='position' />
                  <ErrorMessage name='position' component='div' /></td>
              </tr>
              <tr>
                <td>Специализация</td><td><Field className={styles.item} type='text' name='testMethod' />
                  <ErrorMessage name='testMethod' component='div' /></td>
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
                <td>Зарплата (₽)</td><td><Field className={styles.item} type='text' name='salary' />
                  <ErrorMessage name='salary' component='div' /></td>
              </tr>
              <tr>
                <td>Контакты</td><td><Field className={styles.item} type='text' name='telephoneNumber' />
                  <ErrorMessage name='telephoneNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Электронная почта</td><td><Field className={styles.item} type='text' name='email' />
                  <ErrorMessage name='email' component='div' /></td>
              </tr>
              <tr>
                <td>Трудовой стаж</td><td><Field className={styles.item} type='text' name='workExperience' />
                  <ErrorMessage name='workExperience' component='div' /></td>
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

export const CreateStage = (props) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={(fields, { setSubmitting }) => {
        let today = new Date();
        let options = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };
        let dateAndtime = today.toLocaleString("ru", options).replace(/ /g, '').split(',')
        let schema = {
          report: fields.comment,
          order_id: Number(props.orderId),
          closing_date: {
            date: dateAndtime[0],
            time: dateAndtime[1],
          },
          curator: window.store.getState().auth.name.full_name,
        }
        props.onSubmit(schema)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>Замечания</td><td><Field className={styles.item} type='text' name='comment' as='textarea' />
                  <ErrorMessage name='comment' component='div' /></td>
                <td> <button type='submit' disabled={isSubmitting}>
                  Добавить
                </button></td>
              </tr>
            </tbody>
          </table>
        </Form>
      )}
    </Formik>
  )
}

export const UpdateTesterForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: props.tester.full_name, testMethod: props.tester.test_method, position: props.tester.position, passportSeries: props.tester.passport_details.series, passportNumber: props.tester.passport_details.number, salary: props.tester.salary, telephoneNumber: props.tester.telephone_number, workExperience: props.tester.work_experience, email: props.tester.email }}
      validate={values => {
        const errors = {};
        if (!values.telephoneNumber) {
          errors.telephoneNumber = 'Required';
        }
        return errors;
      }}
      onSubmit={(tester, { setSubmitting }) => {
        tester.personnel_number = props.tester.personnel_number
        props.onSubmit(tester)
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
                <td>Должность</td><td><Field className={styles.item} type='text' name='position' />
                  <ErrorMessage name='position' component='div' /></td>
              </tr>
              <tr>
                <td>Специализация</td><td><Field className={styles.item} type='text' name='testMethod' />
                  <ErrorMessage name='testMethod' component='div' /></td>
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
                <td>Зарплата (₽)</td><td><Field className={styles.item} type='text' name='salary' />
                  <ErrorMessage name='salary' component='div' /></td>
              </tr>
              <tr>
                <td>Контакты</td><td><Field className={styles.item} type='text' name='telephoneNumber' />
                  <ErrorMessage name='telephoneNumber' component='div' /></td>
              </tr>
              <tr>
                <td>Электронная почта</td><td><Field className={styles.item} type='text' name='email' />
                  <ErrorMessage name='email' component='div' /></td>
              </tr>
              <tr>
                <td>Трудовой стаж</td><td><Field className={styles.item} type='text' name='workExperience' />
                  <ErrorMessage name='workExperience' component='div' /></td>
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
