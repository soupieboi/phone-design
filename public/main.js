function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

$(document).ready(() => {
    var downloadURL = $('#hidden-downloadurl').text();
    $('#hidden-download').attr('href', downloadURL);

    var num = $('#hidden-downloadcount').text();
    const obj = document.getElementById("download-counter-num");
    animateValue(obj, 0, num, 3000);

    $('.logo-plus-backtotop').on("click", function() {
        $('html').animate({ scrollTop: 0 }, 600);
    });
    $('.jq-downloadbutton').on("click", function() {
        var newNum = parseInt(num) + 1
        const obj = document.getElementById("download-counter-num");
        obj.textContent = newNum
        $('#hidden-download')[0].click();
    });
});