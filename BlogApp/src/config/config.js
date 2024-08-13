const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwirteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwirteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwirteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID ),
    appwirteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)

}

export default config;