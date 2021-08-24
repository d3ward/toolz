    
    function navbar() {
        var t = this;
        t.n = document.querySelector("nav");
        t.bo = document.body.style.overflow;
        t.close = function () {
          t.bo = "auto";
          t.n.classList.remove("active");
        }
        t.open = function () {
          t.bo = "hidden";
          t.n.classList.add("active");
        }
        if (t.n) {
          document.querySelector("nav>button").addEventListener("click", function () {
            console.log("toggleNav");
            if (t.n.classList.contains("active"))
              t.close();
            else
              t.open();
          });
          document.querySelectorAll("nav ul > a").forEach(n => n.addEventListener("click", t.close()));
        }
      }
    function themeManager() {
      const t = this;
      t.toggles = document.getElementsByClassName("theme-toggle");
      t.activeTheme = "light";
      t.setTheme = (theme) => {
          t.activeTheme = theme;
          document.documentElement.setAttribute('data-theme', theme)
          localStorage.setItem('theme', theme);
      }
      t.dark = () => {
          t.setTheme("dark");
      }
      t.light = () => {
          t.setTheme("light");
      }
      if (window.CSS && CSS.supports("color", "var(--bg)") && t.toggles) {
          var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ?
              "dark" : "light");
          if (storedTheme)
              document.documentElement.setAttribute('data-theme', storedTheme)
          for (var i = 0; i < t.toggles.length; i++) {
              t.toggles[i].onclick = function () {
                  if (document.documentElement.getAttribute("data-theme") === "light") t.dark();
                  else t.light();
              };
          }
      }
  }

  function aos() {
      const t = this;
      t.items = document.querySelectorAll("[class*=_aos]");
      if (IntersectionObserver && t.items) {
          let callback = function (entries) {
              entries.forEach(entry => {
                  if (entry.isIntersecting && !entry.target.classList.contains('_aos-done')) {
                      entry.target.classList.add('_aos-done');
                  } else {
                      entry.target.classList.remove('_aos-done');
                  }
              });
          }
          let observer = new IntersectionObserver(callback, {
              root: null,
              threshold: 0
          });
          t.items.forEach((item) => {
              observer.observe(item);
          });
      }
  }

  function gotop() {
      var t = this;
      t.gt = document.getElementById('gt-link');
      t.scrollToTop = function () {
          window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth'
          });
      }
      t.listeners = function () {
          window.addEventListener("scroll", () => {
              let y = window.scrollY;
              if (y > 0) {
                  t.gt.classList.remove("hidden");
              } else {
                  t.gt.classList.add("hidden");
              }
          });
          t.gt.onclick = function (e) {
              e.preventDefault();
              if (document.documentElement.scrollTop || document.body.scrollTop > 0) {
                  t.scrollToTop();
              }
          }
      }
      if (t.gt) {
          t.listeners();
      }
  }
  function modal(id) {
    var t = this;
    t.m = document.querySelector((id) ? id : '.modal');
    if (t.m) {
        t.bdy = document.body.classList;
        t.targets = document.querySelectorAll('[data-toggle="' + t.m.id + '"]');
        t.closebtns = t.m.querySelectorAll('.close-modal');
    }
    t.show = function () {
        t.bdy.add('_overflowhidden');
        t.m.classList.add('_show-modal');
    }
    t.hide = function () {
        t.m.classList.remove('_show-modal');
        t.bdy.remove('_overflowhidden');
    }
    t.listeners = function () {
        t.targets.forEach(el => {
            el.addEventListener('click', function (e) {
                t.show();
            });
        });
        t.closebtns.forEach(function (item) {
            item.addEventListener('click', function (e) {
                t.hide();
            });
        });
    }
    if (t.m)
        t.listeners();
}


 
