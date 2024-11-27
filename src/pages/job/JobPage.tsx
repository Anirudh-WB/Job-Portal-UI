import { Box, Button, Card, CardActions, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField, Typography } from "@mui/material";
import LayoutComponent from "../../components/LayoutComponent";
import { EditorProvider, FloatingMenu, BubbleMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import "../../css/Richtexteditor.css"
import React, { useRef, useState } from "react";
import TabContext from '@mui/lab/TabContext';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import JobInfo from "./JobInfoPage";
import PreferredSkillPage from "./PreferredSkillPage";
import PreferredLocationPage from "./PreferredCityPage";
import JobPreviewPage from "./JobPreviewPage";
import JobInfoPage from "./JobInfoPage";
import { useParams } from "react-router-dom";

const JobPage: React.FC = () => {


    const { id } = useParams();
    //const idx  : number = +id ? parseInt(id, 10) : 0;
    const idx: number = id ? parseInt(id, 10) : 0;
 

    const [jobId, setJobId] = useState(idx);
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleJobIdChange = (newJobId: number) => {
        setJobId(newJobId);

        console.log({ newJobId });
    };
    return (
        <LayoutComponent>
            <h1>Job</h1>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Description" value="1" />
                                    <Tab label="Preferred Skills" value="2" />
                                    <Tab label="Preferred Location" value="3" />
                                    <Tab label="Preview" value="4" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                {/* <JobInfoPage parentJobId = {jobId} />
                                 */}
                                <JobInfoPage parentJobId={jobId} onUpdateJobId={handleJobIdChange} />
                            </TabPanel>
                            <TabPanel value="2">
                                <PreferredSkillPage parentJobId={jobId} />
                            </TabPanel>
                            <TabPanel value="3">

                                <PreferredLocationPage parentJobId={jobId} />
                            </TabPanel>
                            <TabPanel value="4">

                                <JobPreviewPage parentJobId={jobId} />
                            </TabPanel>
                        </TabContext>
                    </CardContent>
                </Card>

            </Box>



        </LayoutComponent>
    );
};

export default JobPage;
