import logger from "../util/logger";
import { getRecordFromDatabase, TableType } from "../db";



const getStatus = async (identifier: string) => {
    try {
        // Access local database and fetch the record for the identifer
        const data: TableType = getRecordFromDatabase(identifier);
        return { status: 200, data };
    } catch (err) {
        logger.error(`An internal error ocurred ${err}`);
        return { status: 500 }
    }
};

export default getStatus;