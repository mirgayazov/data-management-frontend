import styles from './Testers.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const CreateDeveloperForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: '', position: '', passportSeries: '', passportNumber: '', salary: '', telephoneNumber: '', workExperience: '', email: ''}}
      onSubmit={(developer, { setSubmitting }) => {
        props.onSubmit(developer)
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

export const UpdateDeveloperForm = (props) => {
  return (
    <Formik
      initialValues={{ fullName: props.developer.full_name, position: props.developer.position, passportSeries: props.developer.passport_details.series, passportNumber: props.developer.passport_details.number, salary: props.developer.salary, telephoneNumber: props.developer.telephone_number, workExperience: props.developer.work_experience, email: props.developer.email}}
      validate={values => {
        const errors = {};
        if (!values.telephoneNumber) {
          errors.telephoneNumber = 'Required';
        }
        return errors;
      }}
      onSubmit={(developer, { setSubmitting }) => {
        developer.personnel_number = props.developer.personnel_number
        props.onSubmit(developer)
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
