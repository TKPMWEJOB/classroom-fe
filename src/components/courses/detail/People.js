import { Grid } from "@mui/material";
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Typography from '@mui/material/Typography';
import axios from "axios";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InvitationButton from '../../invitation/InvitationButton';



export default function People({ course, setCourse, role, setRole }) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [studentsInfo, setStudentsInfo] = useState([]);
	const [teachersInfo, setTeachersInfo] = useState([]);
	const { id } = useParams();
	

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		try {
			let result = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/people`);
			setIsLoaded(true);
			console.log("asasd:", result.data);

			setStudentsInfo(result.data.students[0].students);
			setTeachersInfo(result.data.teachers[0].teachers);
			console.log(result.data.teachers[0].teachers);
		} catch (error) {
			setIsLoaded(true);
			setError(error);
		}

	}, [id])
	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gridTemplateColumns: '1fr',
			}}>

				<Grid container style={{ maxWidth: '750px' }}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<ListItem
							secondaryAction={
								<InvitationButton course={course} role='teacher' />
							}
						>
							
							<Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main}} style={{padding: '0px 2	0px'}}>
								Teachers
							</Typography>
						</ListItem>
						
						
						<Divider
							sx={{ bgcolor: (theme) => theme.palette.primary.main }}
							style={{
								border: "none",
								height: 2,
								margin: 10,
							}}
						/>
						<List dense={false}>
							{teachersInfo.map((teacher) => (
								<ListItem key={teacher.id}
									secondaryAction={
										<IconButton edge="end" aria-label="delete">
											<DeleteIcon />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<Avatar sx={{ width: 32, height: 32 }}>
											U
										</Avatar>
									</ListItemAvatar>
									<ListItemText>{teacher.firstName ? teacher.firstName : teacher.email}</ListItemText>
								</ListItem>
							))}
						</List>
						<ListItem
							style={{
								marginTop: 10,
							}}
							secondaryAction={
								<InvitationButton course={course} role='student' />
							}
						>
							
							<Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main}} style={{padding: '0px 2	0px'}}>
								Student
							</Typography>
						</ListItem>
						<Divider
							sx={{ bgcolor: (theme) => theme.palette.primary.main }}
							style={{
								border: "none",
								height: 2,
								margin: 10,
							}}
						/>

						{studentsInfo.map((students) => (
							<ListItem key={students.id}
								secondaryAction={
									<IconButton edge="end" aria-label="delete">
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemAvatar>
									<Avatar sx={{ width: 32, height: 32 }}>
										U
									</Avatar>
								</ListItemAvatar>
								<ListItemText>{students.firstName ? students.firstName : students.email}</ListItemText>
							</ListItem>
						))}

					</Grid>
				</Grid>
			</div>
		);
	}
}