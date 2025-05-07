import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';


function Registration() {
    const initialValues = {
        username : "",
        password : ""
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(3).max(15).required(),
    });

    const [successMessage, setSuccessMessage] = useState("");


    const onSubmit = async (data, { setSubmitting, setErrors, setFieldValue , resetForm}) => {
        try {
            const response = await axios.post("https://plant-db-7e0c17d70235.herokuapp.com/auth", data, {headers: {accessToken: sessionStorage.getItem("accessToken")}});
            console.log(response.data);
            setSuccessMessage("Registration successful!");
            resetForm();
        } catch (error) {
            if (error.response) {
                setSuccessMessage(""); 
            if (error.response.status === 409) {
                setErrors({ username: "Username already taken. Try another" });
                // Clear fields
                setFieldValue("username", "", false);
                setFieldValue("password", "", false);
            } else {
                console.error("Unexpected server error:", error.response.data);
                alert("Something went wrong. Please try again.");
            }
          } 
        } finally {
          setSubmitting(false);
        }
      };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
            <Form  className="formContainer">
            <label>Username</label>
            <ErrorMessage name="username" component="span" />
            <Field
                autocomplete="off"
                id="inputCreatePost"
                name="username"
                placeholder="(Ex. Giota123...)"
            />
            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
                autocomplete="off"
                type="password"
                id="inputCreatePost"
                name="password"
                placeholder="Your Password..."
            />    
            <button type="submit"> Register</button>
            {successMessage && <div style={{ color: "darkgreen", fontWeight:"bold" }}>{successMessage}</div>}

            </Form>
            </Formik>
        </div>
      );
}

export default Registration;