import React from "react";
import styles from "./ModalWindow.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Weather from "../store/Weather";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  city: Yup.string().required("Please select a city"),
  start: Yup.date().required("Start date is required"),
  end: Yup.date()
    .required("End date is required")
    .min(Yup.ref("start"), "End date can't be before start date"),
});

const initialValues = {
  city: "",
  start: "",
  end: "",
};

const ModalWindow = () => {
  const toggleModale = () => {
    Weather.handlerModalWindow();
  };

  const today = new Date();
  const futureDate = new Date(today);
  const butToday = new Date(today);
  butToday.setDate(today.getDate() + 1);
  futureDate.setDate(today.getDate() + 15);

  const handleSubmit = (values, action) => {
    console.log(values);
    Weather.submitModalWindow(values);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Create trip</h1>
      <span onClick={toggleModale} className={styles.closeButton}>
        x
      </span>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          <Form className={styles.container} onSubmit={props.handleSubmit}>
            <label>
              <span style={{ color: "red" }}>*</span> City <br />
              <Field as="select" name="city">
                <option value="" disabled hidden>
                  Please select a city
                </option>
                <option value="Kyiv">Kyiv, Ukraine</option>
                <option value="Paris">Paris, France</option>
                <option value="Tokyo">Tokyo, Japan</option>
                <option value="London">London, UK</option>
                <option value="Rome">Rome, Italy</option>
                <option value="Istanbul">Istanbul, Turkey</option>
                <option value="Dubai">Dubai, UAE</option>
                <option value="Shanghai">Shanghai, China</option>
                <option value="RiodeJaneiro">Rio de Janeiro, Brazil</option>
                <option value="Sydney">Sydney, Australia</option>
                <option value="HongKong">Hong Kong</option>
                <option value="Berlin">Berlin, Germany</option>
                <option value="Mumbai">Mumbai, India</option>
                <option value="Cairo">Cairo, Egypt</option>
              </Field>
              <ErrorMessage
                component="div"
                style={{
                  margin: "0 0 1rem 1rem",
                  color: "red",
                }}
                name="city"
              />
            </label>
            <label>
              <span style={{ color: "red" }}>*</span> Start date <br />
              <Field
                name="start"
                type="date"
                min={butToday.toISOString().split("T")[0]}
                max={futureDate.toISOString().split("T")[0]}
              />
              <br />
              <ErrorMessage
                component="div"
                style={{
                  margin: "0 0 1rem 1rem",
                  color: "red",
                }}
                name="start"
              />
            </label>
            <label>
              <span style={{ color: "red" }}>*</span> End date
              <br />
              <Field
                name="end"
                type="date"
                min={butToday.toISOString().split("T")[0]}
                max={futureDate.toISOString().split("T")[0]}
              />
              <br />
              <ErrorMessage
                component="div"
                style={{
                  margin: "0 0 1rem 1rem",
                  color: "red",
                }}
                name="end"
              />
            </label>

            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <div className={styles.buttons}>
              <button onClick={toggleModale} className={styles.close}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModalWindow;
