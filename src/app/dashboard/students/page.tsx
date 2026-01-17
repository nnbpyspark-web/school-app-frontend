import { getStudents, getBatches } from '../actions';
import StudentsClient from './StudentsClient';

export default async function Page() {
    const students = await getStudents();
    const batches = await getBatches();
    return <StudentsClient initialStudents={students || []} batches={batches || []} />;
}
