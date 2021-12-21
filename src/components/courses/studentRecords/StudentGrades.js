import { useState, useEffect, useContext } from 'react'
import ImportStudentButton from "./ImportStudentButton";
import UploadFullGradeButton from "./UploadFullGrades";
import { readString, CSVDownloader } from 'react-papaparse';
import axios from "axios";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/core/styles";

import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import { SnackbarContext } from "../../../contexts/SnackbarContext";

import ButtonMenu from "./PublishButton";

const options = [
    'Publish Point'
];

const ITEM_HEIGHT = 48;

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

export default function StudentGrades({ gradeStructure }) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [itemTable, setItemTable] = useState(null);
    const [openPreview, setOpenPreview] = useState(false);
    const [fileName, setFileName] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [columnHeaders, setColumnHeaders] = useState([]);
    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    useEffect(async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades`);
            // if (res.status === 200) {
            console.log(res.data);
            setCsvData(res.data);
            //setIsLoaded(true);
            //setCourses(res.data);
            let totalPoint = 0;
            gradeStructure.forEach(async (grade) => {
                totalPoint += grade.point;
            });

            const gradeStructureHeaders = gradeStructure.map((grade, index) => {
                const header = {
                    field: `grade${grade.id}`,
                    headerName: `${grade.title} \n (${grade.point})`,
                    width: 150,
                    editable: true,
                    renderCell: (params) => {
                        return (
                            <Stack 
                                width={150} 
                                height={50} 
                                direction="row"
                                justifyContent="space-between"
                                className={classes.root}
                            >
                                {params.value}
                                <ButtonMenu 
                                    OnClickPublish={handleOpenDialog}
                                    className='appear-button'
                                ></ButtonMenu>
                            </Stack>
                        );
                    }
                }
                return header;
            });
        
            const totalHeader = {
                field: 'total',
                headerName: `total \n (${totalPoint})`,
                width: 150,
                editable: true,
                type: "number"
            }
        
            const columnsArray = [
                { field: 'studentId', minWidth: 150, headerName: 'Student ID', editable: true },
                { field: 'fullName', minWidth: 300, headerName: 'Full Name', editable: true }
            ].concat(gradeStructureHeaders).concat(totalHeader);

            setColumnHeaders(columnsArray);

        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
            //updateUser(false, null);
            }
            //setIsLoaded(true);
            //setError(err);
        }
    }, [])

   
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
        const gradeId = itemTable.field.replace('grade','');
        const data = {
            studentId: itemTable.row.studentId,
            gradeId: gradeId,
            point: itemTable.value
        }
        //console.log(data);
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
                <DataGrid
                    autoHeight
                    columns={columnHeaders}
                    rows={csvData}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pagination
                    {...csvData}
                    onCellClick={handleCellClick}
                />
                
            </Box>
            
            <Button>
                <CSVDownloader
                    data={[
                        {
                            "Student ID": "",
                            "Full Name": ""
                        },
                    ]}
                    filename={'StudentListTemplate'}
                >
                    Download
                </CSVDownloader>
            </Button>

            <ImportStudentButton gradeStructure={gradeStructure}>
            </ImportStudentButton>
            <UploadFullGradeButton gradeStructure={gradeStructure}>
            </UploadFullGradeButton>
            
            <Dialog
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
            </Dialog>
        </div>
    );
}