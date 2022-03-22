import {action, makeObservable, observable} from "mobx";

export default class AuthenticationStore {
    constructor() { makeObservable(this) }
    
    @observable
    token: string = "";
    
    @action
    setToken(newToken: string): void {
        this.token = newToken;
    }
    
    @action
    resetToken(): void {
        this.token = "";
    }
}