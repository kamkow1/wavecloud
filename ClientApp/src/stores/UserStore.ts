import {action, makeObservable, observable} from "mobx";
import UserModel from "../models/user.model";

export default class UserStore {
    constructor() { makeObservable(this) }
    
    @observable
    user: UserModel = {};
    
    @action
    setUser(user: UserModel): void {
        this.user = user;
    }
    
    @action
    resetUser(): void {
        this.user = {};
    }
}