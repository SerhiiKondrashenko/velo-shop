import handleCSVFile from "../services/handleCSVFile";

export default async (event) => {
    for (const record of event.Records) {
        await handleCSVFile(record.s3.object.key);
    }
}

