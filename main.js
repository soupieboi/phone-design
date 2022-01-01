$(document).ready(() => {
    $('.logo-plus-backtotop').on("click", function() {
        $('html').animate({ scrollTop: 0 }, 600);
    });
    $('#download-app').on("click", function() {
        window.location.href = "https://github.com/SpiritLetsPlays/VALTracker_src/releases/latest";
    });
})