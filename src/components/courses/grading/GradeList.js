import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import Box from "@mui/material/Box";
import ListItem from '@mui/material/ListItem';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GradeItem from "./GradeItem";
import AddGradeCard from './AddGradeCard'

export default function GradeList({ gradeStructure, setGradeStructure }) {
	const [isLoading, setIsLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(true);
	const [error, setError] = useState(null);
	const { id } = useParams();

	async function handleOnDragEnd(result) {
		if (!result.destination) {
			return;
		}
		//console.log("handle drag end");
		const items = Array.from(gradeStructure);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		const newGradeStructure = resetIndex(items);
		setGradeStructure(items);
		setIsSaved(false);
		try {
			await axios.put(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/update-all`, { data: newGradeStructure });
			setGradeStructure(items);
			setIsSaved(true);
		} catch (err) {
			setError(err);
			setIsSaved(false);
		}
	}

	async function handleSave() {
		let items = gradeStructure;
		setIsSaved(false);
		try {
			const res = await axios.put(`${process.env.REACT_APP_API_URL}/courses/${id}/grade-structure/update-all`, { data: items });
			console.log(res.data);
			setGradeStructure(items);
			setIsSaved(true);
		} catch (err) {
			setError(err);
			setIsSaved(false);
		}
	}

	function resetIndex(tempStructure) {
		let index = 0;

		const newGradeStructure = tempStructure.map(function (obj) {
			obj.index = index;
			index++;
			return obj;
		});

		return newGradeStructure;
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
					<Typography
						variant="p"
						component="div"
						sx={{ color: '#9e9e9e', cursor: 'pointer' }}
						onClick={handleSave}
					>
						{isSaved ? "Saved" : "Saving . . ."}
					</Typography>

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
																setIsSaved={setIsSaved}
																setError={setError}
																gradeStructure={gradeStructure}
																setGradeStructure={setGradeStructure}
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
					<AddGradeCard courseId={id}
						isSaved={isSaved}
						setIsSaved={setIsSaved}
						setError={setError}
						gradeStructure={gradeStructure}
						setGradeStructure={setGradeStructure}
					/>
				</Grid>
			</div>
		)
	}
}