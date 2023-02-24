import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name : yup.string().required().min(1),
  image : yup.string().required().min(4).url(),
  author : yup.string().required().min(4),
  summary : yup.string().required().min(20),

})

export function AddBook() {  
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: " ",
      image: " ",
      author: " ",
      summary: " ",
    },
    validationSchema : formValidationSchema,
    onSubmit : (newBook) => {
      console.log("Form values",values);
      addBook(newBook);
    }
  });
  
  const addBook = async(newBook) => {

    
    await fetch("https://63f80001cbdb951097599b22.mockapi.io/Books", {
      method: "POSt",
      body: JSON.stringify(newBook),
      headers: {
        "Content-Type": "application/json"
      }
    })
    navigate("/books")
        console.log(newBook);
      }

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
      <TextField error={errors.image && touched.image} helperText={errors.image && touched.image ? errors.image : null } value={values.image} name="image" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="image" variant="outlined" />
      <TextField error={errors.author && touched.author} helperText={errors.author && touched.author ? errors.author : null } value={values.author} name="author" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="author" variant="outlined" />
      <TextField error={errors.summary && touched.summary} helperText={errors.summary && touched.summary ? errors.summary : null } value={values.summary} name="summary" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="summary" variant="outlined" />
      <Button variant='outlined' type='submit'>Add Book</Button>
    </form>
  );
}