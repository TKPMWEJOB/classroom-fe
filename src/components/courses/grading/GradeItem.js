import Snackbar from '@mui/material/Snackbar';
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import axios from 'axios';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';

export default function GradeItem({ grade, courseId, setIsSaved, setError, gradeStructure, setGradeStructure }) {
	const [disabled, setDisabled] = useState(true);
	const [loadingSave, setLoadingSave] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [editGrade, setEditGrade] = useState(grade);
	const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);
	const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
	const [message, setMessage] = useState('');

	const handleEdit = () => {
		console.log("handle edit");
		setDisabled(false);
	}

	const handleSave = async () => {
		console.log("handle save");
		setIsSaved(false);
		setLoadingSave(true);
		setDisabled(true);
		if (!editGrade.point) {
			editGrade.point = 0;
		}
		try {
			const res = await axios.put(`${process.env.REACT_APP_API_URL}/courses/${courseId}/grade-structure/update-one`, { data: editGrade });
			setGradeStructure(res.data);
			setIsSaved(true);
			setLoadingSave(false);
			handleOpenSuccessSnack(true);
			handleSetMsgSnack("Grade info changed!");
		} catch (err) {
			//setError(err);
			handleSetMsgSnack(err.response.data.message ? err.response.data.message : "Unknown error");
			handleOpenErrorSnack(true);
			setIsSaved(false);
			setLoadingSave(false);
		}
		setDisabled(true);
	}

	const handleDelete = async () => {
		if (grade.id !== null) {
			setLoadingDelete(true)
			//setIsLoading(true);
			setIsSaved(false);
			try {
				console.log(grade.id);
				const res = await axios.delete(`${process.env.REACT_APP_API_URL}/courses/${courseId}/grade-structure`, { data: { id: `${grade.id}` } });
				console.log("data:", res.data);

				let newGradeStructure = gradeStructure;

				newGradeStructure = newGradeStructure.filter(function (obj) {
					return obj.id !== grade.id;
				});

				setGradeStructure(newGradeStructure);
				setIsSnackbarOpen(false);
				setIsSaved(true);
				handleOpenSuccessSnack(true);
				handleSetMsgSnack("Grade deleted!");
				setLoadingDelete(false);
			} catch (err) {
				setError(err);
				setIsSaved(false);
				handleOpenErrorSnack(true);
				setLoadingDelete(false);
			}
		}
	}

	// const handleOpenDelete = (e) => {
	// 	on({
	// 		id: grade.id,
	// 		title: grade.title,
	// 		point: grade.point
	// 	});
	// }

	const handleChangeTitle = (e) => {
		if (e.target.value !== editGrade.title) {
			const newGrade = {
				id: editGrade.id,
				title: e.target.value,
				point: editGrade.point,
				index: editGrade.index
			}

			setEditGrade(newGrade);
		}
	}

	const handleChangePoint = (e) => {
		if (e.target.value !== editGrade.point) {
			const newGrade = {
				id: editGrade.id,
				title: editGrade.title,
				point: e.target.value,
				index: editGrade.index
			}

			setEditGrade(newGrade);
		}
	}

	function handleCloseSnackbar() {
		setIsSnackbarOpen(false);
	}

	const handleOpenDeleteSnackbar = () => {
		setIsSnackbarOpen(true);
		let msg = 'Are you sure to delete';
		grade.title ? msg = msg + `: "${grade.title}"?` : msg = msg + ' this input field?';
		setMessage(msg);
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
					onChange={handleChangeTitle}
				/>

				<TextField
					disabled={disabled}
					label="Point"
					type="number"
					style={{ width: 75 }}
					defaultValue={editGrade.point}
					onChange={handleChangePoint}
				/>

			</Paper>
			{disabled ?
				<IconButton onClick={handleEdit} style={{ margin: "auto", height: "50%", marginLeft: 10 }}>
					<EditIcon />
				</IconButton>
				:
				<LoadingButton onClick={handleSave} loading={loadingSave}
					style={{
						color: 'grey',
						margin: "auto auto auto 10px", width: '40px',
						minWidth: '40px', height: '40px', padding: '0px', borderRadius: '50%'
					}}>
					<SaveIcon />
				</LoadingButton>
			}
			<IconButton type="button" name={grade.id} onClick={handleOpenDeleteSnackbar}
				style={{
					color: 'grey',
					margin: "auto", width: '40px',
					minWidth: '40px', height: '40px', padding: '0px', borderRadius: '50%'
				}}>
				<DeleteIcon type="button" name={grade.id} />
			</IconButton>
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
						<LoadingButton loading={loadingDelete} color="inherit" size="small" onClick={handleDelete}>
							Delete
						</LoadingButton>
					</div>
				}
			/>
		</div>
	)
}