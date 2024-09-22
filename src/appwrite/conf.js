import config  from "../config/config.js"
import { Client, Databases, ID, Storage ,Query } from "appwrite";


class DbAndStrgService {
    client = new Client();
    database;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async addPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // console.log("in class func slug : ", post);
            
            return await this.database.createDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                } // data
            );
        } catch (error) {
            console.log("appwrite service err :: addpost error :", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite service err :: updatepost error :", error);

        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug
            )
            return true;
        } catch (error) {
            console.log("appwrite service err :: deletepost error :", error);
            return false;
        }
    }

    async getPost(slug) {
        console.log("slug in get post :" , slug);
        
        try {
            return await this.database.getDocument(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug
            )
        
        } catch (error) {
            console.log("appwrite service err :: get post error :", error);
            return false;
        }
    }

    async getPostList(){
        try {
            return await this.database.listDocuments(
                config.appwriteDatabaseId, // databaseId
                config.appwriteCollectionId,
                [
                    Query.equal("status", "active")
                ] // queries (optional)
            );
        } catch (error) {
            console.log("appwrite service err :: get post list error :", error);
            return false
        }
    }

    async uploadFile(file){
        try {
             return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("appwrite service err ::  uplaod storage file error :", error);
            return false
        }
    }

    async deleteFile (fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("appwrite service err ::  delete storage file error :", error);
            return false
        }
    }
         filePreview (fileId){
                 return this.storage.getFilePreview(
                    config.appwriteBucketId,
                    fileId
                );
        }
}

const dbAndStrgServices = new DbAndStrgService();
export default dbAndStrgServices;