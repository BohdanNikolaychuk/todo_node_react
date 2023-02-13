import { useState } from 'react';

import {
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useAppDispatch } from '../../hooks/redux';
import { fetchAddTask } from '../../redux/Todo/asyncAction';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWindow = ({ isOpen, onClose }: Props) => {
  const [text, setTaskText] = useState('');
  const dispatch = useAppDispatch();
  const ChangeTaskText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskText(e.target.value);
  };

  const submit = () => {
    const aValue = localStorage.getItem('userToken');

    dispatch(fetchAddTask({ text, aValue }));
    setTaskText('');
    onClose();
  };

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task text</FormLabel>
              <Input value={text} onChange={ChangeTaskText} type='text' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => submit()} variant='ghost'>
              Add new Task
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalWindow;
