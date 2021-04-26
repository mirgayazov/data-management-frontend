import styles from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const LoginForm = (props) => {
  return (
    <Formik
      initialValues={{ password: '', email: '' }}
      onSubmit={(authData, { setSubmitting }) => {
        props.onSubmit(authData)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form >
          <div className={styles.LoginDiv}>
            {/* <div className={styles.logo}></div> */}
            <div className={styles.subTitle}>
              {props.count > 0 ? <>Введены неверные данные</> : <></>}
            </div>
            <div className={styles.title}></div>
            <div className={styles.fields}>
              <div className={styles.username}>
                <Field className={styles.userInput} type='text' name='email' placeholder='логин' />
                <ErrorMessage name='email' component='div' />
              </div>
              <div className={styles.password}>
                <Field className={styles.userInput} type='password' name='password' placeholder='пароль' />
                <ErrorMessage name='password' component='div' />
              </div>

            </div> <button type='submit' className={styles.signinButton}>Войти</button>
            {/* <div className={styles.Link}> */}
            {/* <a href="/}>Forgot password?</a> or <a href="#}>Sign up</a> */}
            {/* </div> */}
          </div>
        </Form>
      )}
    </Formik>
  )
}