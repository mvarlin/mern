import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { Formik } from 'formik';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import './SignIn.scss';

const validationRules = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(6)
  }
}));

const SignIn = () => {
  const classes = useStyles();

  return (
    <div>
      <Formik
        validateOnMount={true}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationRules}
        onSubmit={(values, { setSubmitting }) => {

          const valueAll = {
            'email': values.email,
            'password': values.password,
          };
          console.log(valueAll);
          let formBody = [];
          for (let v in valueAll) {
            var encodedKey = encodeURIComponent(v);
            var encodedValue = encodeURIComponent(valueAll[v]);
            formBody.push(encodedKey + '=' + encodedValue);
          }
          formBody = formBody.join('&');
          console.log(formBody);

          fetch('http://localhost:3000/person/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          })
            .then(response => response.json())
            .then(responseData => {
              if (responseData) {
                localStorage.setItem('token', responseData.token);
                // setIsConnected(true);
              }
            })
            .catch(error => console.warn(error));

          console.log(values.email);
          console.log(values.password);
          setSubmitting(true);
          setTimeout(() => {
            setSubmitting(false);
            toast.info('👍 Your registration has been sent', {
              position: 'bottom-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: true
            });
          }, 3000);
        }}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Container component='main' maxWidth='sm'>
            <h1>SignIn</h1>
            <div style={{ marginTop: 10 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='email'
                      name='email'
                      label='Email Address'
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email ? <div className='error'>{errors.email}</div> : null}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='password'
                      name='password'
                      label='Password'
                      type='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password ? <div className='error'>{errors.password}</div> : null}
                  </Grid>
                </Grid>
                <Button
                  className={classes.button}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  startIcon={<SendIcon />}>
                  Register
                </Button>
              </form>
            </div>
          </Container>
        )}
      </Formik>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default SignIn;
