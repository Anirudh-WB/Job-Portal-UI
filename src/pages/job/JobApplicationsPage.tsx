import { useEffect } from "react";
import LayoutComponent from "../../components/LayoutComponent";
import JobApplicationUtility from "../../utilities/job/JobApplicationUtility";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import JobApplicationRequest from "../../model/job/JobApplicationRequest";
const JobApplicationsPage = () => {

    
    const { paramJobId } = useParams();
    const jobId = paramJobId ?? '0';
   
    useEffect(() => {

        //console.log(utility.jobApplications);
       // console.log(jobId);
    }, []);
   
    const jobApplicationRequest : JobApplicationRequest = {
        jobId : parseInt(jobId) 

    }
    const utility = JobApplicationUtility(jobApplicationRequest);

    return (<>
        <LayoutComponent>
            <h1>Job Application</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell component="th" scope="row">Job title</TableCell>
                            <TableCell component="th" scope="row">Company name</TableCell>
                            <TableCell component="th" scope="row">Firts Name</TableCell>
                            <TableCell component="th" scope="row">Last Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {utility.jobApplications.map((row) => (
                            <TableRow key={row.jobId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  >
                                <TableCell> {row.jobTitle}</TableCell>
                                <TableCell>{row.companyName}</TableCell>
                                <TableCell>{row.firstName}</TableCell>
                                <TableCell>{row.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutComponent>
    </>);
}

export default JobApplicationsPage;