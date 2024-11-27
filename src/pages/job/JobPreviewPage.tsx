import React from "react";
import JobReviewUtility from "../../utilities/job/JobReviewUtility";
import { Divider, Typography } from "@mui/material";

const JobPreviewPage: React.FC<{ parentJobId: number }> = ({ parentJobId }) => {
    const utility = JobReviewUtility(parentJobId);
    const cityNames = utility.jobCities.map(city => city.cityName);
    const skillNames = utility.jobSkills.map(skill => skill.skillName);
    //alert(JSON.stringify(utility))
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Job Title:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {utility.jobInfo.jobTitle}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Salary Range:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {utility.jobInfo.minimumSalary} - {utility.jobInfo.maximumSalary}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Train Line:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {utility.jobInfo.trainLineName}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Designation:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {utility.jobInfo.designationName}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Preferred City:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {cityNames.join(', ')}
                    </Typography>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '150px' }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>Preferred Skills:</strong>
                        </Typography>
                    </div>
                    <Typography variant="body1" gutterBottom>
                        {skillNames.join(', ')}
                    </Typography>
                </div>
                {/* <Typography variant="body1" gutterBottom>
                  
                    <strong> Description</strong>
                </Typography> */}
                <div dangerouslySetInnerHTML={{ __html: utility.jobInfo.jobDescription }} />
            </div>


        </>

    );
}

export default JobPreviewPage;