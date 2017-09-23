'use strict';

import Block from './components/Block/BlockComponents';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import CreateHeader from './views/Header/Header';
import CreateUnRegMenu from './views/UnRegMenu/UnRegMenu';
import UserService from './services/UserService';
import CreateRegMenu from './views/RegMenu/RegMenu';
import CreateAboutUs from './views/AboutUs/AboutUs';
import Scoreboard from './views/Scoreboard/Scoreboard';
import CreateFooter from './views/Footer/Footer';


let body = document.getElementsByTagName('body')[0];
const app = new Block('div', {id: 'application'});
body.appendChild(app.getElement());

let footerDiv = new Block('div', {id: 'multimedia-buttons-panel'});

const userService = new UserService();
const header = CreateHeader();
const inputMenu = CreateUnRegMenu();
const signIn = SignIn();
const signUp = SignUp();
const aboutUs = CreateAboutUs();
const score = Scoreboard();
const footerImg = CreateFooter();
const mainPage = CreateRegMenu();

footerDiv.append(score.getTable())
    .append(aboutUs.getTable());

app.append(header.getHeader())
    .append(inputMenu.getMenu())
    .append(mainPage.getMenu())
    .append(signIn.getForm())
    .append(signUp.getForm())
    .append(footerImg.getFooter())
    .append(footerDiv.getElement());


inputMenu.hide();
signIn.hide();
signUp.hide();
mainPage.hide();
score.hide();
aboutUs.hide();

let inputMenuEventDelete = function () {
};
let footerImgEventDelete = function () {
};
let footerDivEventDelete = function () {
};
let mainPageEventDelete = function () {
};

function isUnregisteredUser() {

    inputMenuEventDelete();
    footerImgEventDelete();
    footerDivEventDelete();
    mainPageEventDelete();

    inputMenu.show();

    inputMenuEventDelete = inputMenu.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'button-log':
                footerImg.hide();
                inputMenu.hide();
                signIn.show();
                break;

            case 'button-register':
                footerImg.hide();
                inputMenu.hide();
                signUp.show();
                break;
        }
    });

    let backButtonCollection = signIn.getBackButton();
    const backButtonArray = Array.from(backButtonCollection);

    backButtonArray.forEach(button => {
        button.addEventListener('click', (event) => {
            const elemId = event.target.getAttribute('id');
            switch (elemId) {
                case 'back-sign-in':
                    signIn.hide();
                    inputMenu.show();
                    footerImg.show();
                    break;

                case 'back-sign-up':
                    signUp.hide();
                    inputMenu.show();
                    footerImg.show();
                    break;
            }
        });
    });


    footerImgEventDelete = footerImg.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'sound-logo':
                console.log('music');
                break;

            case 'score-logo':
                footerImg.hide();
                inputMenu.hide();
                mainPage.hide();
                score.show();
                break;

            case 'about-logo':
                footerImg.hide();
                inputMenu.hide();
                mainPage.hide();
                aboutUs.show();
                break;
        }
    });


    footerDivEventDelete = footerDiv.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'back-score':
                footerImg.show();
                inputMenu.show();
                score.hide();
                break;

            case 'back-about':
                footerImg.show();
                inputMenu.show();
                aboutUs.hide();
                break
        }
    });
}

function isRegisteredUser() {

    inputMenuEventDelete();
    footerImgEventDelete();
    footerDivEventDelete();
    mainPageEventDelete();

    inputMenu.hide();
    signIn.hide();
    signUp.hide();
    mainPage.show();
    footerImg.show();

    mainPageEventDelete = mainPage.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'start-game':
                console.log('i am start');
                break;

            case 'logout':
                mainPage.hide();
                userService.exit();
                isUnregisteredUser();
                break;
        }
    });

    footerImgEventDelete = footerImg.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'sound-logo':
                console.log('music');
                break;

            case 'score-logo':
                footerImg.hide();
                inputMenu.hide();
                mainPage.hide();
                score.show();
                break;

            case 'about-logo':
                footerImg.hide();
                inputMenu.hide();
                mainPage.hide();
                aboutUs.show();
                break;
        }
    });

    footerDivEventDelete = footerDiv.on('click', function (event) {
        event.preventDefault();
        const elemId = event.target.getAttribute('id');

        switch (elemId) {
            case 'back-score':
                footerImg.show();
                mainPage.show();
                score.hide();
                break;

            case 'back-about':
                footerImg.show();
                mainPage.show();
                aboutUs.hide();
                break
        }
    });
}


userService.isAuthUser(function (err, userLogin) {
    if (err) {
        return;
    }
    if (!userLogin) {
        console.log('Hello ', userLogin, 'is null');
        isUnregisteredUser();
    } else {
        isRegisteredUser(userLogin);
    }
}, true);


signIn.onSubmitSignInForm(function (formdata, isValid) {
    if (isValid) {
        userService.login(formdata.login, formdata.password, function (err, resp) {
            if (err) {
                alert(`Some error ${err.status}: ${err.responseText}`);
                return;
            }
            if (resp.success === 'yes') {
                signIn.reset();
                isRegisteredUser(resp.user);
            } else {
                console.log('no user');
            }

        });
    }
});


signUp.onSubmitSignUpForm(function (formdata, isValid) {
    if (isValid) {
        userService.auth(formdata.login, formdata.email, formdata.password, (err, resp) => {
            if (err) {
                return alert(`AUTH Error: ${err.status}`);
            }

            if (resp.response === 200) {
                isRegisteredUser();
                signUp.reset();
            }
        });
    }
});

