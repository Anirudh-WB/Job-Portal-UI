import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import LayoutComponent from "../../components/LayoutComponent";
import JobListUtility from "../../utilities/job/JobListUtility";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TestTable } from "../../model/job/TestTable";
const TestTablePage: React.FC = () => {

    const jsonData: TestTable[] = [
        { "emailAddress": "anzar@yahoo.com", "orderTotal": 500, "orderDate": new Date("01/01/2024") },
        { "emailAddress": "sam@yahoo.com", "orderTotal": 100, "orderDate": new Date("02/02/2024") },
        { "emailAddress": "sahil@yahoo.com", "orderTotal": 100, "orderDate": new Date("03/03/2024") },
        { "emailAddress": "test@yahoo.com", "orderTotal": 200, "orderDate": new Date("04/04/2024") }

    ]

    interface MonthNames {
        monthNumber: number;
        monthName: string;
    }

    const monthNames: MonthNames[] = [
        { monthNumber: 1, monthName: "Jan" },
        { monthNumber: 2, monthName: "Feb" },
        { monthNumber: 3, monthName: "Mar" },
        { monthNumber: 4, monthName: "Apr" },
        { monthNumber: 5, monthName: "May" },
        { monthNumber: 6, monthName: "Jun" },
        { monthNumber: 7, monthName: "Jul" },
        { monthNumber: 8, monthName: "Aug" },
        { monthNumber: 9, monthName: "Sep" },
        { monthNumber: 10, monthName: "Oct" },
        { monthNumber: 11, monthName: "Nov" },
        { monthNumber: 12, monthName: "Dec" }
    ];


    const getOrderData = (emailAddress:string, monthNumber:number)=>{
            const filterData = jsonData.filter(data=>data.emailAddress ==emailAddress && data.orderDate.getMonth()==monthNumber);

           

            const totalOrder = filterData.reduce((total, data) => total + data.orderTotal, 0);

            return totalOrder;
    }


    return (
        <LayoutComponent>
            <h1>Test</h1>

            <table style={{ width: "100%" }}>
                <thead>
                    <tr>
                        {monthNames.map((month, index) => (
                            <th key={index}>{month.monthName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {jsonData.map((rowData, index) => (
                        <tr>
                            {monthNames.map((colData, index) => (
                                <td>{
                                    getOrderData(rowData.emailAddress,index)
                                    
                                    }</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </LayoutComponent>
    );
};

export default TestTablePage;
