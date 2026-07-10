import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/authSlice';
import { api } from '@/api/client';
import InputField from '@/components/InputField/InputField';

const RegisterSchema = Yup.object({
  firstName: Yup.string().required('First name required'),
  lastName: Yup.string().required('Last name required'),
  email: Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(8, 'Min 8 characters').required('Password required'),
});

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await api.post('/register', values);
        dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
        navigate('/dashboard');
      } catch (err: any) {
        setFieldError('email', err.response?.data?.message || 'Registration failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="sign_up_page">
      <div className="form_main_quote">Sign Up Account</div>
      <div className="sub-headline">Enter your personal data to create your account.</div>
      <div className="social-buttons">
        <button className="social-btn"><span>-</span> Google</button>
        <button className="social-btn"><span>-</span> Github</button>
      </div>
      <div className="divider">Or</div>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="names-group">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName}
            touched={formik.touched.firstName}
            placeholder="Kamila"
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName}
            touched={formik.touched.lastName}
            placeholder="Nurullina"
          />
        </div>
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
        <div className="form-group">
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
          <div className="password-hint">Must be at least 8 characters.</div>
        </div>
        <button type="submit" className="submit_button" disabled={formik.isSubmitting}>
          Sign Up
        </button>
        <div className="additional-links">
          <Link to="/login" className="already-account">Already have an account? Log in</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;