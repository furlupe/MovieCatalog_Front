import { get } from "./requests.js";

$(document).ready(function () {
    var keyword = 'userprofilepage';

    var addable = ADDABLE_HTML[keyword];

    $(".content").load(addable);

    get("https://react-midterm.kreosoft.space/api/account/profile", localStorage.getItem("userToken"))
    .then(profile => {
        console.log(profile);
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");
    });
});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "catalogpage": "moviescatalog.html",
    "userprofilepage": "userprofile.html"
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContentKeyWord = (path) => {
    switch(true) {
        case !path.length:
        case /[1-9][0-9]*/.test(path): 
            return "catalogpage"; // страница каталога фильмов
    }
}
