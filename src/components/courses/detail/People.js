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
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

const Demo = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
}));

export default function People({ course, setCourse }) {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [studentsInfo, setStudentsInfo] = useState([]);
	const [teachersInfo, setTeachersInfo] = useState([]);
	const { id } = useParams();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		try {
			let result = await axios.get(`${process.env.REACT_APP_API_URL}/courses/`);
			setIsLoaded(true);

			setStudentsInfo(result.data);
			setTeachersInfo(result.data);
			console.log(teachersInfo);
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
						<Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main}} style={{padding: '0px 2	0px'}}>
							Teachers
						</Typography>
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
									<ListItemText>{teacher.name}</ListItemText>
								</ListItem>
							))}
						</List>
						<Typography variant="h4" sx={{ color: (theme) => theme.palette.primary.main }}>
							Students
						</Typography>
						<Divider
							sx={{ bgcolor: (theme) => theme.palette.primary.main }}
							style={{
								border: "none",
								height: 2,
								margin: 0,
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
									<Avatar>
										U
									</Avatar>
								</ListItemAvatar>
								<ListItemText>{students.name}</ListItemText>
							</ListItem>
						))}

					</Grid>
				</Grid>
			</div>
		);
	}
}