import { Client, Account } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6796475f002fb48b06cf');

const account = new Account(client);

export { client, account };
