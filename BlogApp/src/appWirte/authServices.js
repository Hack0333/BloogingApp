import {Client , Account , ID} from 'appwrite'
import config from '../config/config'

export class AuthServicesClass {
    client = new Client();
    account;

    constructor (){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwirteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email,password, name}){
        try {
            const userAccount = new this.account.create(
                ID.unique(),
                email,
                password,
                name
            )

            if(userAccount){
                this.loginUser(email,password);
            }else{
                return userAccount;
            }
            
        } catch (error) {
            console.log("Appwrite :: Services :: createAccount :: Error ", error);
        }
    }

    async loginUser({email,password}){
        try{
            const loggedIn = await createEmailPasswordSession(email,password);
            return loggedIn;
        }catch(error){
            console.log("Appwrite :: Services :: loginUser :: Error ", error);
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("Appwrite :: Services :: getCurrentUser :: Error ", error);
        }
        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite :: Services :: Logout :: Error ", error);
        }
    }
}

const authServices = new AuthServicesClass();

export default authServices