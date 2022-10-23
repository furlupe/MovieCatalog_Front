import { showMovieDetails } from "./moviedetails.js";
import { showReviews } from "./reviews.js";
import { get, post, del } from "./../requests.js";

export function showDetailsPage() {
    var id = localStorage.getItem("selectedMovieId");
    localStorage.setItem("userMadeReview", "0");

    get(`https://react-midterm.kreosoft.space/api/movies/details/${id}`)
    .then(details => {

        get("https://react-midterm.kreosoft.space/api/favorites")
        .then(json => {
            for (var movie of json.movies) {
                if (movie.id != localStorage.getItem("selectedMovieId")) {
                    continue;   
                }
                $("#add-to-favorites").addClass("d-none");
                $("#remove-from-favorites").removeClass("d-none");
                break;
            }
        })

        showMovieDetails(details);
        registerFavoritesEvents();

        get("https://react-midterm.kreosoft.space/api/account/profile")
        .then(profile => {
            localStorage.setItem("userId", profile.id);
        })
        .catch(e => {
            localStorage.setItem("userId", "");
            $(".user-review-form").addClass("d-none");
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        });

        showReviews(details.reviews);

        if(localStorage.getItem("userMadeReview") == "0" && localStorage.getItem("userId") != "") {
            $(".user-review-form").removeClass("d-none");
        }

        $(".save-review-button").click(() => {
            post(`https://react-midterm.kreosoft.space/api/movie/${localStorage.getItem("selectedMovieId")}/review/add`, {
                "reviewText": $(".user-review-form #reviewText").val(),
                "rating": parseInt($(".user-review-form #reviewRating").val()),
                "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
            })
            .then(() => location.reload());
        })
    })
    .catch(error => console.log(error));
}

function registerFavoritesEvents() {
    $("#add-to-favorites").click(() => {
        post(`https://react-midterm.kreosoft.space/api/favorites/${localStorage.getItem("selectedMovieId")}/add`)
        .then(() => {
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").removeClass("d-none");
        })
        .catch(e => console.log(e));
    });

    $("#remove-from-favorites").click(() => {
        del(`https://react-midterm.kreosoft.space/api/favorites/${localStorage.getItem("selectedMovieId")}/delete`)
        .then(() => {
            $("#add-to-favorites").removeClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        })
        .catch(e => console.log(e));
    });
}