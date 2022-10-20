$(document).ready(function () {
    var path = (new URL(window.location.href)).pathname;
    path = path.slice(1, path.length);

    var keyword = getContentKeyWord(path);

    switch(keyword) {
        case "catalogpage":
            localStorage.setItem("currentMoviesListPage", path ? path : 1);
            break;
    }

    var addable = ADDABLE_HTML[keyword];

    $('body').append(addable.body);
    $.get(addable.content, function(data) {
        $(".content").replaceWith(data);
    });

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
    "catalogpage": {
        "body": "<script src='./scripts/moviescatalog/moviescatalog.js'></script>",
        "content": "moviescatalog.html"
    }
};

// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
var getContentKeyWord = (path) => {
    switch(true) {
        case !path.length:
        case /[1-9][0-9]*/.test(path): 
            return "catalogpage"; // страница каталога фильмов
    }
}