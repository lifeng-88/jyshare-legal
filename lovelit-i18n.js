(function () {
    var KEY = "lovelit.lang";

    function currentLang() {
        var query = new URLSearchParams(location.search).get("lang");
        if (query === "zh" || query === "en") return query;
        return localStorage.getItem(KEY) || "en";
    }

    function apply(lang) {
        localStorage.setItem(KEY, lang);
        document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
        document.documentElement.setAttribute("data-lang", lang);
        document.querySelectorAll("[data-set-lang]").forEach(function (button) {
            button.classList.toggle("active", button.getAttribute("data-set-lang") === lang);
        });
        document.querySelectorAll("a[href]").forEach(function (link) {
            var href = link.getAttribute("href") || "";
            if (href.indexOf(".html") === -1) return;
            var file = href.split("?")[0];
            link.setAttribute("href", file + "?lang=" + lang);
        });
        var title = document.body.getAttribute(lang === "zh" ? "data-title-zh" : "data-title-en");
        if (title) document.title = title;
    }

    document.addEventListener("click", function (event) {
        var button = event.target.closest("[data-set-lang]");
        if (button) apply(button.getAttribute("data-set-lang"));
    });

    apply(currentLang());
})();
