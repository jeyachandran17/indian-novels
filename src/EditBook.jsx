import { useState } from 'react';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as yup from "yup";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const formValidationSchema = yup.object({
  name : yup.string().required().min(1),
  image : yup.string().required().min(4).url(),
  author : yup.string().required().min(4),
  summary : yup.string().required().min(20),

})

export function EditBook() {  
  const { id } = useParams();
  const [book, setbook] = useState(null)
  
  useEffect(() => {
    fetch(`https://63f80001cbdb951097599b22.mockapi.io/Books/${id}`)
      .then((data) => data.json())
        .then((data)=>setbook(data))
  }, [id])
  console.log(book);
  return (
    book ? <EditBookForm book={book} /> :  <div className='loading'><CircularProgress /></div>
  );
}

function EditBookForm({ book }) {
  const navigate = useNavigate();
    const {handleBlur,handleChange,handleSubmit,values,touched,errors} = useFormik({
    initialValues: {
      name: book.name,
      image:book.image,
      author: book.author,
      summary: book.summary,
    },
    validationSchema : formValidationSchema,
    onSubmit : (updatebook) => {
      console.log("Form values",values);
      editbook(updatebook);
    }
    });
    const editbook = async (updatebook) => {
    
   await fetch(`https://63f80001cbdb951097599b22.mockapi.io/Books/${book.id}`, {
      method : "PUT",
      body: JSON.stringify(updatebook),
      headers: {
        "Content-Type": "application/json",
      },
    })
    navigate("/books")

        console.log(updatebook); 
      }
    return (
    <form onSubmit={handleSubmit} className="add-book-form">
      <TextField error={errors.name && touched.name} helperText={errors.name && touched.name ? errors.name : null } value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Name" variant="outlined" />
      <TextField error={errors.image && touched.image} helperText={errors.image && touched.image ? errors.image : null } value={values.image} name="image" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="image" variant="outlined" />
      <TextField error={errors.author && touched.author} helperText={errors.author && touched.author ? errors.author : null } value={values.author} name="author" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="author" variant="outlined" />
      <TextField error={errors.summary && touched.summary} helperText={errors.summary && touched.summary ? errors.summary : null } value={values.summary} name="summary" onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="summary" variant="outlined" />
      <Button variant='outlined' type='submit'>Save</Button>
    </form>
  );
}