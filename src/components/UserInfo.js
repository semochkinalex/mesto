export default class UserInfo {
    constructor (titleSelector, jobSelector, avatarSelector) {
        this._userName = document.querySelector(titleSelector);
        this._userJob = document.querySelector(jobSelector);
        this._userAvatar = document.querySelector(avatarSelector);
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
    setUserAvatar (avatarInput) {
        this._userAvatar.src = avatarInput;
    }
    getUserAvatar () {
        return {
            userAvatar: this._userAvatar.src,
        }
    }
}