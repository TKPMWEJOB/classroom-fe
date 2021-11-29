
import { TextField } from "@mui/material";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from 'axios';

export default function GradeItem({ grade, courseId, setIsLoading, setError, gradeStructure, setGradeStructure, onDelete }) {
	const [disabled, setDisabled] = useState(true);
	const [editGrade, setEditGrade] = useState(grade);

	const handleEdit = () => {
		console.log("handle edit");
		setDisabled(false);
	}

	const handleSave = async () => {
		console.log("handle save");
		setIsLoading(true);
		try {
			const res = await axios.put(`${process.env.REACT_APP_API_URL}/courses/${courseId}/grade-structure/update-one`, { data: editGrade });
			setGradeStructure(res.data);
			setIsLoading(false);
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}
		setDisabled(true);
	}

	const handleDelete = (e) => {
		onDelete({ 
			id: grade.id, 
			title: grade.title, 
			point: grade.point 
		});
	}

	const handleChageTitle = (e) => {
		if(e.target.value !== editGrade.title)
		{
			const newGrade = {
				id: editGrade.id,
				title: e.target.value,
				point: editGrade.point,
				index: editGrade.index
			}

			setEditGrade(newGrade);
		}
	}

	const handleChagePoint = (e) => {
		if(e.target.value !== editGrade.point)
		{
			const newGrade = {
				id: editGrade.id,
				title: editGrade.title,
				point: e.target.value,
				index: editGrade.index
			}

			setEditGrade(newGrade);
		}
	}

	return (
		<div style={{ padding: "10px", width: "100%", display: "flex" }}>
			<Paper elevation={3} style={{ padding: "10px", width: "100%", display: "flex" }}>
				<DragIndicatorIcon style={{ margin: "auto", height: "50%" }} />
				<TextField 
					disabled={disabled} 
					label="Title" 
					defaultValue={editGrade.title} 
					sx={{ flexGrow: 1 }} 
					required 
					style={{ margin: "0px 10px" }} 
					onChange={handleChageTitle}
				/>

				<TextField 
					disabled={disabled}
					label="Point" 
					type="number" 
					required 
					style={{ width: 75 }} 
					defaultValue={editGrade.point} 
					onChange={handleChagePoint}
				/>

			</Paper>
			{disabled ?
				<IconButton onClick={handleEdit} style={{ margin: "auto", height: "50%", marginLeft: 10 }}>
					<EditIcon />
				</IconButton>
				:
				<IconButton onClick={handleSave} style={{ margin: "auto", height: "50%", marginLeft: 10 }}>
					<SaveIcon />
				</IconButton>
			}
			<IconButton type="button" name={grade.id} onClick={ handleDelete } style={{ margin: "auto", height: "50%", marginRight: -30 }}>
				<DeleteIcon type="button" name={grade.id}/>
			</IconButton>
		</div>
	)
}