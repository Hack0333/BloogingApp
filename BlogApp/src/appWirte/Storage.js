import { Client , ID , Databases, Query } from "appwrite";
import config from "../config/config";

export class StorageServices{
    client = new Client();
    databases;
    bucket;
    constructor (){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwirteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title,content,slug,featuredImage,status,userId}){
        try {
            await this.databases.createDocument(
                config.appwirteDatabaseId,
                config.appwirteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite :: Services :: createPost :: Error ", error);
        }
    }

    async updatePost(slug ,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwirteDatabaseId,
                config.appwirteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite :: Services :: updatePost :: Error ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwirteDatabaseId,
                config.appwirteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: Services :: deletePost :: Error ", error);
            return false;
        }
    }

    async getSinglePost(slug){
        try {
            return await this.databases.getDocument(
                config.appwirteDatabaseId,
                config.appwirteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite :: Services :: getSinglePost :: Error ", error);
        }
    }

    async getAllPost(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwirteDatabaseId,
                config.appwirteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite :: Services :: getAllPost :: Error ", error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwirteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite :: Services :: uploadFile :: Error ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwirteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite :: Services :: deleteFile :: Error ", error);
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                config.appwirteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite :: Services :: getFilePreview :: Error ", error);
        }
    }
}

const database = new StorageServices();

export default database;