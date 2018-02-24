/*
Написать приложение для работы с REST сервисом http://fecore.net.ua/rest/,
реализовать следующий функционал:
- функция getUsers должна получать текущий список всех пользователей в БД.
- функция addUser должна записывать в БД юзера с полями name и score.
- функция removeUser должна удалять из БД юзера по id.
- функция updateUser должна обновлять данные пользователя по id.
*/

const getBtn = document.querySelector("#js-get");
const addBtn = document.querySelector("#js-add");
const removeBtn = document.querySelector("#js-remove");
const updateBtn = document.querySelector("#js-update");

const userIDtoRemove = document.querySelector("input[name = 'userID']");
const userNameToAdd = document.querySelector("input[name = 'addName']");
const userScoreToAdd = document.querySelector("input[name = 'addScore']");

const userIDtoUpdate = document.querySelector("input[name = 'updateID']");
const userNameToUpdate = document.querySelector("input[name = 'updateName']");
const userScoreToUpdate = document.querySelector("input[name = 'updateScore']");

const result = document.querySelector("#js-result");
const htmlTpl = document.querySelector("#table-row").textContent.trim();
const compiled = _.template(htmlTpl);
const apiUrl = "http://fecore.net.ua/rest/";
let userData = {};


const updateView = dataObjects => {
    let htmlString = "";

    dataObjects.forEach(dataObjects => {
        htmlString += compiled(dataObjects);
    });

    result.innerHTML = htmlString;
};

function getUsers(evt) {
    evt.preventDefault();
    fetch(apiUrl)
        .then(response => {
            if (response.ok) return response.json();
            throw new Error("Error fetching data");
        })
        .then(data => {
            updateView(data);
            userData = data;
        })
        .catch(err => {
            result.textContent = `Error happens when get users! ${err}`;
        });
}

function removeUser(evt) {
    evt.preventDefault();
    fetch(`${apiUrl}?action=3&id=${userIDtoRemove.value}`)
        .then(response => {
            if (response.ok) return console.log("Remove user OK");
            throw new Error("Error fetching data");
        })
        .catch(err => {
            result.textContent = `Error happens when remove user! ${err}`;
        });
}

function addUser(evt){
    evt.preventDefault();
    fetch(`${apiUrl}?action=1&name=${userNameToAdd.value}&score=${userScoreToAdd.value}`)
        .then(response => {
            if (response.ok) return console.log("Add user OK");
            throw new Error("Error fetching data");
        })
        .catch(err => {
            result.textContent = `Error happens when remove user! ${err}`;
        });
}

function updateUser(evt) {
    evt.preventDefault();
    fetch(`${apiUrl}?action=2&id=${userIDtoUpdate.value}&name=${userNameToUpdate.value}&score=${userScoreToUpdate.value}`)
        .then(response => {
            if (response.ok) return console.log("Update user OK");
            throw new Error("Error fetching data");
        })
        .catch(err => {
            result.textContent = `Error happens when remove user! ${err}`;
        });
}

getBtn.addEventListener("click", getUsers);
addBtn.addEventListener("click", addUser);
removeBtn.addEventListener("click", removeUser);
updateBtn.addEventListener("click", updateUser);