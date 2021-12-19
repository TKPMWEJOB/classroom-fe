import ImportStudentButton from "./ImportStudentButton";
import UploadFullGradeButton from "./UploadFullGrades";
import { readString, CSVDownloader } from 'react-papaparse';
import Button from "@mui/material/Button";

export default function StudentGrades({ gradeStructure }) {
    return (
        <div>
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