import { useState, useContext } from 'react';
import CreateCourseDialog from './CreateUpdateCourseForm';
import { Redirect } from 'react-router';
import axios from 'axios'
import { SnackbarContext } from '../../contexts/SnackbarContext';

axios.defaults.withCredentials = true;
export default function CreateButton({ open, setOpen }) {
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);
  
  const handleClose = () => {
    setOpen(false);
    handleOpenErrorSnack(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses/`, {
        name: e.target.course.value,
        section: e.target.section.value,
        subject: e.target.subject.value,
        room: e.target.room.value
      });
      setRedirect(`courses/${res.data.id}`);
      handleSetMsgSnack("Classroom created!");
      handleOpenSuccessSnack(true);
      setLoading(false);
    } catch (err) {

      handleSetMsgSnack(err.response.data.message ? err.response.data.message : "Unknown error");
      handleOpenErrorSnack(true);
      setLoading(false);
    }
  };
  
  if (redirect) {
    const redirectURL = `/${redirect}`
    return (<Redirect push to={redirectURL} />)
  }
  else
    return (
      <div>
        <CreateCourseDialog open={open} handleClose={handleClose} handleSubmit={handleSubmit} loading={loading}
          dialogTitle="Create course"
        />
      </div>
    );
}
