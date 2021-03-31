"use strict";

$(document).ready(function () {

    $(".nav-toggler").click(() => $(".header-nav").toggleClass("active"));
    $(".header-nav .nav-item").click(() => $(".header-nav").toggleClass("active"));

    //Project sorting

    $(".portfolio-nav .nav-item").click(function () {
        $(".portfolio-item").addClass("hide");
        $(".portfolio-nav .nav-item").removeClass("active");
        $(this).addClass("active");
        let data = $(this).data("project");
        setTimeout(() => {
            if (data == "all") {
                $(".portfolio-item").removeClass("hide");
                return false;
            }
            $(".portfolio-item").each(function () {
                if ($(this).data("project") == data) {
                    $(this).removeClass("hide");
                }
            });
        }, 4);
    });

    //Scroll Reveal

    (() => {
        let sr = new ScrollReveal();

        sr.reveal(".animation-left", {
            distance: "25rem",
            origin: "left",
            duration: 1000,
            delay: 600
        });

        sr.reveal(".animation-right", {
            distance: "25rem",
            origin: "right",
            duration: 1000,
            delay: 600
        });

        sr.reveal(".animation-bottom", {
            distance: "25rem",
            origin: "bottom",
            duration: 1000,
            delay: 600
        });
    })();

});