import { useContext } from 'react';
import { Grid, Button, Paper } from "@mui/material";
import Banner from "./Banner";
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LinkIcon from '@mui/icons-material/Link'
import { SnackbarContext } from '../../../contexts/SnackbarContext';

export default function Stream({ course, role, gradeStructure }) {
	const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

	const copyHandle = async () => {
		if (!course.invitationId) {
			alert("No invitation link found!")
		}
		else {
			const invitationLink = `${process.env.REACT_APP_CLIENT_URL}/invitation/${course.invitationId}`;
			navigator.clipboard.writeText(invitationLink);
			handleSetMsgSnack("Invite link copied!");
			handleOpenSuccessSnack(true);
		}
	}
	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			gridTemplateColumns: '1fr',
		}}>
			<Grid container style={{ maxWidth: '1000px' }}>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<Banner course={course} />
				</Grid>
				<Grid
					container
					direction="row"
				>
					<Grid
						item
						container
						direction="column"
						sx={{ display: { xs: 'none', sm: 'block' } }}
						style={{ margin: '0px 24px 0px 0px', height: '100%', width: '196px' }}
					>

						{role === "student" ? "" :
							<Paper
								variant='outlined'
								sx={{ margin: 'auto', overflow: 'hidden' }}
								style={{ textAlign: 'center' }}
							>
								<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
									style={{ margin: 5, color: "primary" }}>
									Classroom's Code: {course.invitationId ? <Typography variant="h5" style={{ color: '#1565c0' }}>{course.invitationId}</Typography> : <Typography>Upcoming!</Typography>}
									<Button variant="contained" endIcon={<LinkIcon />} onClick={copyHandle}>
										invitation link
									</Button>
								</Typography>
							</Paper>
						}

						<Paper
							variant='outlined'
							sx={{ margin: '20px 0px 0px 0px', overflow: 'hidden' }}
							style={{ textAlign: 'center' }}
						>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
								style={{ margin: 5 }}>
								Grade Structure:
							</Typography>
							<List>
								{gradeStructure.map((grade) => {
									return (
										<ListItem>
											{grade.title}: {grade.point}
										</ListItem>
									);
								})}
							</List>
						</Paper>

						<Paper
							variant='outlined'
							sx={{ margin: '20px 0px 0px 0px', overflow: 'hidden' }}
							style={{ textAlign: 'center' }}
						>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
								style={{ margin: 5 }}>
								Classwork!
							</Typography>
						</Paper>
					</Grid>

					<Grid item lg md xs
						container
					>

						<Grid item lg md xs
							justifyContent="center"
							alignItems="center"
						>
							<Grid item lg md xs style={{ margin: '0px 0px 24px 0px' }} >
								<Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', padding: '0px 20px' }}>
									<h1>
										Hmm............<br />
										Your role: {role}
									</h1>
								</Paper>
							</Grid>
							<Grid item lg md xs style={{ margin: '0px 0px 24px 0px' }} >
								<Paper elevation={3} sx={{ margin: 'auto', overflow: 'hidden', padding: '0px 20px' }}>
									<h1>
										posts here
									</h1>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);

}

/*
fetch(`${process.env.REACT_APP_API_URL}/courses/${id}`, {
			headers: {
				"authorization": token,
			}
		})
			.then(res => {
				if (res.status === 200) {
					return res.json();
				}
				else {
					return res.text().then(text => { throw new Error(text) })
				}
			})
			.then(
				(result) => {
					setIsLoaded(true);
					console.log(result);
					setCourse(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
*/