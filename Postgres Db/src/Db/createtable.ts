import { getClient } from "./utils";

export async function createTable() {
    const client = await getClient();
    const createUserTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;
    await client.query(createUserTableQuery);
    console.log("Table created successfully!");
}
