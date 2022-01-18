import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarExport,
    gridClasses
} from '@mui/x-data-grid';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
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
import SendIcon from '@mui/icons-material/Send';
import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';
import { useHistory } from 'react-router-dom';
import ButtonMenu from "./PublishButton";
import ButtonPublishMenu from "./MenuPublishButton";

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
    //const [draftData, setDraftData] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const [isReload, setIsReload] = useState(false);
    const [isClickedAction, setIsClickedAction] = useState(false);
    const [isClickedMenu, setIsClickedMenu] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [columnHeaders, setColumnHeaders] = useState([]);

    const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(async () => {
        setLoading(true);
        let isEditable = false;
        if (role === "student") {
            isEditable = false;
        }
        else {
            isEditable = true;
        }
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades`,
                {
                    // query URL without using browser cache
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Expires': '0',
                    },
                });
            // if (res.status === 200) {
            //console.log(res.data);
            setCsvData(res.data.resData);
            //setDraftData(res.data.draftData);
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
                    description: 'Double click to see in detail',
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
                                            {role == "student" ? "" : <ButtonMenu
                                                OnClickPublish={handleOpenDialog}
                                                className='appear-button'
                                                params={params}
                                                draftData={res.data.draftData}
                                                gradeStructure={gradeStructure}
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

            const action = {
                field: 'actions',
                type: 'actions',
                width: 120,
                sortable: false,
                disableClickEventBubbling: true,
                renderCell: () => {
                    return (
                        <Tooltip title="Return all grades to student" arrow>
                            <IconButton variant="contained" color="default" size="small" sx={{ml: 10}} onClick={handleOpenDialogAction}>
                                <SendIcon />
                            </IconButton>
                        </Tooltip>
                    );
                }
            }

            const columnsArray = [
                {
                    field: 'studentId', minWidth: 150, headerName: 'Student ID',
                    renderCell: (params) => {
                                    console.log(params)
                        return (
                            <Stack
                                width={150}
                                height={50}
                                direction="row"
                                justifyContent="space-between"
                                className={classes.root}
                            >
                                {
                                    params.row.userId ? 
                                        (params.row.isMapping ?
                                            <Link href={`/user/${params.row.userId}`} >{params.value}</Link> 
                                        : params.value)
                                    : params.value
                                }
                            </Stack>
                        );
                    }
                },
                { field: 'fullName', minWidth: 300, headerName: 'Full Name', editable: isEditable }
            ].concat(gradeStructureHeaders).concat(totalHeader).concat(action);

            setColumnHeaders(columnsArray);

        } catch (err) {
            setLoading(false);
            console.log(err);
            handleOpenErrorSnack(true);
            handleSetMsgSnack(err.response.data.message);
        }
    }, [isReload])
    

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
        const title = `Do you want to publish this grade to student?`;
        setDialogTitle(title);
        setIsClickedMenu(false);
        setIsClickedAction(false);
    };

    const handleOpenDialogAction = () => {
        setOpenDialog(true);
        const title = `Do you want to publish all grades to this student?`;
        setDialogTitle(title);
        setIsClickedMenu(false);
        setIsClickedAction(true);
    };

    const handleOpenDialogMenu = (e) => {
        if (e.target.value) {
            setOpenDialog(true);
            setItemTable(e.target.value);
            if (e.target.value === -1) {
                const title = `Do you want to publish grades to all students?`;
                setDialogTitle(title);
            }
            else {
                const result = gradeStructure.find(obj => {
                    return obj.id === e.target.value
                });
                const title = `Do you want to publish ${result.title} (${result.point}) to all students?`;
                setDialogTitle(title);
            }
            setIsClickedMenu(true);
            setIsClickedAction(false);
        }
        
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsClickedMenu(false);
        setIsClickedAction(false);
    };

    const handleCellClick = (e) => {
        setItemTable(e);
    };

    const handleHeaderClick = (e) => {
        const gradeIdOrder = parseInt(e.field.replace('grade', ''));
        const gradeId = gradeStructure[gradeIdOrder].id;
        //console.log(gradeId);
        const href = `/courses/${id}/grade/${gradeId}`;
        history.push(href);
        window.location.reload();
        
    };

    const handlePublish = async () => {
        setLoading(true);
        if (!isClickedAction && !isClickedMenu) {
            const gradeIdOrder = parseInt(itemTable.field.replace('grade', ''));
            const gradeId = gradeStructure[gradeIdOrder].id;
            const data = {
                studentId: itemTable.row.studentId,
                gradeId: gradeId
            }
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/publish-one-grade`, { data: data });
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
        }
        else if (isClickedAction) {
            const data = {
                studentId: itemTable.row.studentId
            }
            try {
                await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/publish-one-row`, { data: data });
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
        }
        else {
            const data = {
                gradeId: itemTable
            }

            if (itemTable === -1) {
                try {
                    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/publish-all`, { data: data });
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
            }
            else {
                try {
                    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${id}/grades/upload/publish-one-col`, { data: data });
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
            }
            
        }
        handleCloseDialog();
    };

    return (
        <div>
            <Box
                component="span"
            >
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    spacing={2}
                    sx={{mb: 2}}
                >
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: '#9e9e9e', cursor: 'pointer' }}
                    >
                        {loading ? "" : (isSaved ? "Saved" : "Saving . . .")}
                    </Typography>
                    {role == "student" ? '' : <ButtonPublishMenu gradeStructure={gradeStructure} setItemTable={setItemTable} onClick={handleOpenDialogMenu}/>}
                </Stack>

                {role == "student" ?
                    <DataGrid
                        autoHeight
                        columns={columnHeaders}
                        rows={csvData}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        rowsPerPageOptions={[5, 10, 20, 50, 100]}
                        pagination
                        loading={loading}
                        onColumnHeaderDoubleClick={handleHeaderClick}
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

            {role == "student" ? "" : <Box sx={{ display: "flex", margin: 2, justifyContent: "space-evenly" }}>
                <TemplateDownloadButton gradeStructure={gradeStructure} tableData={csvData} />
                <ImportStudentButton gradeStructure={gradeStructure} setIsReload={setIsReload} isReload={isReload} gradeData={csvData} />
                <UploadFullGradeButton gradeStructure={gradeStructure} setIsReload={setIsReload} isReload={isReload} />
            </Box>}

            {role == "student" ? "" : <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <LoadingButton loading={loading} onClick={handlePublish} autoFocus>
                        Pulish
                    </LoadingButton>
                </DialogActions>
            </Dialog>}
        </div>
    );
}