import { useState, useEffect } from 'react'
import ImportStudentButton from "./ImportStudentButton";
import UploadFullGradeButton from "./UploadFullGrades";
import { readString, CSVDownloader } from 'react-papaparse';
import Button from "@mui/material/Button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export default function StudentGrades({ gradeStructure }) {
    const [openPreview, setOpenPreview] = useState(false);
    const [fileName, setFileName] = useState("");
    const [csvData, setCsvData] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    
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

    const columnsArray = [
        { field: 'studentId', minWidth: 150, headerName: 'Student ID', editable: true },
        { field: 'fullName', minWidth: 300, headerName: 'Full Name', editable: true }
    ].concat(gradeStructureHeaders);

    useEffect(async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${id}/grades`);
            // if (res.status === 200) {
            console.log(res.data);
            setCsvData(res.data);
            //setIsLoaded(true);
            //setCourses(res.data);
        } catch (err) {
            console.log(err);
            if (err.response?.status === 401) {
            //updateUser(false, null);
            }
            //setIsLoaded(true);
            //setError(err);
        }
    }, [])

    return (
        <div>
            <Box
                component="span"
            >
                <DataGrid
                    autoHeight
                    columns={columnsArray}
                    rows={csvData}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20, 50, 100]}
                    pagination
                    {...csvData}
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
        </div>
    );
}