import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Autocomplete,
  TextField,
  Chip,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import { fetchAllUsers } from '../../../Users/slice/users.slice'; // Update with your actual path
import { RootState, store } from '../../../../store/store';
import { User } from '../../../Authentication/models';
import { STORE_STATUS } from '../../../../shared/models';

interface StudentsListFieldProps {
  onStudentsChange: (students: User[]) => void;
}

export default function StudentsListField({
  onStudentsChange,
}: StudentsListFieldProps) {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { users, status } = useSelector((state: RootState) => state.users);
  const [selectedStudents, setSelectedStudents] = useState<User[]>([]);
  const [filteredParticipants, setFilteredParticipants] = useState<User[]>([]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    // Filter out only participants
    setFilteredParticipants(
      users.filter((user) => user.role === 'participant'),
    );
  }, [users]);

  useEffect(() => {
    // Call the prop function with the new student list
    onStudentsChange(selectedStudents);
  }, [selectedStudents, onStudentsChange]);

  const handleAddStudent = (_, value) => {
    // Prevent adding duplicates
    if (!value) return;
    if (!selectedStudents.find((student) => student.uid === value.uid)) {
      setSelectedStudents([...selectedStudents, value]);
    }
  };

  const handleDeleteStudent = (studentToDelete) => () => {
    setSelectedStudents((students) =>
      students.filter((student) => student.uid !== studentToDelete.uid),
    );
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography gutterBottom variant="h6">
        Students List
      </Typography>
      {status !== STORE_STATUS.LOADING ? (
        <Autocomplete
          options={filteredParticipants}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.uid === value.uid}
          onChange={handleAddStudent}
          renderInput={(params) => (
            <TextField {...params} label="Search and add students" />
          )}
        />
      ) : (
        <div>Loading...</div>
      )}
      {selectedStudents.length ? (
        <Box>
          <Typography sx={{ my: 2 }}>Students List</Typography>
          <Stack direction="row" spacing={1} mt={2}>
            {selectedStudents.map((student) => (
              <Chip
                key={student.uid}
                label={student.name}
                onDelete={handleDeleteStudent(student)}
              />
            ))}
          </Stack>
        </Box>
      ) : (
        <Typography fontStyle="italic">
          No students have been selected
        </Typography>
      )}
    </Box>
  );
}
