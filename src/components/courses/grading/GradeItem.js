
import { TextField } from "@mui/material";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

export default function GradeItem({ id, title, point }) {
	const [disabled, setDisabled] = useState(true);
	const handleEdit = () => {
		console.log("handle edit");
		setDisabled(false);
	}

	const handleSave = () => {
		console.log("handle save");
		setDisabled(true);
	}

	const handleDelete = () => {
		console.log("handle delete");
		const msg = `Are you sure to delete: "${title}"?`;
		alert(msg);
	}

	return (
		<div style={{ padding: "10px", width: "100%", display: "flex" }}>
			<Paper elevation={3} style={{ padding: "10px", width: "100%", display: "flex" }}>
				<DragIndicatorIcon style={{ margin: "auto", height: "50%" }} />
				<TextField disabled={disabled} label="Title" defaultValue={title} sx={{ flexGrow: 1 }} required style={{ margin: "0px 10px" }} />
				<TextField label="Point" type="number" required style={{ width: 75 }} defaultValue={point} />

			</Paper>
			{disabled ?
				<IconButton onClick={handleEdit} style={{ margin: "auto", height: "50%" }}>
					<EditIcon />
				</IconButton>
				:
				<IconButton onClick={handleSave} style={{ margin: "auto", height: "50%" }}>
					<SaveIcon />
				</IconButton>
			}
			<IconButton onClick={handleDelete} style={{ margin: "auto", height: "50%" }}>
				<DeleteIcon />
			</IconButton>
		</div>
	)
}