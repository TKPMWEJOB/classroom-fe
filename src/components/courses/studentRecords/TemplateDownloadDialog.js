import Button from "@mui/material/Button"
import { useState, useEffect, useContext } from "react";
import * as React from "react";
import Select from '@mui/material/Select';
import { CSVDownloader } from 'react-papaparse';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export default function TemplateDownloadDialog({ gradeStructure, open, handleClose }) {
    const [selection, setSelection] = useState('');
    const [fileName, setFileName] = useState("StudentListTemplate");
    const [menuItems, setMenuItems] = useState([]);
    const [csvData, setCsvData] = useState([
        {
            "Student ID": "",
            "Full Name": ""
        },
    ]);

    function handleChange(event) {
        let newSelection = event.target.value;
        let newData = [{}];
        let newFileName = "";
        if (newSelection.substring(0, 5) === "grade") {
            let gradeIndex = parseInt(newSelection.substring(5));
            newData[0]["Student ID"] = "";
            newData[0][`#${gradeIndex} ${gradeStructure[gradeIndex].title} (${gradeStructure[gradeIndex].point})`] = "";
            newFileName = `${gradeStructure[gradeIndex].title}ListTemplate`;
            console.log(gradeIndex);
        } else if (newSelection === "student") {
            newData[0] = {
                    "Student ID": "",
                    "Full Name": ""
            };
            newFileName = "StudentListTemplate";
        }

        setSelection(newSelection);
        setCsvData(newData);
        setFileName(newFileName);
    };

    useEffect(() => {
        createTitleList();
    }, [])

    function createTitleList() {
        let newtitleList = [];
        newtitleList.push({
            title: "Student List Template",
            value: "student",
        });

        gradeStructure.forEach((grade, id) => {
            newtitleList.push({
                title: `${grade.title} Template`,
                value: `grade${id}`,
            });
        });

        
        let newMenuItems = newtitleList.map((item, id) => {
            return <MenuItem key={id} value={item.value}>{item.title}</MenuItem>;
        });
        console.log(newMenuItems);
        
        setMenuItems(newMenuItems);
        setSelection("student");
    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Download Template</DialogTitle>
                <DialogContent
                    sx={{padding: 2, marginBottom: 4}}
                >
                    <FormControl sx={{marginTop: 2}} fullWidth>
                        <InputLabel id="select-template">Template</InputLabel>
                        <Select
                            labelId="select-template"
                            id="select-template"
                            value={selection}
                            label="Select Template"
                            onChange={handleChange}
                        >
                            { menuItems }
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button 
                        onClick={handleClose}
                        fullWidth
                        size="large"
                        sx={{margin: 3}}
                    >
                        Cancel
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{margin: 3}}
                    >
                        <CSVDownloader
                            data={csvData}
                            filename={fileName}
                        >
                            Download
                        </CSVDownloader>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
