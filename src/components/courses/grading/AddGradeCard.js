
import { TextField } from "@mui/material";
import { useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import LoadingButton from '@mui/lab/LoadingButton';

export default function GradeItem({ grade, courseId, setIsSaved, setError, gradeStructure, setGradeStructure }) {
    const [loading, setLoading] = useState(false);
    const [editGrade, setEditGrade] = useState({ title: '', point: 0 });
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    async function handleAddGrade() {
        //find max index
        let index = 0;
        if (gradeStructure.length > 0) {
            const maxItemIndex = gradeStructure.reduce(function (prev, current) {
                return (prev.index > current.index) ? prev : current
            });
            index = maxItemIndex.index + 1;
        }

        const newGrade = {
            title: editGrade.title,
            point: editGrade.point,
            index: index
        };
        console.log(newGrade);
        setLoading(true);
        setIsSaved(false);
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/grade-structure`, newGrade);
            console.log("data:", res.data);

            // Find new grade had created
            let newData = res.data.filter(obj => obj.index === index)

            // construct new grade structure
            let newGradeStructure = gradeStructure.concat(newData);

            setGradeStructure(newGradeStructure);
            setIsSaved(true);
            setLoading(false);
            handleOpenSuccessSnack(true);
            handleSetMsgSnack("Grade added!");
        } catch (err) {
            setError(err);
            setIsSaved(false);
            setLoading(false);
            handleOpenErrorSnack(true);
        }


    }

    const handleChageTitle = (e) => {
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

    const handleChagePoint = (e) => {
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

    return (
        <div style={{ padding: "18px 26px", width: "100%", display: "flex" }}>
            <Paper elevation={3} style={{ padding: "10px", width: "100%", display: "flex" }}>
                <DragIndicatorIcon style={{ margin: "auto", height: "50%" }} />
                <TextField
                    label="Title"
                    sx={{ flexGrow: 1 }}
                    required
                    style={{ margin: "0px 10px" }}
                    onChange={handleChageTitle}
                />

                <TextField
                    label="Point"
                    type="number"
                    required
                    style={{ width: 75 }}
                    onChange={handleChagePoint}
                />

            </Paper>
            <LoadingButton loading={loading} onClick={handleAddGrade}
                style={{
                    margin: "auto auto auto 10px", width: '40px',
                    minWidth: '40px', height: '40px', padding: '0px', borderRadius: '50%'
                }}>
                <AddIcon />
            </LoadingButton>
            <div style={{ margin: 'auto', width: '40px', minWidth: '40px', height: '40px', padding: '0px', borderRadius: '50%' }}></div>
        </div>
    )
}