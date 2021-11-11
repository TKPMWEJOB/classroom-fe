import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/FolderOpen';
import EditCourseButton from './EditCourseButton';
import DeleteCourseButton from './DeleteCourseButton';

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
  return (
    <Card sx={{ width: 300 }} href={course.id}>
      <div style={styles.paperContainer}>
      <CardContent>
        <Typography style={styles.courseTitle} variant="Headline">
          {course.name}
        </Typography>
        <Typography style={styles.section} variant="Headline">
          {course.section ? course.section : <br/>}
        </Typography>
        <Typography style={styles.section} variant="Headline">
          by {course.instructor ? course.instructor : "Anonymous"}
        </Typography>
      </CardContent>
      </div>
      
      <CardActions disableSpacing>
        <IconButton aria-label="view" href={course.id}>
          <FolderIcon />
        </IconButton>

        <EditCourseButton
          course={course}
          courses={courses}
          setCourses={setCourses}
          setError={setError}
          setIsLoaded={setIsLoaded}
        />
        <DeleteCourseButton
          course={course}
          courses={courses}
          setCourses={setCourses}
          setError={setError}
          setIsLoaded={setIsLoaded}
        />
      </CardActions>
    </Card>
  );
}
