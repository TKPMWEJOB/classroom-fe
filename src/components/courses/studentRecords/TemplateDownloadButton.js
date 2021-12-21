import Button from "@mui/material/Button"
import { useState, useContext } from "react";
import * as React from "react";

import TemplateDownloadDialog from './TemplateDownloadDialog'

export default function TemplateDownloadButton({ gradeStructure, tableData }) {
    const [open, setOpen] = React.useState(false);
  
    const handleCreateDialog = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
    };

    return (
        <div>
            <Button 
                onClick={handleCreateDialog} 
                variant="contained"
            >
                Download Template
            </Button>

            <TemplateDownloadDialog gradeStructure={gradeStructure} open={open} handleClose={handleCloseDialog} tableData={tableData} />
        </div>
    );
}