import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.scss";

const validSchema = Yup.object().shape({
  email: Yup.string().email("Your email must be valid").required("Enter email"),
  message: Yup.string().required("enter message"),
});

const ContactForm = () => {
  return (
    <div className="contact-form">
      <h2 className="contact-form__h2">Contact Us</h2>
      <Formik
        className="contact-form__formik"
        initialValues={{
          email: "",
          message: "",
        }}
        validationSchema={validSchema}
        onSubmit={(values) => {
          values.email = "";
          values.message = "";
        }}
      >
        {({ values }) => (
          <Form className="contact-form__form">
            <Field
              className="contact-form__field1"
              id="email"
              name="email"
              type="email"
              placeholder="Your e-mail"
              value={values.email}
            />
            <ErrorMessage name="email" />
            <Field
              className="contact-form__field2"
              id="message"
              name="message"
              type="message"
              placeholder="Your message"
              component="textarea"
              value={values.message}
            />
            <ErrorMessage name="message" />
            <button className="contact-form__btn" type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
