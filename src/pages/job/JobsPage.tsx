import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import LayoutComponent from "../../components/LayoutComponent";
import JobListUtility from "../../utilities/job/JobListUtility";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom";
const JobsPage: React.FC = () => {
    const utility = JobListUtility();
    return (
        <LayoutComponent>
            <h1>JobListPage</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {utility.jobs.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.jobTitle}
                                </TableCell>
                                <TableCell>{row.designationName}</TableCell>
                                <TableCell align="right">{row.trainLineName}</TableCell>
                                <TableCell align="right">{row.minimumSalary}</TableCell>
                                <TableCell align="right">{row.maximumSalary}</TableCell>

                                <TableCell align="right">{row.locationCount}</TableCell>
                                <TableCell align="right">{row.skillCount}</TableCell>
                                <TableCell align="right">
                                    <Link to={`/job-applications/${row.id}`}>
                                        {row.applicationCount}

                                    </Link>

                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" color="primary" onClick={() => utility.editJob(row.id)}>
                                        <ModeEditIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </LayoutComponent>
    );
};

export default JobsPage;
