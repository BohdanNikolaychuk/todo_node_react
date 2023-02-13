import { Box, Button, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';

import Card from '../../components/Card/Card';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchTasks } from '../../redux/Todo/asyncAction';
import { selectTasksData } from '../../redux/Todo/selector';

import { ITasks } from '../../@types/ITasks.interface';
import ModalWindow from '../../components/Modal/Modal';
const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { tasks } = useAppSelector(selectTasksData);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <Box mt={5} display='flex' justifyContent='center'>
        <Button onClick={onOpen} colorScheme='teal' variant='outline'>
          Add New Task
        </Button>
      </Box>
      <ModalWindow isOpen={isOpen} onClose={onClose} />
      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}>
        {tasks.map((task: ITasks) => {
          return (
            <GridItem key={task._id} pl={{ base: '10px', sm: '25px', lg: '15px' }}>
              <Card {...task}></Card>
            </GridItem>
          );
        })}
      </Grid>
    </>
  );
};

export default Dashboard;
