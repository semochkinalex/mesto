export default class UserInfo {
    constructor (titleSelector, jobSelector) {
        this._userName = document.querySelector(titleSelector);
        this._userJob = document.querySelector(jobSelector);
    }
    getUserInfo () {
        return {
            userName: this._userName.textContent, 
            userJob: this._userJob.textContent,
        }
    }
    setUserInfo ({userInput, jobInput}) {
        this._userName.textContent = userInput;
        this._userJob.textContent = jobInput
    }
}