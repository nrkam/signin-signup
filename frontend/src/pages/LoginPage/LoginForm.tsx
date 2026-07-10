import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';
import { api } from '@/api/client';
import InputField from '@/components/InputField/InputField';

const LoginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().required('Password required'),
});

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await api.post('/login', values);
        dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
        navigate('/dashboard');
      } catch (err: any) {
        setFieldError('email', err.response?.data?.message || 'Login failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="sign_in_page">
      <div className="form_main_quote">Sign In Account</div>
      <div className="social-buttons">
        <button className="social-btn"><span>-</span> Google</button>
        <button className="social-btn"><span>-</span> Github</button>
      </div>
      <div className="divider">Or</div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.email}
          touched={formik.touched.email}
          placeholder="kamilanurullina@gmail.com"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          placeholder="*********"
        />
        <button type="submit" className="submit_button" disabled={formik.isSubmitting}>
          Sign In
        </button>
        <div className="additional-links">
          <Link to="/register" className="not-account">Don't have an account? Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;