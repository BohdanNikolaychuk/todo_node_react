import { Box, Button, Flex, HStack, Input, Stack, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import { MdDoneAll, MdRemoveDone } from 'react-icons/md';
import { ITasks } from '../../@types/ITasks.interface';
import { useAppDispatch } from '../../hooks/redux';
import { fetchDeleteTask, fetchUpdateStatus, fetchUpdateTask } from '../../redux/Todo/asyncAction';
const Card = ({ text, completed, createdAt, userId, _id }: ITasks) => {
  const [NewText, setNewText] = useState('');
  const [updateCompleted, setCompleted] = useState(completed);

  const dispatch = useAppDispatch();
  const removeTask = (id: string) => {
    dispatch(fetchDeleteTask(id));
  };
  const changeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };
  const UpdateValue = () => {
    const data = {
      _id,
      text: NewText,
    };

    dispatch(fetchUpdateTask(data));
  };

  const CompleteTask = (id: string) => {
    setCompleted(!updateCompleted);
    dispatch(fetchUpdateStatus(id));
  };

  return (
    <Box
      w='xs'
      rounded={'sm'}
      my={5}
      mx={[0, 5]}
      bg='white'
      border={'1px'}
      borderColor='black'
      boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}
    >
      <Box p={4}>
        <Input
          sx={{ textDecoration: updateCompleted ? 'line-through' : ' ' }}
          onChange={changeTextValue}
          variant='flushed'
          placeholder={text}
        />
      </Box>
      <HStack borderTop={'1px'} color='black'>
        <Flex
          p={4}
          alignItems='center'
          justifyContent={'space-between'}
          roundedBottom={'sm'}
          cursor={'pointer'}
          w='full'
        >
          <Stack direction='row' spacing={4}>
            <Button onClick={() => removeTask(_id!)} colorScheme='teal' variant='solid'>
              <AiFillDelete />
            </Button>
            <Button onClick={() => UpdateValue()} colorScheme='teal' variant='outline'>
              <AiFillEdit />
            </Button>
            <Button onClick={() => CompleteTask(_id!)} colorScheme='teal' variant='outline'>
              {updateCompleted ? <MdRemoveDone /> : <MdDoneAll />}
            </Button>
          </Stack>
        </Flex>
      </HStack>
    </Box>
  );
};

export default Card;
