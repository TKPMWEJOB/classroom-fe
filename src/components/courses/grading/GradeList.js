import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GradeItem from "./GradeItem";

const fakedata = [
	{
		id: 0,
		title: "Nice and clear description",
		point: 20
	},
	{
		id: 1,
		title: "To ignore, add // eslint-disable-next-line to the line before.",
		point: 10
	},
	{
		id: 2,
		title: "Line 1:10:  'Redirect' is defined but never used",
		point: 20
	},
	{
		id: 3,
		title: "Either include them or remove the dependency array",
		point: 40
	}
]

export default function GradeList() {
	const [gradeStructure, setGradeStructure] = useState([]);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [isDelete, setIsDelete] = useState(false);
	const [targetDeleteId, setTargetDeleteId] = useState(null);
	const [message, setMessage] = useState('');

	useEffect(async () => {
		try {
			setGradeStructure(fakedata)
			console.log(fakedata)
		} catch (error) {
			console.log(error);
			// error
		}

	}, [])

	function handleOnDragEnd(result) {
		if (!result.destination) {
			return;
		}
		console.log("handle drag end");
		const items = Array.from(gradeStructure);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setGradeStructure(items);
		console.log(items);
	} 

	function handleCloseSnackbar() {
		setIsSnackbarOpen(false);
	}

	function handleAddGrade() {
		//find max id
		const maxItemId = gradeStructure.reduce(function(prev, current) {
			return (prev.id > current.id) ? prev : current
		});
		const newId = maxItemId.id + 1;
		
		const newGradeList = gradeStructure.concat({
			id: newId,
			title: '',
			point: 0,
		});
		setGradeStructure(newGradeList);
	}

	const handleDelete = () => {
		if (targetDeleteId !== null) {
			setGradeStructure(gradeStructure.filter(item => item.id !== targetDeleteId));
			setTargetDeleteId(null);
			setIsSnackbarOpen(false);
		}
	}

	const handleOpenDeleteSnackbar = (values) => {
		setIsSnackbarOpen(true);
		let msg = 'Are you sure to delete';
		values.title ? msg = msg + `: "${values.title}"?` : msg = msg + ' this input field?';
		setMessage(msg);
		setTargetDeleteId(values.id);
		
	}

	

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
															GradeStructure={gradeStructure}
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
				<Grid item lg={12} md={12} sm={12} xs={12} sx={{ justifyContent: 'center', textAlign: 'right' }}>
					<Button variant="contained">Save</Button>
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