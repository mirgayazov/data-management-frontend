import styles from './Login.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react'


export const LoginForm = (props) => {
  let [resetPassowrd, setResetPassword] = useState(false);
  let [showMsg, setShowMsg] = useState(false);

  return (
    !resetPassowrd ?
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
              <div className={styles.link}>
                <button onClick={() => setResetPassword(!resetPassowrd)}>Забыли пароль?</button>
              </div>
            </div>
          </Form>
        )}
      </Formik> :

      <Formik
        initialValues={{ email: '' }}
        onSubmit={(data, { setSubmitting }) => {
          props.onResetPassword(data.email)
          setShowMsg(!setShowMsg)
          // setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form >
            <div className={styles.LoginDiv2}>
              {!showMsg ?
                <div>
                  <div className={styles.title}>
                    Введите ваш адрес электронной почты
                  </div>
                  <div className={styles.fields}>
                    <div className={styles.username}>
                      <Field className={styles.userInput} type='text' name='email' placeholder='example@example.example' />
                      <ErrorMessage name='email' component='div' />
                    </div>
                  </div>
                  <button type='submit' className={styles.signinButton}>Далее</button>
                </div> :
                <p>
                  Мы отправили письмо с инструкциями на вашу почту, пожалуйста, проверьте папку спам.
                </p>}
            </div>
          </Form>
        )}
      </Formik>
  )
}