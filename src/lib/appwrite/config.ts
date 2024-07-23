import { Client,Account,Databases,Storage,Avatars } from 'appwrite';

export const appwriteConfig = { 
  projectId:import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url:import.meta.env.VITE_APPWRITE_URL,
};

export const client = new Client();

//57.45
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);


export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

// export const client = new Client().setEndpoint('https://[HOSTNAME_OR_IP]/v1').setProject('5f6d8b3c5f6d8b3c5f6d8b3c');
// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);export const avatars = new Avatars(client);
// export const databaseId = '648b4d8b4d8b4d8b4d8b4d8b';
// export const collectionId = '648b4d8b4d8b4d8b4d8b4d8b';
// export const bucketId = '648b4d8b4d8b4d8b4d8b4d8b';
// export const avatarBucketId = '648b4d8b4d8b4d8b4d8b4d8b';