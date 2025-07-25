import { Client, Account } from "appwrite"

export const client = new Client();

client.setEndpoint("https://fra.cloud.appwrite.io/v1").setProject("6876a8f9001f4dd7353c")

export const account = new Account(client);
export { ID } from "appwrite"