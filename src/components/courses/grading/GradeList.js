import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GradeItem from "./GradeItem";


export default function GradeList() {
	const [gradeStructure, setGradeStructure] = useState([]);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [targetDeleteId, setTargetDeleteId] = useState(null);
	const [message, setMessage] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { id } = useParams();

	// get grade structure
	useEffect(async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure`);			
			console.log("data:", res.data);
			setGradeStructure(res.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error);
		}

	}, [id])

	// add grade
	async function handleAddGrade() {
		//find max index
		setIsLoading(true);
		let index = 0;
		if(gradeStructure.length > 0) {
			const maxItemIndex = gradeStructure.reduce(function(prev, current) {
				return (prev.index > current.index) ? prev : current
			});
			index = maxItemIndex.index + 1;
		}
		
		
		const newGrade = {
			title: '',
			point: 0,
			index: index
		};

		try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure`, newGrade);
			console.log("data:", res.data);

			// Find new grade had created
			let newData = res.data.filter(obj => obj.index === index)

			// construct new grade structure
			let newGradeStructure = gradeStructure.concat(newData);
			
			setGradeStructure(newGradeStructure);

			setIsLoading(false);
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}
	}

	// delete grade
	const handleDelete = async () => {
		if (targetDeleteId !== null) {
			setIsLoading(true);
			try {
				console.log(targetDeleteId);
				const res = await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure`, { data: { id: `${targetDeleteId}` } });
				console.log("data:", res.data);

				let newGradeStructure = gradeStructure;
				
				newGradeStructure = newGradeStructure.filter(function( obj ) {
					return obj.id !== targetDeleteId;
				});

				setGradeStructure(newGradeStructure);
				setTargetDeleteId(null);
				setIsLoading(false);
			} catch (err) {
				setError(err);
				setIsLoading(false);
			}
		}
	}

	async function handleOnDragEnd(result) {
		if (!result.destination) {
			return;
		}
		console.log("handle drag end");
		const items = Array.from(gradeStructure);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		const newGradeStructure = resetIndex(items);
		setIsLoading(true);
		try {
			const res = await axios.put(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/update-all`, { data: newGradeStructure});
			setGradeStructure(items);
			setIsLoading(false);
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}
	} 

	function resetIndex(tempStructure) {
		let index = 0;

		const newGradeStructure = tempStructure.map(function(obj) { 
			obj.index = index; 
			index++;
			return obj;
		});
		
		return newGradeStructure;
	}

	function handleCloseSnackbar() {
		setIsSnackbarOpen(false);
	}

	const handleOpenDeleteSnackbar = (values) => {
		setIsSnackbarOpen(true);
		let msg = 'Are you sure to delete';
		values.title ? msg = msg + `: "${values.title}"?` : msg = msg + ' this input field?';
		setMessage(msg);
		setTargetDeleteId(values.id);
		
	}

	

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (isLoading) {
		return (
			<Box sx={{ width: '100%' }}>
			  <LinearProgress />
			</Box>
		  );
	} else {
		return (
			<div style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				gridTemplateColumns: '1fr',
			}}>

				<Grid container style={{ maxWidth: '800px' }}>
					<Grid item lg={12} md={12} sm={12} xs={12}>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="grades">
								{(provided) => (
									<List className="grades" {...provided.droppableProps} ref={provided.innerRef}>
										{gradeStructure.map((grade, index) => {
											return (
												<Draggable key={grade.id.toString()} draggableId={grade.id.toString()} index={index}>
													{(provided) => (
														<ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
															<GradeItem 
																grade={grade}
																courseId={id}
																setIsLoading={setIsLoading}
																setError={setError}
																gradeStructure={gradeStructure}
																setGradeStructure={setGradeStructure}
																onDelete={handleOpenDeleteSnackbar}
															/>
														</ListItem>
													)}
												</Draggable>
											);
										})}
										{provided.placeholder}
									</List>
								)}
							</Droppable>
						</DragDropContext>
					</Grid>
					<Grid item lg={12} md={12} sm={12} xs={12} sx={{ justifyContent: 'center', textAlign: 'center' }}>
						<IconButton style={{ width: 50, height: 50 }} edge="end" onClick={handleAddGrade}>
							<AddIcon style={{ width: 30, height: 30 }} />
						</IconButton>
					</Grid>
				</Grid>
				<Snackbar
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
					open={isSnackbarOpen}
					autoHideDuration={8000}
					onClose={handleCloseSnackbar}
					message={message}
					action={
						<div> 
							<Button color="inherit" size="small" onClick={handleCloseSnackbar}>
								Cancel
							</Button>
							<Button color="inherit" size="small" onClick={handleDelete}>
								Delete
							</Button>
						</div>
					}
				/>
			</div>
		)
	}
}