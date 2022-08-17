import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import axios from '../../axios';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { fetchDeletePost } from '../../redux/slice/post';
import { useDispatch } from 'react-redux';

const CardTodo = ({ text, completed, _id }) => {
  const [id, setId] = React.useState('');
  const [updateText, setText] = React.useState(text);
  const [updateCompleted, setCompleted] = React.useState(completed);
  const dispatch = useDispatch();

  const updateStatus = async (_id) => {
    setCompleted(!updateCompleted);
    const { data } = await axios.patch(`/notes/${_id}`);
  };
  const deleteNote = async (_id) => {
    dispatch(fetchDeletePost(_id));
  };

  const updateTextValue = async () => {
    const fields = {
      text: updateText,
    };
    const { data } = await axios.put(`/notes/${id}`, fields);
  };

  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {updateCompleted ? 'Completed' : ' No completed'}
          </Typography>
          <Typography
            sx={{ textDecoration: updateCompleted ? 'line-through' : ' ' }}
            variant="h5"
            component="div">
            {' '}
            {updateText}
          </Typography>
          <Button
            onClick={() => updateStatus(_id)}
            sx={{ mt: 2, mb: 2 }}
            size="large"
            variant="contained"
            fullWidth>
            complete
          </Button>
          <Button
            onClick={() => deleteNote(_id)}
            sx={{ mt: 2, mb: 2 }}
            size="large"
            variant="contained"
            fullWidth>
            delete
          </Button>

          <TextField
            onChange={(e) => {
              setText(e.target.value);
              setId(_id);
            }}
            sx={{ mt: 2, mb: 2 }}
            label="text"
            fullWidth
          />
          <Button
            onClick={() => {
              updateTextValue();
            }}
            type="submit"
            sx={{ mt: 2, mb: 2 }}
            size="large"
            variant="contained"
            fullWidth>
            update value
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CardTodo;
