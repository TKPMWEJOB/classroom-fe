
import React from 'react';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import UpdateCourseDialog from './CreateUpdateCourseForm';

export default function EditButton({ setIsLoaded, setCourses, setError, course, courses }) {
  const [open, setOpen] = React.useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const handleClickEdit = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    setOpen(false);
    fetch(`${process.env.REACT_APP_API_URL}/courses/${course.id}`, {
      method: 'PUT',
      accept: '*/*',
      body: JSON.stringify({
        name: e.target.course.value,
        section: e.target.section.value,
        subject: e.target.subject.value,
        room: e.target.room.value
      }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': token.jwtToken,
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
          const newList = courses.map((item) => {
            if (parseInt(item.id) === parseInt(result.id)) {
              item = result;
            }
            return item;
          }); 
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
  }

  return (
    <div style={{ padding: "12px" }}>
      <UpdateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmitEdit}
        dialogTitle="Update course"
        course={course}
      />

      <IconButton aria-label="delete" onClick={handleClickEdit}>
        <EditIcon />
      </IconButton>
    </div>
  );
}
