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

export default function ImportStudentButton({ gradeStructure }) {
    const [openPreview, setOpenPreview] = useState(false);
    const [fileName, setFileName] = useState("");
    const [csvDataPreview, setCsvDataPreview] = useState([]);
    const [csvDataSave, setCsvDataSave] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
	const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    const gradeStructureHeaders = gradeStructure.map(grade => {
        const header = {
            field: grade.title,
            headerName: `${grade.title} \n (${grade.point})`,
            width: 150
        }
        return header;
    });

    const { id } = useParams();
    const handleReviewCSV = (e) => {
        const files = e.target.files;
        //console.log(files);
        if (files) {
            //console.log(files[0]);
            setFileName(files[0].name);
            readString(files[0], {
                header: true,
                complete: function (results) {
                    console.log("Finished:", results.data);

                    /*const data = results.data.filter(function(item) {
                        return item["Student ID"] !== '';
                    });*/


                    const dataPreview = results.data.map((result, index) => {
                        const row = {
                            id: index,
                            studentId: result["Student ID"],
                            fullName: result["Full Name"]
                        };

                        Object.keys(gradeStructure).forEach(key => {
                            if (gradeStructure[key].title in result){
                                row[gradeStructure[key].title] = result[gradeStructure[key].title];
                            }
                            else {
                                row[gradeStructure[key].title] = 0;
                            }
                        });
                        
                        return row;
                    });

                    const dataSave = results.data.map((result, index) => {
                        const gradesPoint = gradeStructure.map(grade => {
                            let point;
                            if (grade.title in result){
                                point = result[grade.title];
                            }
                            else {
                                point = 0;
                            }
                            const newdata = {
                                gradeId: grade.id,
                                point: point
                            }
                            return newdata;
                        });

                        const newData = {
                            id: index,
                            studentId: result["Student ID"],
                            fullName: result["Full Name"],
                            gradesPoint: gradesPoint
                        };
                        
                        return newData;
                    });
                    
                    setCsvDataPreview(dataPreview);
                    setCsvDataSave(dataSave);
                }
            })
        }
        e.target.value = null;
        setOpenPreview(true);
    }

    const handleUpload = async () => {
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/full-grade`, { data: csvDataSave });
            setLoading(false);
            handleOpenSuccessSnack(true);
            handleSetMsgSnack("Imported Successfully");
            setOpenPreview(false);

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
                Upload Grades
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
                            Upload Grades
                        </LoadingButton>
                    </Toolbar>
                </AppBar>
                <Alert severity="warning">Import new grades will erase your old data!</Alert>
                <DataGrid
                    columns={[{ field: 'studentId', minWidth: 150, headerName: 'Student ID' },
                    { field: 'fullName', minWidth: 300, headerName: 'Full Name' }].concat(gradeStructureHeaders)}
                    rows={csvDataPreview}
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