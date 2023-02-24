import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Count } from './Count';
import { useNavigate } from 'react-router-dom';

export function Book({ book,deleteButton,editButton }) {
  const [show, setshow] = useState(true);
  const navigate = useNavigate();
  return (
    <Card className="book-container">
      <img src={book.image} alt="image" className="book-cover" />
      <CardContent>
        <div className='book-title'>
          <h3>{book.name}
            <IconButton color='primary' onClick={() => setshow(!show)}>{show ? <ExpandMoreIcon /> : <ExpandLessIcon />}</IconButton>
          </h3>
          <p>{book.author}</p>
        </div>
        {show ? <p>{book.summary}</p> : null}
      </CardContent>
      <CardActions>
        <Count />{ editButton }{ deleteButton }
      </CardActions>
    </Card>
  );
}
