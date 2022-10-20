function showMovieDetails(details) {
    $("#movie-poster").attr("src", details.poster);
    $("#movie-name").text(details.name);
    $("#movie-descr").text(details.description);
    $("#prod-year").text(details.year);
    $("#prod-country").text(details.country);
    $("#prod-genre").text(
        `${details.genres.map((item) => { return item.name }).join(", ")}`
    );
    $("#prod-length").text(`${details.time} мин.`);
    $("#prod-tagline").text(details.tagline);
    $("#prod-director").text(details.director)
    $("#prod-budget").text(formatMoney(details.budget));
    $("#prod-fees").text(formatMoney(details.fees));
    $("#prod-agelimit").text(`${details.ageLimit}+`);
}

function formatMoney(money, currency = "$") {
    money = money.toString();
    var head = `${currency}${
        money.slice(0, (money.length % 3 > 0) ? money.length % 3 : 3)
    }`;
    
    var body = ""
    for(var i = head.length - 1; i < money.length; i += 3) {
        body += ` ${money.slice(i, i + 3)}`;
    }
    return head + body;
}