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
    localStorage.setItem('firstTimeDownload', true);
    $.ajax({
        url: `https://api.countapi.xyz/info/valtracker.gg/download`,
        type: 'get',
        success: function(data, jqXHR) {
            var num = data.value
            const obj = document.getElementById("download-counter-num");
            animateValue(obj, 0, num, 3000);
        }
    });
    $('.logo-plus-backtotop').on("click", function() {
        $('html').animate({ scrollTop: 0 }, 600);
    });
    $('.jq-downloadbutton').on("click", function(e) {
        e.preventDefault();
        if(localStorage.getItem('firstTimeDownload') == true) {
            $.ajax({
                url: `https://api.countapi.xyz/hit/valtracker.gg/download`,
                type: 'get',
                success: function(data, jqXHR) {
                    var num = data.value
                    const obj = document.getElementById("download-counter-num");
                    obj.textContent = num
                    animateValue(obj, obj.textContent, num, 3000);
                    localStorage.setItem('firstTimeDownload', false);
                }
            });
        } else {
            $('#hidden-download')[0].click();
        }
    });
});