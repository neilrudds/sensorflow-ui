import SubHeader from "../../components/ui/SubHeader";
import Grid from "./Grid"
import { useParams } from 'react-router-dom';

export default function Dashboard() {
    let { dashboardName } = useParams();

    return (
        <>
            <SubHeader title={ dashboardName } />
            <Grid />
        </>
    )
}