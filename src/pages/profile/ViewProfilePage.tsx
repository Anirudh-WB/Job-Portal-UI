import { useParams } from "react-router-dom";
import LayoutComponent from "../../components/LayoutComponent";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import PersonalInfoUtility from "../../utilities/profile/PersonalInfoUtility";
import ViewProfileUtility from "../../utilities/profile/ViewProfileUtility";
import AcademicInfoUtility from "../../utilities/profile/AcademicInfoUtility";

const ViewProfilePage = () => {
    const { id } = useParams();

    const idWithDefault = id ?? '0';

    //alert(idWithDefault);

    const { personalInfo } = PersonalInfoUtility(parseInt(idWithDefault));
    const { addressInfoDetail } = ViewProfileUtility(parseInt(idWithDefault));
    const { academicInfos } = AcademicInfoUtility(parseInt(idWithDefault));

    return (<>
        <LayoutComponent>
            <h2>View Profile</h2>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        Personal information
                    </Typography>
                    <Typography variant="body1" gutterBottom>

                        <strong>First Name:</strong>  {personalInfo.firstName} {personalInfo.lastName}
                        <strong> Email Address:</strong> {personalInfo.emailAddress}
                        <strong>  Mobile No.:</strong> {personalInfo.mobileNumber}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Address information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <strong>Add:</strong>  {addressInfoDetail.address}
                        <strong> City:</strong> {addressInfoDetail.cityName}
                        <strong>  State:</strong> {addressInfoDetail.stateName}
                        <strong>  Country:</strong> {addressInfoDetail.countryName}
                        <strong> Train Line :</strong> {addressInfoDetail.trainLineName}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        Academic Information
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        <table>
                            <tbody>
                                {academicInfos.map((row) => (
                                    <tr>
                                        <td>{row.institutionName}</td>
                                        <td>{row.startYear}</td>
                                        <td>{row.endYear}</td>
                                        <td>{row.percentage}</td>
                                        <td>{row.degree}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Typography>
                </CardContent>
            </Card>
        </LayoutComponent>
    </>);
}

export default ViewProfilePage;