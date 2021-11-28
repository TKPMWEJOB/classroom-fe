import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import GradeItem from "./GradeItem";

const fakedata = [
	{
		id: 2,
		title: "Nice and clear description",
		point: 20
	},
	{
		id: 4,
		title: "To ignore, add // eslint-disable-next-line to the line before.",
		point: 10
	},
	{
		id: 5,
		title: "Line 1:10:  'Redirect' is defined but never used",
		point: 20
	},
	{
		id: 6,
		title: "Either include them or remove the dependency array",
		point: 40
	}
]

export default function GradeList() {
	const [gradeStructure, setGradeStructure] = useState([])

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
									{gradeStructure.map(({ id, title, point }, index) => {
										return (
											<Draggable key={id.toString()} draggableId={id.toString()} index={index}>
												{(provided) => (
													<ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
														<GradeItem id={id}
															title={title}
															point={point}
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
			</Grid>
		</div>
	)
}