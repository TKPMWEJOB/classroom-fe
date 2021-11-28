
import { TextField } from "@mui/material";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function GradeItem({ grade, GradeStructure, setGradeStructure, onDelete }) {
	const [disabled, setDisabled] = useState(true);
	const handleEdit = () => {
		console.log("handle edit");
		setDisabled(false);
	}

	const handleSave = () => {
		console.log("handle save");
		setDisabled(true);
	}

	const handleDelete = (e) => {
		onDelete({ 
			id: grade.id, 
			title: grade.title, 
			point: grade.point 
		});
	}

	return (
		<div style={{ padding: "10px", width: "100%", display: "flex" }}>
			<Paper elevation={3} style={{ padding: "10px", width: "100%", display: "flex" }}>
				<DragIndicatorIcon style={{ margin: "auto", height: "50%" }} />
				<TextField disabled={disabled} label="Title" defaultValue={grade.title} sx={{ flexGrow: 1 }} required style={{ margin: "0px 10px" }} />
				<TextField label="Point" type="number" required style={{ width: 75 }} defaultValue={grade.point} />

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