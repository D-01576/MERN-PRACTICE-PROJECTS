import { Client } from 'pg';

export async function getClient() {
    const client = new Client("postgresql://chatbase_owner:59cGzApvIsol@ep-rough-rain-a5hmztxx.us-east-2.aws.neon.tech/chatbase?sslmode=require");
    await client.connect();
    return client;
}