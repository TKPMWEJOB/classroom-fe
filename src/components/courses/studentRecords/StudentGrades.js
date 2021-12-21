import { useState, useEffect, useContext } from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses,
} from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ImportStudentButton from "./ImportStudentButton";
import UploadFullGradeButton from "./UploadFullGrades";
import TemplateDownloadButton from './TemplateDownloadButton';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { SnackbarContext } from "../../../contexts/SnackbarContext";

import ButtonMenu from "./PublishButton";

const useStyles = makeStyles(() => ({
    root: {
      "& .appear-button": {
        visibility: "hidden"
      },
      "&:hover .appear-button": {
        visibility: "visible"
      }
    }
}))

function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

export default function StudentGrades({ gradeStructure, role }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [itemTable, setItemTable] = useState(null);
    const [openPreview, setOpenPreview] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const { id } = useParams();
    const [columnHeaders, setColumnHeaders] = useState([]);
	const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    useEffect(async () => {
        setLoading(true);
        let isEditable = false;
        if(role === "student") {
            isEditable = false;
        }
        else {
            isEditable = true;
        }
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades`);
            // if (res.status === 200) {
            console.log(res.data);
            setCsvData(res.data);
            setLoading(false);
            //setCourses(res.data);
            let totalPoint = 0;
            gradeStructure.forEach(async (grade) => {
                totalPoint += grade.point;
            });

            const gradeStructureHeaders = gradeStructure.map((grade, index) => {
                const header = {
                    field: `grade${index}`,
                    headerName: `${grade.title} (${grade.point})`,
                    width: 150,
                    editable: isEditable,
                    renderCell: (params) => {
                        return (
                            <Stack 
                                width={150} 
                                height={50} 
                                direction="row"
                                justifyContent="space-between"
                                className={classes.root}
                            >
                                {
                                    params.value ? (
                                        <>
                                            <div>
                                                {params.value}
                                            </div>
                                            {role=="student"? "" : <ButtonMenu 
                                                OnClickPublish={handleOpenDialog}
                                                className='appear-button'
                                            />
                                            }
                                        </>
                                    ) : " " 
                                }
                            </Stack>
                        );
                    }
                }
                return header;
            });
        
            const totalHeader = {
                field: 'total',
                headerName: `Total (${totalPoint})`,
                width: 150,
                type: "number"
            }
        
            const columnsArray = [
                { field: 'studentId', minWidth: 150, headerName: 'Student ID',
                renderCell: (params) => {
                    return (
                        <Stack 
                            width={150} 
                            height={50} 
                            direction="row"
                            justifyContent="space-between"
                            className={classes.root}
                        >
                            {
                                params.value.userId ?
                                <Link href={`/user/${params.value.userId}`} >{params.value.value}</Link> :
                                params.value.value
                            }
                        </Stack>
                    );
                }
                },
                { field: 'fullName', minWidth: 300, headerName: 'Full Name', editable: isEditable}
            ].concat(gradeStructureHeaders).concat(totalHeader);

            setColumnHeaders(columnsArray);

        } catch (err) {
            setLoading(false);
            console.log(err);
            handleOpenErrorSnack(true);
            handleSetMsgSnack(err.response.data.message);
        }
    }, [])

    async function onCellChange(params, event, detail) {
        let newCsvData = csvData;
        newCsvData[params.id][`${params.field}`] = params.value;
        setCsvData(newCsvData);
        setIsSaved(false);
        //Send to server to save
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/update-one-row`, { data: csvData[params.id] });
            setIsSaved(true);

        } catch (err) {
            //setOpenPreview(false);
            handleOpenErrorSnack(true);
            handleSetMsgSnack(err.response.data.message);
        }
    }
   
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleCellClick = (e) => {
        setItemTable(e);
    };

    const handlePublish = async () => {
        const gradeIdOrder = parseInt(itemTable.field.replace('grade',''));
        const gradeId = gradeStructure[gradeIdOrder].id;
        //console.log(gradeId);
        const data = {
            studentId: itemTable.row.studentId,
            gradeId: gradeId,
            point: itemTable.value
        }
        setLoading(true);
        handleCloseDialog();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/publish-grade`, { data: data });
            setLoading(false);
            handleOpenSuccessSnack(true);
            handleSetMsgSnack("Publish Successfully");
            setOpenPreview(false);
        } catch (err) {
            setLoading(false);
            setOpenPreview(false);
            handleOpenErrorSnack(true);
            handleSetMsgSnack(err.response.data.message);
        }
    };

    return (
        <div>
            <Box
                component="span"
            >
                <Typography
                    variant="h5"
                    component="div"
                    align="right"
                    sx={{ color: '#9e9e9e', cursor: 'pointer' }}
                >
                    {loading ? "" : (isSaved ? "Saved" : "Saving . . .")}
                </Typography>

                {role =="student"? 
                <DataGrid
                    autoHeight
                    columns={columnHeaders}
                    rows={csvData}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pagination
                    loading={loading}
                    
                /> : <DataGrid
                    autoHeight
                    columns={columnHeaders}
                    rows={csvData}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pagination
                    loading={loading}
                    onCellEditCommit={onCellChange}
                    {...csvData}
                    onCellClick={handleCellClick}
                    components={{
                        Toolbar: CustomToolbar,
                    }}
                />
                }
                
            </Box>

            {role=="student"? "" : <Box sx={{display: "flex", margin: 2, justifyContent: "space-evenly"}}>
                <TemplateDownloadButton gradeStructure={gradeStructure} tableData={csvData} />
                <ImportStudentButton gradeStructure={gradeStructure} />
                <UploadFullGradeButton gradeStructure={gradeStructure} />
            </Box>}

            {role=="student"? "" : <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Do you want to pulish this grade?"}
                </DialogTitle>
                <DialogContent>
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handlePublish} autoFocus>
                    Pulish
                </Button>
                </DialogActions>
            </Dialog>}
        </div>
    );
}