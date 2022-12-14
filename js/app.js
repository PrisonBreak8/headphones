(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        r = t.dataset.da.trim().split(","),
        o = {};
      (o.element = t),
        (o.parent = t.parentNode),
        (o.destination = document.querySelector(r[0].trim())),
        (o.breakpoint = r[1] ? r[1].trim() : "767"),
        (o.place = r[2] ? r[2].trim() : "last"),
        (o.index = this.indexInParent(o.parent, o.element)),
        this.оbjects.push(o);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, r) {
          return Array.prototype.indexOf.call(r, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const r = this.mediaQueries[t],
        o = String.prototype.split.call(r, ","),
        s = window.matchMedia(o[0]),
        a = o[1],
        n = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === a;
        });
      s.addListener(function () {
        e.mediaHandler(s, n);
      }),
        this.mediaHandler(s, n);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const r = t[e];
          (r.index = this.indexInParent(r.parent, r.element)),
            this.moveTo(r.place, r.element, r.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const r = t[e];
          r.element.classList.contains(this.daClassname) &&
            this.moveBack(r.parent, r.element, r.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, r) {
      t.classList.add(this.daClassname),
        "last" === e || e >= r.children.length
          ? r.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? r.children[e].insertAdjacentElement("beforebegin", t)
          : r.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, r) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[r]
          ? e.children[r].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const r = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(r, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  class t {
    constructor(e, t = null) {
      if (
        ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
        this.config.init)
      ) {
        const e = document.querySelectorAll("[data-prlx-mouse]");
        e.length
          ? (this.paralaxMouseInit(e),
            this.setLogging(`Проснулся, слежу за объектами: (${e.length})`))
          : this.setLogging("Нет ни одного объекта. Сплю...zzZZZzZZz...");
      }
    }
    paralaxMouseInit(e) {
      e.forEach((e) => {
        const t = e.closest("[data-prlx-mouse-wrapper]"),
          r = e.dataset.prlxCx ? +e.dataset.prlxCx : 100,
          o = e.dataset.prlxCy ? +e.dataset.prlxCy : 100,
          s = e.hasAttribute("data-prlx-dxr") ? -1 : 1,
          a = e.hasAttribute("data-prlx-dyr") ? -1 : 1,
          n = e.dataset.prlxA ? +e.dataset.prlxA : 50;
        let l = 0,
          i = 0,
          c = 0,
          d = 0;
        function h(t = window) {
          t.addEventListener("mousemove", function (t) {
            const r = e.getBoundingClientRect().top + window.scrollY;
            if (r >= window.scrollY || r + e.offsetHeight >= window.scrollY) {
              const e = window.innerWidth,
                r = window.innerHeight,
                o = t.clientX - e / 2,
                s = t.clientY - r / 2;
              (c = (o / e) * 100), (d = (s / r) * 100);
            }
          });
        }
        !(function t() {
          (l += ((c - l) * n) / 1e3),
            (i += ((d - i) * n) / 1e3),
            (e.style.cssText = `transform: translate3D(${(s * l) / (r / 10)}%,${
              (a * i) / (o / 10)
            }%,0);`),
            requestAnimationFrame(t);
        })(),
          t ? h(t) : h();
      });
    }
    setLogging(e) {
      this.config.logging && l(`[PRLX Mouse]: ${e}`);
    }
  }
  let r = (e, t = 500, r = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = r ? `${r}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !r),
            !r && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !r && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    o = (e, t = 500, r = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          r && e.style.removeProperty("height");
        let o = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = r ? `${r}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = o + "px"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          window.setTimeout(() => {
            e.style.removeProperty("height"),
              e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t);
      }
    },
    s = !0,
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let r = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < r.length; e++) {
            r[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    },
    n = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let r = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < r.length; e++) {
          r[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    };
  function l(e) {
    setTimeout(() => {
      window.FLS && console.log(e);
    }, 0);
  }
  function i(e) {
    return e.filter(function (e, t, r) {
      return r.indexOf(e) === t;
    });
  }
  function c(e, t) {
    const r = Array.from(e).filter(function (e, r, o) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (r.length) {
      const e = [];
      r.forEach((r) => {
        const o = {},
          s = r.dataset[t].split(",");
        (o.value = s[0]),
          (o.type = s[1] ? s[1].trim() : "max"),
          (o.item = r),
          e.push(o);
      });
      let o = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      o = i(o);
      const s = [];
      if (o.length)
        return (
          o.forEach((t) => {
            const r = t.split(","),
              o = r[1],
              a = r[2],
              n = window.matchMedia(r[0]),
              l = e.filter(function (e) {
                if (e.value === o && e.type === a) return !0;
              });
            s.push({ itemsArray: l, matchMedia: n });
          }),
          s
        );
    }
  }
  let d = (e, t = !1, r = 500, o = 0) => {
    const s = document.querySelector(e);
    if (s) {
      let n = "",
        i = 0;
      t &&
        ((n = "header.header"), (i = document.querySelector(n).offsetHeight));
      let c = {
        speedAsDuration: !0,
        speed: r,
        header: n,
        offset: o,
        easing: "easeOutQuad",
      };
      if (
        (document.documentElement.classList.contains("menu-open") &&
          (a(), document.documentElement.classList.remove("menu-open")),
        "undefined" != typeof SmoothScroll)
      )
        new SmoothScroll().animateScroll(s, "", c);
      else {
        let e = s.getBoundingClientRect().top + scrollY;
        window.scrollTo({ top: i ? e - i : e, behavior: "smooth" });
      }
      l(`[gotoBlock]: Юхуу...едем к ${e}`);
    } else l(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
  };
  const h = { inputMaskModule: null, selectModule: null };
  let m = {
    getErrors(e) {
      let t = 0,
        r = e.querySelectorAll("*[data-required]");
      return (
        r.length &&
          r.forEach((e) => {
            (null === e.offsetParent && "SELECT" !== e.tagName) ||
              e.disabled ||
              (t += this.validateInput(e));
          }),
        t
      );
    },
    validateInput(e) {
      let t = 0;
      return (
        "email" === e.dataset.required
          ? ((e.value = e.value.replace(" ", "")),
            this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
          : ("checkbox" !== e.type || e.checked) && e.value
          ? this.removeError(e)
          : (this.addError(e), t++),
        t
      );
    },
    addError(e) {
      e.classList.add("_form-error"),
        e.parentElement.classList.add("_form-error");
      let t = e.parentElement.querySelector(".form__error");
      t && e.parentElement.removeChild(t),
        e.dataset.error &&
          e.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="form__error">${e.dataset.error}</div>`
          );
    },
    removeError(e) {
      e.classList.remove("_form-error"),
        e.parentElement.classList.remove("_form-error"),
        e.parentElement.querySelector(".form__error") &&
          e.parentElement.removeChild(
            e.parentElement.querySelector(".form__error")
          );
    },
    formClean(e) {
      e.reset(),
        setTimeout(() => {
          let t = e.querySelectorAll("input,textarea");
          for (let e = 0; e < t.length; e++) {
            const r = t[e];
            r.parentElement.classList.remove("_form-focus"),
              r.classList.remove("_form-focus"),
              m.removeError(r),
              (r.value = r.dataset.placeholder);
          }
          let r = e.querySelectorAll(".checkbox__input");
          if (r.length > 0)
            for (let e = 0; e < r.length; e++) {
              r[e].checked = !1;
            }
          if (h.selectModule) {
            let t = e.querySelectorAll(".select");
            if (t.length)
              for (let e = 0; e < t.length; e++) {
                const r = t[e].querySelector("select");
                h.selectModule.selectBuild(r);
              }
          }
        }, 0);
    },
    emailTest: (e) =>
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
  };
  class u {
    constructor(e) {
      (this.config = Object.assign({ logging: !0 }, e)),
        this.observer,
        !document.documentElement.classList.contains("watcher") &&
          this.scrollWatcherRun();
    }
    scrollWatcherUpdate() {
      this.scrollWatcherRun();
    }
    scrollWatcherRun() {
      document.documentElement.classList.add("watcher"),
        this.scrollWatcherConstructor(
          document.querySelectorAll("[data-watch]")
        );
    }
    scrollWatcherConstructor(e) {
      if (e.length) {
        this.scrollWatcherLogging(
          `Проснулся, слежу за объектами (${e.length})...`
        ),
          i(
            Array.from(e).map(function (e) {
              return `${
                e.dataset.watchRoot ? e.dataset.watchRoot : null
              }|${e.dataset.watchMargin ? e.dataset.watchMargin : "0px"}|${e.dataset.watchThreshold ? e.dataset.watchThreshold : 0}`;
            })
          ).forEach((t) => {
            let r = t.split("|"),
              o = { root: r[0], margin: r[1], threshold: r[2] },
              s = Array.from(e).filter(function (e) {
                let t = e.dataset.watchRoot ? e.dataset.watchRoot : null,
                  r = e.dataset.watchMargin ? e.dataset.watchMargin : "0px",
                  s = e.dataset.watchThreshold ? e.dataset.watchThreshold : 0;
                if (
                  String(t) === o.root &&
                  String(r) === o.margin &&
                  String(s) === o.threshold
                )
                  return e;
              }),
              a = this.getScrollWatcherConfig(o);
            this.scrollWatcherInit(s, a);
          });
      } else
        this.scrollWatcherLogging("Сплю, нет объектов для слежения. ZzzZZzz");
    }
    getScrollWatcherConfig(e) {
      let t = {};
      if (
        (document.querySelector(e.root)
          ? (t.root = document.querySelector(e.root))
          : "null" !== e.root &&
            this.scrollWatcherLogging(
              `Эмм... родительского объекта ${e.root} нет на странице`
            ),
        (t.rootMargin = e.margin),
        !(e.margin.indexOf("px") < 0 && e.margin.indexOf("%") < 0))
      ) {
        if ("prx" === e.threshold) {
          e.threshold = [];
          for (let t = 0; t <= 1; t += 0.005) e.threshold.push(t);
        } else e.threshold = e.threshold.split(",");
        return (t.threshold = e.threshold), t;
      }
      this.scrollWatcherLogging(
        "Ой ой, настройку data-watch-margin нужно задавать в PX или %"
      );
    }
    scrollWatcherCreate(e) {
      this.observer = new IntersectionObserver((e, t) => {
        e.forEach((e) => {
          this.scrollWatcherCallback(e, t);
        });
      }, e);
    }
    scrollWatcherInit(e, t) {
      this.scrollWatcherCreate(t), e.forEach((e) => this.observer.observe(e));
    }
    scrollWatcherIntersecting(e, t) {
      e.isIntersecting
        ? (!t.classList.contains("_watcher-view") &&
            t.classList.add("_watcher-view"),
          this.scrollWatcherLogging(
            `Я вижу ${t.classList}, добавил класс _watcher-view`
          ))
        : (t.classList.contains("_watcher-view") &&
            t.classList.remove("_watcher-view"),
          this.scrollWatcherLogging(
            `Я не вижу ${t.classList}, убрал класс _watcher-view`
          ));
    }
    scrollWatcherOff(e, t) {
      t.unobserve(e),
        this.scrollWatcherLogging(`Я перестал следить за ${e.classList}`);
    }
    scrollWatcherLogging(e) {
      this.config.logging && l(`[Наблюдатель]: ${e}`);
    }
    scrollWatcherCallback(e, t) {
      const r = e.target;
      this.scrollWatcherIntersecting(e, r),
        r.hasAttribute("data-watch-once") &&
          e.isIntersecting &&
          this.scrollWatcherOff(r, t),
        document.dispatchEvent(
          new CustomEvent("watcherCallback", { detail: { entry: e } })
        );
    }
  }
  let p = !1;
  setTimeout(() => {
    if (p) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          s &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? a(e) : n(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, r) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && a(t);
        let s = c(e, "spollers");
        function a(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  n(e),
                  e.addEventListener("click", l))
                : (e.classList.remove("_spoller-init"),
                  n(e, !1),
                  e.removeEventListener("click", l));
          });
        }
        function n(e, t = !0) {
          const r = e.querySelectorAll("[data-spoller]");
          r.length > 0 &&
            r.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function l(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const s = t.closest("[data-spoller]"),
              a = s.closest("[data-spollers]"),
              n = !!a.hasAttribute("data-one-spoller");
            a.querySelectorAll("._slide").length ||
              (n && !s.classList.contains("_spoller-active") && i(a),
              s.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? o(e, t) : r(e, t);
              })(s.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function i(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            r(t.nextElementSibling, 500));
        }
        s &&
          s.length &&
          s.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            }),
              a(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({}),
    (function () {
      const e = document.querySelectorAll(
        "input[placeholder],textarea[placeholder]"
      );
      e.length &&
        e.forEach((e) => {
          e.dataset.placeholder = e.placeholder;
        }),
        document.body.addEventListener("focusin", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = ""),
            t.classList.add("_form-focus"),
            t.parentElement.classList.add("_form-focus"),
            m.removeError(t));
        }),
        document.body.addEventListener("focusout", function (e) {
          const t = e.target;
          ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
            (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
            t.classList.remove("_form-focus"),
            t.parentElement.classList.remove("_form-focus"),
            t.hasAttribute("data-validate") && m.validateInput(t));
        });
    })(),
    (function (e) {
      const t = document.forms;
      if (t.length)
        for (const e of t)
          e.addEventListener("submit", function (e) {
            r(e.target, e);
          }),
            e.addEventListener("reset", function (e) {
              const t = e.target;
              m.formClean(t);
            });
      async function r(t, r) {
        if (0 === (e ? m.getErrors(t) : 0)) {
          if (t.hasAttribute("data-ajax")) {
            r.preventDefault();
            const e = t.getAttribute("action")
                ? t.getAttribute("action").trim()
                : "#",
              s = t.getAttribute("method")
                ? t.getAttribute("method").trim()
                : "GET",
              a = new FormData(t);
            t.classList.add("_sending");
            const n = await fetch(e, { method: s, body: a });
            if (n.ok) {
              await n.json();
              t.classList.remove("_sending"), o(t);
            } else alert("Ошибка"), t.classList.remove("_sending");
          } else t.hasAttribute("data-dev") && (r.preventDefault(), o(t));
        } else {
          r.preventDefault();
          const e = t.querySelector("._form-error");
          e && t.hasAttribute("data-goto-error") && d(e, !0, 1e3);
        }
      }
      function o(e) {
        document.dispatchEvent(
          new CustomEvent("formSent", { detail: { form: e } })
        ),
          m.formClean(e),
          l(`[Формы]: ${"Форма отправлена!"}`);
      }
    })(!0),
    new u({}),
    (function () {
      function e(e) {
        if ("click" === e.type) {
          const t = e.target;
          if (t.closest("[data-goto]")) {
            const r = t.closest("[data-goto]"),
              o = r.dataset.goto ? r.dataset.goto : "",
              s = !!r.hasAttribute("data-goto-header"),
              a = r.dataset.gotoSpeed ? r.dataset.gotoSpeed : "500";
            d(o, s, a), e.preventDefault();
          }
        } else if ("watcherCallback" === e.type && e.detail) {
          const t = e.detail.entry,
            r = t.target;
          if ("navigator" === r.dataset.watch) {
            const e = r.id,
              o =
                (document.querySelector("[data-goto]._navigator-active"),
                document.querySelector(`[data-goto="${e}"]`));
            t.isIntersecting
              ? o && o.classList.add("_navigator-active")
              : o && o.classList.remove("_navigator-active");
          }
        }
      }
      document.addEventListener("click", e),
        document.addEventListener("watcherCallback", e);
    })(),
    (function () {
      p = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        r = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        o = e.dataset.scroll ? e.dataset.scroll : 1;
      let s,
        a = 0;
      document.addEventListener("windowScroll", function (n) {
        const l = window.scrollY;
        clearTimeout(s),
          l >= o
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (l > a
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (s = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, r))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (a = l <= 0 ? 0 : l);
      });
    })();
})();
