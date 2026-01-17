import { getBatches } from '../actions';
import AttendanceClient from './AttendanceClient';

export default async function Page() {
    const batches = await getBatches();
    return <AttendanceClient batches={batches || []} />;
}
