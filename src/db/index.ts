export type TableType = Record<string, number>;
type DBType = Record<string, TableType>;
const dataBase: DBType = {};

export const updateDatabase = (identifier: string, reason: string) => {
    if (dataBase[identifier] !== undefined) {
        const record = dataBase[identifier];
        if (record[reason] !== undefined) {
            record[reason] = record[reason] + 1;
        } else {
            record[reason] = 1;
        }
    } else {
        dataBase[identifier] = {
            [reason]: 1,
        };
    }
}

export const getRecordFromDatabase = (identifier: string) => {
    if (dataBase[identifier] !== undefined) {
        return dataBase[identifier];
      }
}