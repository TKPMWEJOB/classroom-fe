import { Grid, Paper } from "@mui/material";
import Banner from "./Banner";
import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { isTeacher, isStudent, isOwner } from '../../../utils/Role'

axios.defaults.withCredentials = true;
export default function Stream({ course, setCourse, role, setRole }) {
	/*const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const { userInfo, updateUser } = useContext(UserContext);
	const tokenLocal = JSON.parse(localStorage.getItem("token"))?.jwtToken;
	const { id } = useParams();*/

	
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
					justifyContent="center"
					alignItems="center"
				>
					<Grid 
						item 
						container 
						direction="column" 
						sx={{ display: { xs: 'none', sm: 'block' } }}
						style={{ margin: '0px 24px 0px 0px', height: '100%', width: '196px' }}
					>

						<Paper 
							variant='outlined' 
							sx={{ margin: 'auto', overflow: 'hidden'}} 
							style={{ textAlign: 'center', height: '20%' }}
						>
							<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
							style={{ margin: 5 }}>
								{course.invitationId? course.invitationId : 'Upcoming!'}
							</Typography>
						</Paper>
					</Grid>

					<Grid item lg md xs
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							item
							container
							direction="column"
							sx={{ display: { xs: 'none', sm: 'block' } }}
							style={{ margin: '0px 24px 0px 0px', height: '100%', width: '196px' }}
						>

							<Paper
								variant='outlined'
								sx={{ margin: 'auto', overflow: 'hidden' }}
								style={{ textAlign: 'center', height: '20%' }}
							>
								<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}
									style={{ margin: 5 }}>
									{course.invitationId ? course.invitationId : 'Upcoming!'}
								</Typography>
							</Paper>



						</Grid>

						<Grid item lg md xs
							direction="column"
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