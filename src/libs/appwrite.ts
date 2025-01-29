import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT || '')
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID || '');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, ID };
