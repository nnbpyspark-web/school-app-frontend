import { getBatches } from '../actions';
import BatchesClient from './BatchesClient';

export default async function Page() {
    const batches = await getBatches();
    return <BatchesClient batches={batches || []} />;
}
