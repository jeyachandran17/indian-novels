import { Book } from './Book';
import { useState } from "react";
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

export function BookList() {
  const navigate = useNavigate();
  const [book, setbook] = useState([])

  const getbook = () => {
    fetch("https://63f80001cbdb951097599b22.mockapi.io/Books", {
        method: "GET",
      })
      .then((data) => data.json())
        .then((data)=>setbook(data))
  }
  
  useEffect(() => getbook(), [])
  
  const deletebook = (id) => {
    console.log("deleting the Book,id");
    fetch(`https://63f80001cbdb951097599b22.mockapi.io/Books/${id}`, {
      method: "DELETE"
    }).then(() => getbook());
  }

  return (
    <div>
      <div className='book-list'>
        {book.map((data) => (<Book key={data.id} book={data} id ={data.id} deleteButton={<IconButton sx={{marginLeft:"auto"}} color="error" onClick={()=>deletebook(data.id)}><DeleteIcon/></IconButton>} editButton={<IconButton sx={{marginLeft:"auto"}} color="secondary" onClick={()=>navigate(`/books/edit/${data.id}`)}><EditIcon/></IconButton>} />))}
      </div>
    </div>
  );
}
