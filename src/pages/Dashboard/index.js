import SubHeader from "../../components/ui/SubHeader";
import Grid from "./Grid"
import { useParams } from 'react-router-dom';


export default function Dashboard() {
    let { dashboardId } = useParams();

    return (
        <>
            <SubHeader title={ dashboardId } />
            <Grid dashboardId={ dashboardId } />
        </>
    )
}