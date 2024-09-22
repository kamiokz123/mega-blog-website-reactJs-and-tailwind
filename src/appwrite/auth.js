import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";


class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) 
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAcount({email,password,name}) {
        try {
            const user = await this.account.create(
                ID.unique(), 
                email, 
                password,
                name
            );
            if (user) {
               return this.login({email,password});
            } else {
                return user
            }
        } catch (error) {
            throw error
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(
                email, 
                password
            );
            
        } catch (error) {
            throw error
        }
    }

    async getUserAccount (){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("apprite get acount err : ",error);
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("apprite logout acount err : ",error);
        }
    }
}

const authServices = new AuthService();

export default authServices;
