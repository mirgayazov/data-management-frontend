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
          setShowMsg(!showMsg)
          setSubmitting(false);
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
                <h2>
                  Мы отправили письмо с инструкциями на вашу почту, пожалуйста, проверьте папку спам.
                </h2>}
            </div>
          </Form>
        )}
      </Formik>
  )
}


export const ChangePassword = (props) => {
  return (
    <Formik
      initialValues={{ newPassword1: '', newPassword2: '' }}
      onSubmit={(fields, { setSubmitting, setFieldValue }) => {
        fields.email = window.store.getState().auth.email;
        props.onSubmit(fields)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>
                  {props.msg}
                </td>
              </tr>
              <tr>
                <td>
                  <Field className={styles.item} type='password' name='newPassword1' placeholder='Новый пароль' />
                  <ErrorMessage name='newPassword1' component='div' />
                </td>
              </tr>
              <tr>
                <td>
                  <Field className={styles.item} type='password' name='newPassword2' placeholder='Повторите пароль' />
                  <ErrorMessage name='newPassword2' component='div' />
                </td>
              </tr>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Сменить
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

export const CreateManagerForm = (props) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(fields, { setSubmitting, setFieldValue }) => {
        fields.position = 'manager'
        props.onSubmit(fields)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>
                  <Field className={styles.item} type='text' name='email' placeholder='Электронная почта сотрудника' />
                  <ErrorMessage name='email' component='div' />
                </td>
              </tr>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Создать
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

export const CreateAdminForm = (props) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(fields, { setSubmitting, setFieldValue }) => {
        fields.position = 'admin'
        props.onSubmit(fields)
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <table className={styles.componentInfo}>
            <tbody>
              <tr>
                <td>
                  <Field className={styles.item} type='text' name='email' placeholder='Электронная почта сотрудника' />
                  <ErrorMessage name='email' component='div' />
                </td>
              </tr>
              <tr>
                <td>
                  <button type='submit' disabled={isSubmitting}>
                    Создать
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