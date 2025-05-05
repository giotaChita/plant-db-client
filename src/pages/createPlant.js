import React, { useState } from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// LINK = 'https://plantdbmenem.netlify.app/';
function AddPlant(){

    const [isSuccess, setIsSuccess] = useState(false);

    const initialValues = {
        name: "",
        information: "",
        photo: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        information: Yup.string().required(),
        photo: Yup.string()
    });
    
    
    const onSubmit = (data, {resetForm}) => {
        axios.post("https://plant-db-7e0c17d70235.herokuapp.com/plant", data).then((response) => {
            console.log("WORKING!");
            setIsSuccess(true);    
            const onSubmit = (data, {resetForm}) => {
                axios.post("https://plant-db-7e0c17d70235.herokuapp.com/plant", data).then((response) => {
                    console.log("WORKING!");
                    setIsSuccess(true);
                    // resetForm();
                });
            };
        
          
            // resetForm();
        });
    };

    const handleAddAnother = () => {
        setIsSuccess(false);  
    };

    return <div className='createPlantPage'> 
        <Formik 
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
        {!isSuccess ? (
            <Form className="formContainer">
                <label>Φυτό: </label>
                <ErrorMessage name="name" component="span" />
                <Field 
                id="inputCreatePlant" 
                name="name" 
                placeholder="(Ex. Θυμάρι..)"
                />
                <label>Πληροφορίες: </label>
                <ErrorMessage name="information" component="span" />
                <Field 
                id="inputCreatePlant" 
                name="information" 
                placeholder="(Ex. Το Θυμάρι είναι..)"
                />
                <label>Φωτογραφία (URL): </label>
                <ErrorMessage name="photo" component="span" />
                <Field 
                id="inputCreatePlant" 
                name="photo" 
                placeholder="(Ex. http://..)"
                />
                <button type="submit">Πρόσθεσε Φυτό</button>
            </Form>
            ) : (
                <div className="formContainer">
                    <div className="successMessage">
                    <p>Φυτό προστέθηκε επιτυχώς!</p>
                    <button onClick={handleAddAnother}>Πρόσθεσε Άλλο Φυτό</button>
                    </div>
                </div>
            )}
        </Formik>
        </div>;
}

export default AddPlant;