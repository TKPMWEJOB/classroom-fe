import { useState } from 'react';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/FolderOpen';
import EditCourseDialog from './EditCourseDialog';
import DeleteCourseDialog from './DeleteCourseDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'

const styles = {
  paperContainer: {
    height: 100,
    backgroundImage: `url(${"https://gstatic.com/classroom/themes/img_backtoschool.jpg"})`,
    backgroundSize: "cover"
  },
  description2lines: {
    display: "-webkit-box",
    maxWidth: "100%",
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "1.2",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  courseTitle: {
    display: "-webkit-box",
    maxWidth: "100%",
    textAlign: "left",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "Bold",
    fontSize: "20px",
    color: "white"
  },
  section: {
    display: "-webkit-box",
    maxWidth: "100%",
    textAlign: "left",
    lineHeight: "1.8",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "lighter",
    fontSize: "16px",
    color: "white"
  }
};

export default function CourseCard({ setIsLoaded, setCourses, setError, course, courses }) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleClickDelete = () => {
    setOpenDeleteDialog(true);
  };
  const handleClickEdit = () => {
    setOpenEditDialog(true);
  };

  const history = useHistory();

  const handleGoDetail = () => {
    let temp = '/courses/';
    let href = temp.concat(course.id);
    history.push(href);
  }
  console.log(courses);

  return (
    <div>
      <Card sx={{ width: 300 }} href={course.id}>
        <div style={styles.paperContainer}>
          <CardContent>
            <Typography style={styles.courseTitle} variant="Headline">
              {course.name}
            </Typography>
            <Typography style={styles.section} variant="Headline">
              {course.section ? course.section : <br />}
            </Typography>
            <Typography style={styles.section} variant="Headline">
              by {course.owner ? `${course.owner.firstName} ${course.owner.lastName}` : "Anonymous"}
            </Typography>
          </CardContent>
        </div>

        <CardActions disableSpacing>
          <IconButton aria-label="view" onClick={handleGoDetail}>
            <FolderIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={handleClickEdit}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="delete" onClick={handleClickDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <EditCourseDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        course={course}
        courses={courses}
        setCourses={setCourses}
        setError={setError}
        setIsLoaded={setIsLoaded}
      />
      <DeleteCourseDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        course={course}
        courses={courses}
        setCourses={setCourses}
        setError={setError}
        setIsLoaded={setIsLoaded}
      />
    </div>
  );
}
