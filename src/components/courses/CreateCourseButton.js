import React from 'react';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import CreateCourseDialog from './CreateUpdateCourseForm';

export default function CreateButton({ setError, setIsLoaded, setCourses, courses }) {
  const [open, setOpen] = React.useState(false);

  const handleCreate = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    fetch(`${process.env.REACT_APP_API_URL}/courses/`, {
      method: 'POST',
      body: JSON.stringify({
        name: e.target.course.value,
        section: e.target.section.value,
        subject: e.target.subject.value,
        room: e.target.room.value
      }),
      accept: '*/*',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      }
      else {
        return res.text().then(text => { throw new Error(text) })
      }
    })
      .then(
        (result) => {
          console.log(courses);
          const newList = courses.concat([result]);
          console.log(newList);
          setIsLoaded(true);
          setCourses(newList);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  return (
    <div style={{ padding: "12px" }}>
      <CreateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit}
        dialogTitle="Create course"
      />
      <Button variant="outlined" startIcon={<AddIcon />} onClick={handleCreate}>
        Add New Course
      </Button>
    </div>
  );
}
