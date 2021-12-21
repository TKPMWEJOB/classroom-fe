import { useState, useEffect, useContext } from 'react'
import { readString, CSVDownloader } from 'react-papaparse';
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import ImportStudentButton from "./ImportStudentButton";
import UploadFullGradeButton from "./UploadFullGrades";
import TemplateDownloadButton from './TemplateDownloadButton';

export default function StudentGrades({ gradeStructure }) {
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const [isSaved, setIsSaved] = useState(true);
    const { id } = useParams();
    const [columnHeaders, setColumnHeaders] = useState([]);
	const { handleOpenErrorSnack, handleOpenSuccessSnack, handleSetMsgSnack } = useContext(SnackbarContext);

    useEffect(async () => {
        setLoading(true);
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

            const gradeStructureHeaders = gradeStructure.map((grade, id) => {
                const header = {
                    field: 'grade' + id,
                    headerName: `${grade.title} \n (${grade.point})`,
                    width: 150,
                    editable: true,
                    type: "number"
                }
                return header;
            });
        
            const totalHeader = {
                field: 'total',
                headerName: `Total \n (${totalPoint})`,
                width: 150,
                type: "number"
            }
        
            const columnsArray = [
                { field: 'studentId', minWidth: 150, headerName: 'Student ID', editable: true },
                { field: 'fullName', minWidth: 300, headerName: 'Full Name', editable: true }
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

                <DataGrid
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
                />
            </Box>

            <Box sx={{display: "flex", margin: 2, justifyContent: "space-evenly"}}>
                <TemplateDownloadButton gradeStructure={gradeStructure} />
                <ImportStudentButton gradeStructure={gradeStructure} />
                <UploadFullGradeButton gradeStructure={gradeStructure} />
            </Box>

        </div>
    );
}