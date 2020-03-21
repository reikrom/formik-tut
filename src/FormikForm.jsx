import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import Error from "./Error";

// tut recap = https://youtu.be/TxEVnaISj1w?t=1293
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Must have more than 1 character")
        .max(255,"Must be shorter than 255")
        .required("Must enter a name"),
    email: Yup.string()
        .email("Must be a valid email address")
        .max(255,"Must be shorter than 255")
        .required("Must enter a email"),
})

export default function FormikForm() {
    return (
        <Formik 
            initialValues={{ name:"", email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, {setSubmitting, resetForm})=>{
                setSubmitting(true);

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 500);
            }}
        > 
            {({ 
                values, 
                errors, 
                touched, 
                handleChange, 
                handleBlur, 
                handleSubmit, 
                isSubmitting 
            }) => (
            <form onSubmit={handleSubmit}>
                {/* {JSON.stringify(values)} */}
                <div className="input-row">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Enter your name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className={touched.name && errors.name ? "has-error"
                        : null}
                    />
                    <Error touched={touched.name} message={errors.name} />
                </div>

                <div className="input-row">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Enter your email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={touched.name && errors.name ? "has-error"
                        : null}
                    />
                     <Error touched={touched.email} message={errors.email} />
                </div>

                <div classname="input-row">
                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </div>
            </form>
            )}
        </Formik>
    );
}