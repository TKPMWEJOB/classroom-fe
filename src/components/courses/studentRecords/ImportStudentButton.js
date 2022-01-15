import { readString } from 'react-papaparse'
import Button from "@mui/material/Button"
import { useState, useContext } from "react";
import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import { SnackbarContext } from "../../../contexts/SnackbarContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImportStudentButton({ gradeStructure, setIsReload, isReload, gradeData }) {
    const [openPreview, setOpenPreview] = useState(false);
    const [fileName, setFileName] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const gradeStructureHeaders = gradeStructure.map((grade, index) => {
        const header = {
            field: `grade${index}`,
            headerName: `${grade.title} \n (${grade.point})`,
            width: 150,
        }
        return header;
    });

    const { id } = useParams();
    const handleReviewCSV = (e) => {
        const files = e.target.files;
        console.log(files);
        if (files) {
            console.log(files[0]);
            setFileName(files[0].name);
            readString(files[0], {
                skipEmptyLines: true,
                header: true,
                complete: function (results) {
                    console.log("Finished:", results.data);
                    const data = results.data.map((result, index) => {
                        let row = {
                            id: index,
                            studentId: result["Student ID"],
                            fullName: result["Full Name"]
                        }
                        const grade = gradeData.find(element => element.studentId.value === row.studentId || element.studentId === row.studentId);
                        console.log(grade);
                        if (grade) {
                            row = Object.assign(grade, row);
                        }
                        return row;
                    });
                    //console.log(gradeData);
                    //console.log(data);
                    setCsvData(data);
                }
            })
        }
        e.target.value = null;
        setOpenPreview(true);
    }

    const handleUpload = async () => {
        setLoading(true);
        setIsReload(false);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/studentlist`, { data: csvData });
            setLoading(false);
            handleOpenSuccessSnack(true);
            handleSetMsgSnack("Imported Successfully");
            setOpenPreview(false);
            setIsReload(!isReload);
        } catch (err) {
            setLoading(false);
            setOpenPreview(false);
            handleOpenErrorSnack(true);
            handleSetMsgSnack(err.response.data.message);
        }
    };

    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                component="label"
            >
                Import Student List
                <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={(e) => { handleReviewCSV(e) }}
                />
            </Button>

            <Dialog
                fullScreen
                open={openPreview}
                onClose={handleClosePreview}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClosePreview}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {fileName}
                        </Typography>
                        <LoadingButton autoFocus color="inherit" onClick={handleUpload} loading={loading}>
                            Upload
                        </LoadingButton>
                    </Toolbar>
                </AppBar>
                <Alert severity="warning">Import student list will erase your old data!</Alert>
                <DataGrid
                    columns={[{ field: 'studentId', minWidth: 150, headerName: 'Student ID' },
                    { field: 'fullName', minWidth: 300, headerName: 'Full Name' }].concat(gradeStructureHeaders)}
                    rows={csvData}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pagination
                    {...csvData}
                />
            </Dialog>
        </div>
    );
}