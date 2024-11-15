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
        s = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(s[0].trim())),
        (i.breakpoint = s[1] ? s[1].trim() : "767"),
        (i.place = s[2] ? s[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this,
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t;
        },
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const s = this.mediaQueries[t],
        i = String.prototype.split.call(s, ","),
        n = window.matchMedia(i[0]),
        a = i[1],
        r = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === a;
        });
      n.addListener(function () {
        e.mediaHandler(n, r);
      }),
        this.mediaHandler(n, r);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? s.children[e].insertAdjacentElement("beforebegin", t)
          : s.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
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
    constructor(e) {
      let t = {
        logging: !0,
        init: !0,
        attributeOpenButton: "data-popup",
        attributeCloseButton: "data-close",
        fixElementSelector: "[data-lp]",
        youtubeAttribute: "data-youtube",
        youtubePlaceAttribute: "data-youtube-place",
        setAutoplayYoutube: !0,
        classes: {
          popup: "popup",
          popupContent: "popup__content",
          popupActive: "popup_show",
          bodyActive: "popup-show",
        },
        focusCatch: !0,
        closeEsc: !0,
        bodyLock: !0,
        bodyLockDelay: 500,
        hashSettings: { location: !0, goHash: !0 },
        on: {
          beforeOpen: function () {},
          afterOpen: function () {},
          beforeClose: function () {},
          afterClose: function () {},
        },
      };
      (this.isOpen = !1),
        (this.targetOpen = { selector: !1, element: !1 }),
        (this.previousOpen = { selector: !1, element: !1 }),
        (this.lastClosed = { selector: !1, element: !1 }),
        (this._dataValue = !1),
        (this.hash = !1),
        (this._reopen = !1),
        (this._selectorOpen = !1),
        (this.lastFocusEl = !1),
        (this._focusEl = [
          "a[href]",
          'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
          "button:not([disabled]):not([aria-hidden])",
          "select:not([disabled]):not([aria-hidden])",
          "textarea:not([disabled]):not([aria-hidden])",
          "area[href]",
          "iframe",
          "object",
          "embed",
          "[contenteditable]",
          '[tabindex]:not([tabindex^="-"])',
        ]),
        (this.options = {
          ...t,
          ...e,
          classes: { ...t.classes, ...e?.classes },
          hashSettings: { ...t.hashSettings, ...e?.hashSettings },
          on: { ...t.on, ...e?.on },
        }),
        this.options.init && this.initPopups();
    }
    initPopups() {
      this.popupLogging("Проснулся"), this.eventsPopup();
    }
    eventsPopup() {
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
          if (t)
            return (
              e.preventDefault(),
              (this._dataValue = t.getAttribute(
                this.options.attributeOpenButton,
              )
                ? t.getAttribute(this.options.attributeOpenButton)
                : "error"),
              "error" !== this._dataValue
                ? (this.isOpen || (this.lastFocusEl = t),
                  (this.targetOpen.selector = `${this._dataValue}`),
                  (this._selectorOpen = !0),
                  void this.open())
                : void this.popupLogging(
                    `Ой ой, не заполнен атрибут у ${t.classList}`,
                  )
            );
          return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
            (!e.target.closest(`.${this.options.classes.popupContent}`) &&
              this.isOpen)
            ? (e.preventDefault(), void this.close())
            : void 0;
        }.bind(this),
      ),
        document.addEventListener(
          "keydown",
          function (e) {
            if (
              this.options.closeEsc &&
              27 == e.which &&
              "Escape" === e.code &&
              this.isOpen
            )
              return e.preventDefault(), void this.close();
            this.options.focusCatch &&
              9 == e.which &&
              this.isOpen &&
              this._focusCatch(e);
          }.bind(this),
        ),
        document.querySelector("form[data-ajax],form[data-dev]") &&
          document.addEventListener(
            "formSent",
            function (e) {
              const t = e.detail.form.dataset.popupMessage;
              t && this.open(t);
            }.bind(this),
          ),
        this.options.hashSettings.goHash &&
          (window.addEventListener(
            "hashchange",
            function () {
              window.location.hash
                ? this._openToHash()
                : this.close(this.targetOpen.selector);
            }.bind(this),
          ),
          window.addEventListener(
            "load",
            function () {
              window.location.hash && this._openToHash();
            }.bind(this),
          ));
    }
    open(e) {
      if (
        (e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
        this.isOpen && ((this._reopen = !0), this.close()),
        this._selectorOpen ||
          (this.targetOpen.selector = this.lastClosed.selector),
        this._reopen || (this.previousActiveElement = document.activeElement),
        (this.targetOpen.element = document.querySelector(
          this.targetOpen.selector,
        )),
        this.targetOpen.element)
      ) {
        if (
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
        ) {
          const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
              this.options.youtubeAttribute,
            )}?rel=0&showinfo=0&autoplay=1`,
            t = document.createElement("iframe");
          t.setAttribute("allowfullscreen", "");
          const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
          t.setAttribute("allow", `${s}; encrypted-media`),
            t.setAttribute("src", e),
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
              this.targetOpen.element
                .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                .appendChild(t);
        }
        this.options.hashSettings.location &&
          (this._getHash(), this._setHash()),
          this.options.on.beforeOpen(this),
          this.targetOpen.element.classList.add(
            this.options.classes.popupActive,
          ),
          document.body.classList.add(this.options.classes.bodyActive),
          this._reopen ? (this._reopen = !1) : a(),
          this.targetOpen.element.setAttribute("aria-hidden", "false"),
          (this.previousOpen.selector = this.targetOpen.selector),
          (this.previousOpen.element = this.targetOpen.element),
          (this._selectorOpen = !1),
          (this.isOpen = !0),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          document.dispatchEvent(
            new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
          ),
          this.popupLogging("Открыл попап");
      } else
        this.popupLogging(
          "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
        );
    }
    close(e) {
      e &&
        "string" == typeof e &&
        "" !== e.trim() &&
        (this.previousOpen.selector = e),
        this.isOpen &&
          n &&
          (this.options.on.beforeClose(this),
          this.targetOpen.element.hasAttribute(this.options.youtubeAttribute) &&
            this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ) &&
            (this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            ).innerHTML = ""),
          this.previousOpen.element.classList.remove(
            this.options.classes.popupActive,
          ),
          this.previousOpen.element.setAttribute("aria-hidden", "true"),
          this._reopen ||
            (document.body.classList.remove(this.options.classes.bodyActive),
            a(),
            (this.isOpen = !1)),
          this._removeHash(),
          this._selectorOpen &&
            ((this.lastClosed.selector = this.previousOpen.selector),
            (this.lastClosed.element = this.previousOpen.element)),
          this.options.on.afterClose(this),
          setTimeout(() => {
            this._focusTrap();
          }, 50),
          this.popupLogging("Закрыл попап"));
    }
    _getHash() {
      this.options.hashSettings.location &&
        (this.hash = this.targetOpen.selector.includes("#")
          ? this.targetOpen.selector
          : this.targetOpen.selector.replace(".", "#"));
    }
    _openToHash() {
      let e = document.querySelector(
        `.${window.location.hash.replace("#", "")}`,
      )
        ? `.${window.location.hash.replace("#", "")}`
        : document.querySelector(`${window.location.hash}`)
        ? `${window.location.hash}`
        : null;
      document.querySelector(`[${this.options.attributeOpenButton}="${e}"]`) &&
        e &&
        this.open(e);
    }
    _setHash() {
      history.pushState("", "", this.hash);
    }
    _removeHash() {
      history.pushState("", "", window.location.href.split("#")[0]);
    }
    _focusCatch(e) {
      const t = this.targetOpen.element.querySelectorAll(this._focusEl),
        s = Array.prototype.slice.call(t),
        i = s.indexOf(document.activeElement);
      e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
        e.shiftKey || i !== s.length - 1 || (s[0].focus(), e.preventDefault());
    }
    _focusTrap() {
      const e = this.previousOpen.element.querySelectorAll(this._focusEl);
      !this.isOpen && this.lastFocusEl
        ? this.lastFocusEl.focus()
        : e[0].focus();
    }
    popupLogging(e) {
      this.options.logging &&
        (function (e) {
          setTimeout(() => {
            window.FLS && console.log(e);
          }, 0);
        })(`[Попапос]: ${e}`);
    }
  }
  let s = (e, t = 500, s = 0) => {
      e.classList.contains("_slide") ||
        (e.classList.add("_slide"),
        (e.style.transitionProperty = "height, margin, padding"),
        (e.style.transitionDuration = t + "ms"),
        (e.style.height = `${e.offsetHeight}px`),
        e.offsetHeight,
        (e.style.overflow = "hidden"),
        (e.style.height = s ? `${s}px` : "0px"),
        (e.style.paddingTop = 0),
        (e.style.paddingBottom = 0),
        (e.style.marginTop = 0),
        (e.style.marginBottom = 0),
        window.setTimeout(() => {
          (e.hidden = !s),
            !s && e.style.removeProperty("height"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            !s && e.style.removeProperty("overflow"),
            e.style.removeProperty("transition-duration"),
            e.style.removeProperty("transition-property"),
            e.classList.remove("_slide");
        }, t));
    },
    i = (e, t = 500, s = 0) => {
      if (!e.classList.contains("_slide")) {
        e.classList.add("_slide"),
          (e.hidden = !e.hidden && null),
          s && e.style.removeProperty("height");
        let i = e.offsetHeight;
        (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          e.offsetHeight,
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = i + "px"),
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
    n = !0,
    a = (e = 500) => {
      document.documentElement.classList.contains("lock") ? r(e) : o(e);
    },
    r = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let t = document.querySelector("body");
      if (n) {
        let s = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < s.length; e++) {
          s[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (n = !1),
          setTimeout(function () {
            n = !0;
          }, e);
      }
    };
  function l(e, t) {
    const s = Array.from(e).filter(function (e, s, i) {
      if (e.dataset[t]) return e.dataset[t].split(",")[0];
    });
    if (s.length) {
      const e = [];
      s.forEach((s) => {
        const i = {},
          n = s.dataset[t].split(",");
        (i.value = n[0]),
          (i.type = n[1] ? n[1].trim() : "max"),
          (i.item = s),
          e.push(i);
      });
      let i = e.map(function (e) {
        return (
          "(" + e.type + "-width: " + e.value + "px)," + e.value + "," + e.type
        );
      });
      i = (function (e) {
        return e.filter(function (e, t, s) {
          return s.indexOf(e) === t;
        });
      })(i);
      const n = [];
      if (i.length)
        return (
          i.forEach((t) => {
            const s = t.split(","),
              i = s[1],
              a = s[2],
              r = window.matchMedia(s[0]),
              o = e.filter(function (e) {
                if (e.value === i && e.type === a) return !0;
              });
            n.push({ itemsArray: o, matchMedia: r });
          }),
          n
        );
    }
  }
  function d(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function c(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : d(t[s]) && d(e[s]) && Object.keys(t[s]).length > 0 && c(e[s], t[s]);
      });
  }
  const p = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function u() {
    const e = "undefined" != typeof document ? document : {};
    return c(e, p), e;
  }
  const h = {
    document: p,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function m() {
    const e = "undefined" != typeof window ? window : {};
    return c(e, h), e;
  }
  function f(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function g() {
    return Date.now();
  }
  function v(e, t) {
    void 0 === t && (t = "x");
    const s = m();
    let i, n, a;
    const r = (function (e) {
      const t = m();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((n = r.transform || r.webkitTransform),
          n.split(",").length > 6 &&
            (n = n
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
        : ((a =
            r.MozTransform ||
            r.OTransform ||
            r.MsTransform ||
            r.msTransform ||
            r.transform ||
            r
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = a.toString().split(","))),
      "x" === t &&
        (n = s.WebKitCSSMatrix
          ? a.m41
          : 16 === i.length
          ? parseFloat(i[12])
          : parseFloat(i[4])),
      "y" === t &&
        (n = s.WebKitCSSMatrix
          ? a.m42
          : 16 === i.length
          ? parseFloat(i[13])
          : parseFloat(i[5])),
      n || 0
    );
  }
  function y(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function b() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const n = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != n &&
        ((s = n),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(n)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            a = Object.getOwnPropertyDescriptor(n, i);
          void 0 !== a &&
            a.enumerable &&
            (y(e[i]) && y(n[i])
              ? n[i].__swiper__
                ? (e[i] = n[i])
                : b(e[i], n[i])
              : !y(e[i]) && y(n[i])
              ? ((e[i] = {}), n[i].__swiper__ ? (e[i] = n[i]) : b(e[i], n[i]))
              : (e[i] = n[i]));
        }
      }
    }
    var s;
    return e;
  }
  function w(e, t, s) {
    e.style.setProperty(t, s);
  }
  function S(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const n = m(),
      a = -t.translate;
    let r,
      o = null;
    const l = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      n.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > a ? "next" : "prev",
      c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      p = () => {
        (r = new Date().getTime()), null === o && (o = r);
        const e = Math.max(Math.min((r - o) / l, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let u = a + d * (s - a);
        if ((c(u, s) && (u = s), t.wrapperEl.scrollTo({ [i]: u }), c(u, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: u });
            }),
            void n.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = n.requestAnimationFrame(p);
      };
    p();
  }
  function T(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function E(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
  }
  function x(e, t) {
    return m().getComputedStyle(e, null).getPropertyValue(t);
  }
  function C(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function L(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function M(e, t, s) {
    const i = m();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  let P, A, O;
  function k() {
    return (
      P ||
        (P = (function () {
          const e = m(),
            t = u();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      P
    );
  }
  function _(e) {
    return (
      void 0 === e && (e = {}),
      A ||
        (A = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = k(),
            i = m(),
            n = i.navigator.platform,
            a = t || i.navigator.userAgent,
            r = { ios: !1, android: !1 },
            o = i.screen.width,
            l = i.screen.height,
            d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
          let c = a.match(/(iPad).*OS\s([\d_]+)/);
          const p = a.match(/(iPod)(.*OS\s([\d_]+))?/),
            u = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            h = "Win32" === n;
          let f = "MacIntel" === n;
          return (
            !c &&
              f &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${o}x${l}`) >= 0 &&
              ((c = a.match(/(Version)\/([\d.]+)/)),
              c || (c = [0, 1, "13_0_0"]),
              (f = !1)),
            d && !h && ((r.os = "android"), (r.android = !0)),
            (c || u || p) && ((r.os = "ios"), (r.ios = !0)),
            r
          );
        })(e)),
      A
    );
  }
  function I() {
    return (
      O ||
        (O = (function () {
          const e = m();
          let t = !1;
          function s() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (s()) {
            const s = String(e.navigator.userAgent);
            if (s.includes("Version/")) {
              const [e, i] = s
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              t = e < 16 || (16 === e && i < 2);
            }
          }
          return {
            isSafari: t || s(),
            needPerspectiveFix: t,
            isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
          };
        })()),
      O
    );
  }
  var z = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const n = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][n](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function n() {
        i.off(e, n), n.__emitterProxy && delete n.__emitterProxy;
        for (var s = arguments.length, a = new Array(s), r = 0; r < s; r++)
          a[r] = arguments[r];
        t.apply(i, a);
      }
      return (n.__emitterProxy = t), i.on(e, n, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
        ? (e.split(" ").forEach((e) => {
            void 0 === t
              ? (s.eventsListeners[e] = [])
              : s.eventsListeners[e] &&
                s.eventsListeners[e].forEach((i, n) => {
                  (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                    s.eventsListeners[e].splice(n, 1);
                });
          }),
          s)
        : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var n = arguments.length, a = new Array(n), r = 0; r < n; r++)
        a[r] = arguments[r];
      "string" == typeof a[0] || Array.isArray(a[0])
        ? ((t = a[0]), (s = a.slice(1, a.length)), (i = e))
        : ((t = a[0].events), (s = a[0].data), (i = a[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const $ = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`)),
          t && t.remove();
      }
    },
    G = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    D = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        n = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = n,
          a = [s - t];
        return (
          a.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            a.includes(t.column) && G(e, s);
          })
        );
      }
      const a = n + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = n - t; i <= a + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < n || t > a) && G(e, t);
        }
      else
        for (let i = Math.max(n - t, 0); i <= Math.min(a + t, s - 1); i += 1)
          i !== n && (i > a || i < n) && G(e, i);
    };
  var B = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(x(i, "padding-left") || 0, 10) -
            parseInt(x(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(x(i, "padding-top") || 0, 10) -
            parseInt(x(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t) {
        return e.isHorizontal()
          ? t
          : {
              width: "height",
              "margin-top": "margin-left",
              "margin-bottom ": "margin-right",
              "margin-left": "margin-top",
              "margin-right": "margin-bottom",
              "padding-left": "padding-top",
              "padding-right": "padding-bottom",
              marginRight: "marginBottom",
            }[t];
      }
      function s(e, s) {
        return parseFloat(e.getPropertyValue(t(s)) || 0);
      }
      const i = e.params,
        {
          wrapperEl: n,
          slidesEl: a,
          size: r,
          rtlTranslate: o,
          wrongRTL: l,
        } = e,
        d = e.virtual && i.virtual.enabled,
        c = d ? e.virtual.slides.length : e.slides.length,
        p = T(a, `.${e.params.slideClass}, swiper-slide`),
        u = d ? e.virtual.slides.length : p.length;
      let h = [];
      const m = [],
        f = [];
      let g = i.slidesOffsetBefore;
      "function" == typeof g && (g = i.slidesOffsetBefore.call(e));
      let v = i.slidesOffsetAfter;
      "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
      const y = e.snapGrid.length,
        b = e.slidesGrid.length;
      let S = i.spaceBetween,
        E = -g,
        C = 0,
        L = 0;
      if (void 0 === r) return;
      "string" == typeof S && S.indexOf("%") >= 0
        ? (S = (parseFloat(S.replace("%", "")) / 100) * r)
        : "string" == typeof S && (S = parseFloat(S)),
        (e.virtualSize = -S),
        p.forEach((e) => {
          o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        i.centeredSlides &&
          i.cssMode &&
          (w(n, "--swiper-centered-offset-before", ""),
          w(n, "--swiper-centered-offset-after", ""));
      const P = i.grid && i.grid.rows > 1 && e.grid;
      let A;
      P && e.grid.initSlides(u);
      const O =
        "auto" === i.slidesPerView &&
        i.breakpoints &&
        Object.keys(i.breakpoints).filter(
          (e) => void 0 !== i.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let n = 0; n < u; n += 1) {
        let a;
        if (
          ((A = 0),
          p[n] && (a = p[n]),
          P && e.grid.updateSlide(n, a, u, t),
          !p[n] || "none" !== x(a, "display"))
        ) {
          if ("auto" === i.slidesPerView) {
            O && (p[n].style[t("width")] = "");
            const r = getComputedStyle(a),
              o = a.style.transform,
              l = a.style.webkitTransform;
            if (
              (o && (a.style.transform = "none"),
              l && (a.style.webkitTransform = "none"),
              i.roundLengths)
            )
              A = e.isHorizontal() ? M(a, "width", !0) : M(a, "height", !0);
            else {
              const e = s(r, "width"),
                t = s(r, "padding-left"),
                i = s(r, "padding-right"),
                n = s(r, "margin-left"),
                o = s(r, "margin-right"),
                l = r.getPropertyValue("box-sizing");
              if (l && "border-box" === l) A = e + n + o;
              else {
                const { clientWidth: s, offsetWidth: r } = a;
                A = e + t + i + n + o + (r - s);
              }
            }
            o && (a.style.transform = o),
              l && (a.style.webkitTransform = l),
              i.roundLengths && (A = Math.floor(A));
          } else
            (A = (r - (i.slidesPerView - 1) * S) / i.slidesPerView),
              i.roundLengths && (A = Math.floor(A)),
              p[n] && (p[n].style[t("width")] = `${A}px`);
          p[n] && (p[n].swiperSlideSize = A),
            f.push(A),
            i.centeredSlides
              ? ((E = E + A / 2 + C / 2 + S),
                0 === C && 0 !== n && (E = E - r / 2 - S),
                0 === n && (E = E - r / 2 - S),
                Math.abs(E) < 0.001 && (E = 0),
                i.roundLengths && (E = Math.floor(E)),
                L % i.slidesPerGroup == 0 && h.push(E),
                m.push(E))
              : (i.roundLengths && (E = Math.floor(E)),
                (L - Math.min(e.params.slidesPerGroupSkip, L)) %
                  e.params.slidesPerGroup ==
                  0 && h.push(E),
                m.push(E),
                (E = E + A + S)),
            (e.virtualSize += A + S),
            (C = A),
            (L += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + v),
        o &&
          l &&
          ("slide" === i.effect || "coverflow" === i.effect) &&
          (n.style.width = `${e.virtualSize + S}px`),
        i.setWrapperSize && (n.style[t("width")] = `${e.virtualSize + S}px`),
        P && e.grid.updateWrapperSize(A, h, t),
        !i.centeredSlides)
      ) {
        const t = [];
        for (let s = 0; s < h.length; s += 1) {
          let n = h[s];
          i.roundLengths && (n = Math.floor(n)),
            h[s] <= e.virtualSize - r && t.push(n);
        }
        (h = t),
          Math.floor(e.virtualSize - r) - Math.floor(h[h.length - 1]) > 1 &&
            h.push(e.virtualSize - r);
      }
      if (d && i.loop) {
        const t = f[0] + S;
        if (i.slidesPerGroup > 1) {
          const s = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                i.slidesPerGroup,
            ),
            n = t * i.slidesPerGroup;
          for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + n);
        }
        for (
          let s = 0;
          s < e.virtual.slidesBefore + e.virtual.slidesAfter;
          s += 1
        )
          1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
            m.push(m[m.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === h.length && (h = [0]), 0 !== S)) {
        const s = e.isHorizontal() && o ? "marginLeft" : t("marginRight");
        p.filter(
          (e, t) => !(i.cssMode && !i.loop) || t !== p.length - 1,
        ).forEach((e) => {
          e.style[s] = `${S}px`;
        });
      }
      if (i.centeredSlides && i.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (S || 0);
        }),
          (e -= S);
        const t = e - r;
        h = h.map((e) => (e <= 0 ? -g : e > t ? t + v : e));
      }
      if (i.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (S || 0);
          }),
          (e -= S),
          e < r)
        ) {
          const t = (r - e) / 2;
          h.forEach((e, s) => {
            h[s] = e - t;
          }),
            m.forEach((e, s) => {
              m[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: p,
          snapGrid: h,
          slidesGrid: m,
          slidesSizesGrid: f,
        }),
        i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
      ) {
        w(n, "--swiper-centered-offset-before", -h[0] + "px"),
          w(
            n,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (u !== c && e.emit("slidesLengthChange"),
        h.length !== y &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        m.length !== b && e.emit("slidesGridLengthChange"),
        i.watchSlidesProgress && e.updateSlidesOffset(),
        !(d || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
      ) {
        const t = `${i.containerModifierClass}backface-hidden`,
          s = e.el.classList.contains(t);
        u <= i.maxBackfaceHiddenSlides
          ? s || e.el.classList.add(t)
          : s && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let n,
        a = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const r = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
            const e = t.activeIndex + n;
            if (e > t.slides.length && !i) break;
            s.push(r(e));
          }
      else s.push(r(t.activeIndex));
      for (n = 0; n < s.length; n += 1)
        if (void 0 !== s[n]) {
          const e = s[n].offsetHeight;
          a = e > a ? e : a;
        }
      (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: n, snapGrid: a } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let r = -e;
      n && (r = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let o = s.spaceBetween;
      "string" == typeof o && o.indexOf("%") >= 0
        ? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
        : "string" == typeof o && (o = parseFloat(o));
      for (let e = 0; e < i.length; e += 1) {
        const l = i[e];
        let d = l.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (r + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          p =
            (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (l.swiperSlideSize + o),
          u = -(r - d),
          h = u + t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (h > 1 && h <= t.size) ||
          (u <= 0 && h >= t.size)) &&
          (t.visibleSlides.push(l),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          (l.progress = n ? -c : c),
          (l.originalProgress = n ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: n, isBeginning: a, isEnd: r, progressLoop: o } = t;
      const l = a,
        d = r;
      if (0 === i) (n = 0), (a = !0), (r = !0);
      else {
        n = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          o = Math.abs(e - t.maxTranslate()) < 1;
        (a = s || n <= 0), (r = o || n >= 1), s && (n = 0), o && (n = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          n = t.slidesGrid[s],
          a = t.slidesGrid[i],
          r = t.slidesGrid[t.slidesGrid.length - 1],
          l = Math.abs(e);
        (o = l >= n ? (l - n) / r : (l + r - a) / r), o > 1 && (o -= 1);
      }
      Object.assign(t, {
        progress: n,
        progressLoop: o,
        isBeginning: a,
        isEnd: r,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        a && !l && t.emit("reachBeginning toEdge"),
        r && !d && t.emit("reachEnd toEdge"),
        ((l && !a) || (d && !r)) && t.emit("fromEdge"),
        t.emit("progress", n);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
        a = e.virtual && s.virtual.enabled,
        r = (e) => T(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        a)
      )
        if (s.loop) {
          let t = n - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = r(`[data-swiper-slide-index="${t}"]`));
        } else o = r(`[data-swiper-slide-index="${n}"]`);
      else o = t[n];
      if (o) {
        o.classList.add(s.slideActiveClass);
        let e = (function (e, t) {
          const s = [];
          for (; e.nextElementSibling; ) {
            const i = e.nextElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
        let i = (function (e, t) {
          const s = [];
          for (; e.previousElementSibling; ) {
            const i = e.previousElementSibling;
            t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
          }
          return s;
        })(o, `.${s.slideClass}, swiper-slide`)[0];
        s.loop && 0 === !i && (i = t[t.length - 1]),
          i && i.classList.add(s.slidePrevClass);
      }
      e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: n,
          activeIndex: a,
          realIndex: r,
          snapIndex: o,
        } = t;
      let l,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let n;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (n = e)
                  : i >= t[e] && i < t[e + 1] && (n = e + 1)
                : i >= t[e] && (n = e);
            return (
              s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        l = i.indexOf(s);
      else {
        const e = Math.min(n.slidesPerGroupSkip, d);
        l = e + Math.floor((d - e) / n.slidesPerGroup);
      }
      if ((l >= i.length && (l = i.length - 1), d === a))
        return (
          l !== o && ((t.snapIndex = l), t.emit("snapIndexChange")),
          void (
            t.params.loop &&
            t.virtual &&
            t.params.virtual.enabled &&
            (t.realIndex = c(d))
          )
        );
      let p;
      (p =
        t.virtual && n.virtual.enabled && n.loop
          ? c(d)
          : t.slides[d]
          ? parseInt(
              t.slides[d].getAttribute("data-swiper-slide-index") || d,
              10,
            )
          : d),
        Object.assign(t, {
          previousSnapIndex: o,
          snapIndex: l,
          previousRealIndex: r,
          realIndex: p,
          previousIndex: a,
          activeIndex: d,
        }),
        t.initialized && D(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        r !== p && t.emit("realIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
    },
    updateClickedSlide: function (e) {
      const t = this,
        s = t.params,
        i = e.closest(`.${s.slideClass}, swiper-slide`);
      let n,
        a = !1;
      if (i)
        for (let e = 0; e < t.slides.length; e += 1)
          if (t.slides[e] === i) {
            (a = !0), (n = e);
            break;
          }
      if (!i || !a)
        return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
      (t.clickedSlide = i),
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              i.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (t.clickedIndex = n),
        s.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  var H = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: n } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let a = v(n, e);
      return (a += this.cssOverflowAdjustment()), s && (a = -a), a || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: n, wrapperEl: a, progress: r } = s;
      let o,
        l = 0,
        d = 0;
      s.isHorizontal() ? (l = i ? -e : e) : (d = e),
        n.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? l : d),
        n.cssMode
          ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -l
              : -d)
          : n.virtualTranslate ||
            (s.isHorizontal()
              ? (l -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (a.style.transform = `translate3d(${l}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (o = 0 === c ? 0 : (e - s.minTranslate()) / c),
        o !== r && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const a = this,
        { params: r, wrapperEl: o } = a;
      if (a.animating && r.preventInteractionOnTransition) return !1;
      const l = a.minTranslate(),
        d = a.maxTranslate();
      let c;
      if (
        ((c = i && e > l ? l : i && e < d ? d : e),
        a.updateProgress(c),
        r.cssMode)
      ) {
        const e = a.isHorizontal();
        if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!a.support.smoothScroll)
            return (
              S({ swiper: a, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          o.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (a.setTransition(0),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, n), a.emit("transitionEnd")))
          : (a.setTransition(t),
            a.setTranslate(c),
            s &&
              (a.emit("beforeTransitionStart", t, n),
              a.emit("transitionStart")),
            a.animating ||
              ((a.animating = !0),
              a.onTranslateToWrapperTransitionEnd ||
                (a.onTranslateToWrapperTransitionEnd = function (e) {
                  a &&
                    !a.destroyed &&
                    e.target === this &&
                    (a.wrapperEl.removeEventListener(
                      "transitionend",
                      a.onTranslateToWrapperTransitionEnd,
                    ),
                    (a.onTranslateToWrapperTransitionEnd = null),
                    delete a.onTranslateToWrapperTransitionEnd,
                    s && a.emit("transitionEnd"));
                }),
              a.wrapperEl.addEventListener(
                "transitionend",
                a.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function F(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: n } = e;
    const { activeIndex: a, previousIndex: r } = t;
    let o = i;
    if (
      (o || (o = a > r ? "next" : a < r ? "prev" : "reset"),
      t.emit(`transition${n}`),
      s && a !== r)
    ) {
      if ("reset" === o) return void t.emit(`slideResetTransition${n}`);
      t.emit(`slideChangeTransition${n}`),
        "next" === o
          ? t.emit(`slideNextTransition${n}`)
          : t.emit(`slidePrevTransition${n}`);
    }
  }
  var j = {
    slideTo: function (e, t, s, i, n) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const a = this;
      let r = e;
      r < 0 && (r = 0);
      const {
        params: o,
        snapGrid: l,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: h,
        enabled: m,
      } = a;
      if ((a.animating && o.preventInteractionOnTransition) || (!m && !i && !n))
        return !1;
      const f = Math.min(a.params.slidesPerGroupSkip, r);
      let g = f + Math.floor((r - f) / a.params.slidesPerGroup);
      g >= l.length && (g = l.length - 1);
      const v = -l[g];
      if (o.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * v),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (r = e)
              : t >= s && t < i && (r = e + 1)
            : t >= s && (r = e);
        }
      if (a.initialized && r !== p) {
        if (
          !a.allowSlideNext &&
          (u
            ? v > a.translate && v > a.minTranslate()
            : v < a.translate && v < a.minTranslate())
        )
          return !1;
        if (
          !a.allowSlidePrev &&
          v > a.translate &&
          v > a.maxTranslate() &&
          (p || 0) !== r
        )
          return !1;
      }
      let y;
      if (
        (r !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
        a.updateProgress(v),
        (y = r > p ? "next" : r < p ? "prev" : "reset"),
        (u && -v === a.translate) || (!u && v === a.translate))
      )
        return (
          a.updateActiveIndex(r),
          o.autoHeight && a.updateAutoHeight(),
          a.updateSlidesClasses(),
          "slide" !== o.effect && a.setTranslate(v),
          "reset" !== y && (a.transitionStart(s, y), a.transitionEnd(s, y)),
          !1
        );
      if (o.cssMode) {
        const e = a.isHorizontal(),
          s = u ? v : -v;
        if (0 === t) {
          const t = a.virtual && a.params.virtual.enabled;
          t &&
            ((a.wrapperEl.style.scrollSnapType = "none"),
            (a._immediateVirtual = !0)),
            t && !a._cssModeVirtualInitialSet && a.params.initialSlide > 0
              ? ((a._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  h[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (h[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (a.wrapperEl.style.scrollSnapType = ""),
                  (a._immediateVirtual = !1);
              });
        } else {
          if (!a.support.smoothScroll)
            return (
              S({ swiper: a, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        a.setTransition(t),
        a.setTranslate(v),
        a.updateActiveIndex(r),
        a.updateSlidesClasses(),
        a.emit("beforeTransitionStart", t, i),
        a.transitionStart(s, y),
        0 === t
          ? a.transitionEnd(s, y)
          : a.animating ||
            ((a.animating = !0),
            a.onSlideToWrapperTransitionEnd ||
              (a.onSlideToWrapperTransitionEnd = function (e) {
                a &&
                  !a.destroyed &&
                  e.target === this &&
                  (a.wrapperEl.removeEventListener(
                    "transitionend",
                    a.onSlideToWrapperTransitionEnd,
                  ),
                  (a.onSlideToWrapperTransitionEnd = null),
                  delete a.onSlideToWrapperTransitionEnd,
                  a.transitionEnd(s, y));
              }),
            a.wrapperEl.addEventListener(
              "transitionend",
              a.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const n = this;
      let a = e;
      return (
        n.params.loop &&
          (n.virtual && n.params.virtual.enabled
            ? (a += n.virtual.slidesBefore)
            : (a = n.getSlideIndexByData(a))),
        n.slideTo(a, t, s, i)
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: n, params: a, animating: r } = i;
      if (!n) return i;
      let o = a.slidesPerGroup;
      "auto" === a.slidesPerView &&
        1 === a.slidesPerGroup &&
        a.slidesPerGroupAuto &&
        (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const l = i.activeIndex < a.slidesPerGroupSkip ? 1 : o,
        d = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (r && !d && a.loopPreventsSliding) return !1;
        i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      return a.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + l, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: n,
          snapGrid: a,
          slidesGrid: r,
          rtlTranslate: o,
          enabled: l,
          animating: d,
        } = i;
      if (!l) return i;
      const c = i.virtual && n.virtual.enabled;
      if (n.loop) {
        if (d && !c && n.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(o ? i.translate : -i.translate),
        h = a.map((e) => p(e));
      let m = a[h.indexOf(u) - 1];
      if (void 0 === m && n.cssMode) {
        let e;
        a.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (m = a[e > 0 ? e - 1 : e]);
      }
      let f = 0;
      if (
        (void 0 !== m &&
          ((f = r.indexOf(m)),
          f < 0 && (f = i.activeIndex - 1),
          "auto" === n.slidesPerView &&
            1 === n.slidesPerGroup &&
            n.slidesPerGroupAuto &&
            ((f = f - i.slidesPerViewDynamic("previous", !0) + 1),
            (f = Math.max(f, 0)))),
        n.rewind && i.isBeginning)
      ) {
        const n =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(n, e, t, s);
      }
      return i.slideTo(f, e, t, s);
    },
    slideReset: function (e, t, s) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, s)
      );
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const n = this;
      let a = n.activeIndex;
      const r = Math.min(n.params.slidesPerGroupSkip, a),
        o = r + Math.floor((a - r) / n.params.slidesPerGroup),
        l = n.rtlTranslate ? n.translate : -n.translate;
      if (l >= n.snapGrid[o]) {
        const e = n.snapGrid[o];
        l - e > (n.snapGrid[o + 1] - e) * i && (a += n.params.slidesPerGroup);
      } else {
        const e = n.snapGrid[o - 1];
        l - e <= (n.snapGrid[o] - e) * i && (a -= n.params.slidesPerGroup);
      }
      return (
        (a = Math.max(a, 0)),
        (a = Math.min(a, n.slidesGrid.length - 1)),
        n.slideTo(a, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this,
        { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let n,
        a = e.clickedIndex;
      const r = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (n = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? a < e.loopedSlides - i / 2 ||
              a > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (a = e.getSlideIndex(
                  T(s, `${r}[data-swiper-slide-index="${n}"]`)[0],
                )),
                f(() => {
                  e.slideTo(a);
                }))
              : e.slideTo(a)
            : a > e.slides.length - i
            ? (e.loopFix(),
              (a = e.getSlideIndex(
                T(s, `${r}[data-swiper-slide-index="${n}"]`)[0],
              )),
              f(() => {
                e.slideTo(a);
              }))
            : e.slideTo(a);
      } else e.slideTo(a);
    },
  };
  var N = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      T(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
        e.setAttribute("data-swiper-slide-index", t);
      }),
        t.loopFix({
          slideRealIndex: e,
          direction: s.centeredSlides ? void 0 : "next",
        });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: n,
        activeSlideIndex: a,
        byController: r,
        byMousewheel: o,
      } = void 0 === e ? {} : e;
      const l = this;
      if (!l.params.loop) return;
      l.emit("beforeLoopFix");
      const {
        slides: d,
        allowSlidePrev: c,
        allowSlideNext: p,
        slidesEl: u,
        params: h,
      } = l;
      if (
        ((l.allowSlidePrev = !0),
        (l.allowSlideNext = !0),
        l.virtual && h.virtual.enabled)
      )
        return (
          s &&
            (h.centeredSlides || 0 !== l.snapIndex
              ? h.centeredSlides && l.snapIndex < h.slidesPerView
                ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                : l.snapIndex === l.snapGrid.length - 1 &&
                  l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
              : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
          (l.allowSlidePrev = c),
          (l.allowSlideNext = p),
          void l.emit("loopFix")
        );
      const m =
        "auto" === h.slidesPerView
          ? l.slidesPerViewDynamic()
          : Math.ceil(parseFloat(h.slidesPerView, 10));
      let f = h.loopedSlides || m;
      f % h.slidesPerGroup != 0 &&
        (f += h.slidesPerGroup - (f % h.slidesPerGroup)),
        (l.loopedSlides = f);
      const g = [],
        v = [];
      let y = l.activeIndex;
      void 0 === a
        ? (a = l.getSlideIndex(
            l.slides.filter((e) => e.classList.contains(h.slideActiveClass))[0],
          ))
        : (y = a);
      const b = "next" === i || !i,
        w = "prev" === i || !i;
      let S = 0,
        T = 0;
      if (a < f) {
        S = Math.max(f - a, h.slidesPerGroup);
        for (let e = 0; e < f - a; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          g.push(d.length - t - 1);
        }
      } else if (a > l.slides.length - 2 * f) {
        T = Math.max(a - (l.slides.length - 2 * f), h.slidesPerGroup);
        for (let e = 0; e < T; e += 1) {
          const t = e - Math.floor(e / d.length) * d.length;
          v.push(t);
        }
      }
      if (
        (w &&
          g.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.prepend(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        b &&
          v.forEach((e) => {
            (l.slides[e].swiperLoopMoveDOM = !0),
              u.append(l.slides[e]),
              (l.slides[e].swiperLoopMoveDOM = !1);
          }),
        l.recalcSlides(),
        "auto" === h.slidesPerView && l.updateSlides(),
        h.watchSlidesProgress && l.updateSlidesOffset(),
        s)
      )
        if (g.length > 0 && w)
          if (void 0 === t) {
            const e = l.slidesGrid[y],
              t = l.slidesGrid[y + S] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(y + S, 0, !1, !0),
                n &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else
            n &&
              (l.slideToLoop(t, 0, !1, !0),
              (l.touchEventsData.currentTranslate = l.translate));
        else if (v.length > 0 && b)
          if (void 0 === t) {
            const e = l.slidesGrid[y],
              t = l.slidesGrid[y - T] - e;
            o
              ? l.setTranslate(l.translate - t)
              : (l.slideTo(y - T, 0, !1, !0),
                n &&
                  ((l.touches[l.isHorizontal() ? "startX" : "startY"] += t),
                  (l.touchEventsData.currentTranslate = l.translate)));
          } else l.slideToLoop(t, 0, !1, !0);
      if (
        ((l.allowSlidePrev = c),
        (l.allowSlideNext = p),
        l.controller && l.controller.control && !r)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: n,
          activeSlideIndex: a,
          byController: !0,
        };
        Array.isArray(l.controller.control)
          ? l.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === h.slidesPerView && s,
                });
            })
          : l.controller.control instanceof l.constructor &&
            l.controller.control.params.loop &&
            l.controller.control.loopFix({
              ...e,
              slideTo:
                l.controller.control.params.slidesPerView === h.slidesPerView &&
                s,
            });
      }
      l.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function V(e) {
    const t = this,
      s = u(),
      i = m(),
      n = t.touchEventsData;
    n.evCache.push(e);
    const { params: a, touches: r, enabled: o } = t;
    if (!o) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    if (t.animating && a.preventInteractionOnTransition) return;
    !t.animating && a.cssMode && a.loop && t.loopFix();
    let l = e;
    l.originalEvent && (l = l.originalEvent);
    let d = l.target;
    if ("wrapper" === a.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in l && 3 === l.which) return;
    if ("button" in l && l.button > 0) return;
    if (n.isTouched && n.isMoved) return;
    const c = !!a.noSwipingClass && "" !== a.noSwipingClass,
      p = e.composedPath ? e.composedPath() : e.path;
    c && l.target && l.target.shadowRoot && p && (d = p[0]);
    const h = a.noSwipingSelector
        ? a.noSwipingSelector
        : `.${a.noSwipingClass}`,
      f = !(!l.target || !l.target.shadowRoot);
    if (
      a.noSwiping &&
      (f
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === u() || s === m()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(h, d)
        : d.closest(h))
    )
      return void (t.allowClick = !0);
    if (a.swipeHandler && !d.closest(a.swipeHandler)) return;
    (r.currentX = l.pageX), (r.currentY = l.pageY);
    const v = r.currentX,
      y = r.currentY,
      b = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
      w = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
    if (b && (v <= w || v >= i.innerWidth - w)) {
      if ("prevent" !== b) return;
      e.preventDefault();
    }
    Object.assign(n, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (r.startX = v),
      (r.startY = y),
      (n.touchStartTime = g()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      a.threshold > 0 && (n.allowThresholdMove = !1);
    let S = !0;
    d.matches(n.focusableElements) &&
      ((S = !1), "SELECT" === d.nodeName && (n.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(n.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const T = S && t.allowTouchMove && a.touchStartPreventDefault;
    (!a.touchStartForcePreventDefault && !T) ||
      d.isContentEditable ||
      l.preventDefault(),
      a.freeMode &&
        a.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !a.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", l);
  }
  function q(e) {
    const t = u(),
      s = this,
      i = s.touchEventsData,
      { params: n, touches: a, rtlTranslate: r, enabled: o } = s;
    if (!o) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    let l = e;
    if ((l.originalEvent && (l = l.originalEvent), !i.isTouched))
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", l)
      );
    const d = i.evCache.findIndex((e) => e.pointerId === l.pointerId);
    d >= 0 && (i.evCache[d] = l);
    const c = i.evCache.length > 1 ? i.evCache[0] : l,
      p = c.pageX,
      h = c.pageY;
    if (l.preventedByNestedSwiper) return (a.startX = p), void (a.startY = h);
    if (!s.allowTouchMove)
      return (
        l.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(a, {
            startX: p,
            startY: h,
            prevX: s.touches.currentX,
            prevY: s.touches.currentY,
            currentX: p,
            currentY: h,
          }),
          (i.touchStartTime = g()))
        )
      );
    if (n.touchReleaseOnEdges && !n.loop)
      if (s.isVertical()) {
        if (
          (h < a.startY && s.translate <= s.maxTranslate()) ||
          (h > a.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (p < a.startX && s.translate <= s.maxTranslate()) ||
        (p > a.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      l.target === t.activeElement &&
      l.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    if (
      (i.allowTouchCallbacks && s.emit("touchMove", l),
      l.targetTouches && l.targetTouches.length > 1)
    )
      return;
    (a.currentX = p), (a.currentY = h);
    const m = a.currentX - a.startX,
      f = a.currentY - a.startY;
    if (s.params.threshold && Math.sqrt(m ** 2 + f ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && a.currentY === a.startY) ||
      (s.isVertical() && a.currentX === a.startX)
        ? (i.isScrolling = !1)
        : m * m + f * f >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(f), Math.abs(m))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > n.touchAngle
            : 90 - e > n.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", l),
      void 0 === i.startMoving &&
        ((a.currentX === a.startX && a.currentY === a.startY) ||
          (i.startMoving = !0)),
      i.isScrolling ||
        (s.zoom &&
          s.params.zoom &&
          s.params.zoom.enabled &&
          i.evCache.length > 1))
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !n.cssMode && l.cancelable && l.preventDefault(),
      n.touchMoveStopPropagation && !n.nested && l.stopPropagation();
    let v = s.isHorizontal() ? m : f,
      y = s.isHorizontal()
        ? a.currentX - a.previousX
        : a.currentY - a.previousY;
    n.oneWayMovement &&
      ((v = Math.abs(v) * (r ? 1 : -1)), (y = Math.abs(y) * (r ? 1 : -1))),
      (a.diff = v),
      (v *= n.touchRatio),
      r && ((v = -v), (y = -y));
    const b = s.touchesDirection;
    (s.swipeDirection = v > 0 ? "prev" : "next"),
      (s.touchesDirection = y > 0 ? "prev" : "next");
    const w = s.params.loop && !n.cssMode;
    if (!i.isMoved) {
      if (
        (w && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !n.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", l);
    }
    let S;
    i.isMoved &&
      b !== s.touchesDirection &&
      w &&
      Math.abs(v) >= 1 &&
      (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (S = !0)),
      s.emit("sliderMove", l),
      (i.isMoved = !0),
      (i.currentTranslate = v + i.startTranslate);
    let T = !0,
      E = n.resistanceRatio;
    if (
      (n.touchReleaseOnEdges && (E = 0),
      v > 0
        ? (w &&
            !S &&
            i.currentTranslate >
              (n.centeredSlides
                ? s.minTranslate() - s.size / 2
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((T = !1),
            n.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + v) ** E)))
        : v < 0 &&
          (w &&
            !S &&
            i.currentTranslate <
              (n.centeredSlides
                ? s.maxTranslate() + s.size / 2
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === n.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(n.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((T = !1),
            n.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - v) ** E))),
      T && (l.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      n.threshold > 0)
    ) {
      if (!(Math.abs(v) > n.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (a.startX = a.currentX),
          (a.startY = a.currentY),
          (i.currentTranslate = i.startTranslate),
          void (a.diff = s.isHorizontal()
            ? a.currentX - a.startX
            : a.currentY - a.startY)
        );
    }
    n.followFinger &&
      !n.cssMode &&
      (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
        n.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      n.freeMode &&
        n.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function R(e) {
    const t = this,
      s = t.touchEventsData,
      i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
    if (
      (i >= 0 && s.evCache.splice(i, 1),
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        e.type,
      ))
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(e.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    const {
      params: n,
      touches: a,
      rtlTranslate: r,
      slidesGrid: o,
      enabled: l,
    } = t;
    if (!l) return;
    if (!n.simulateTouch && "mouse" === e.pointerType) return;
    let d = e;
    if (
      (d.originalEvent && (d = d.originalEvent),
      s.allowTouchCallbacks && t.emit("touchEnd", d),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && n.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    n.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = g(),
      p = c - s.touchStartTime;
    if (t.allowClick) {
      const e = d.path || (d.composedPath && d.composedPath());
      t.updateClickedSlide((e && e[0]) || d.target),
        t.emit("tap click", d),
        p < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", d);
    }
    if (
      ((s.lastClickTime = g()),
      f(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        0 === a.diff ||
        s.currentTranslate === s.startTranslate)
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let u;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (u = n.followFinger
        ? r
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      n.cssMode)
    )
      return;
    if (n.freeMode && n.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: u });
    let h = 0,
      m = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
    ) {
      const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      void 0 !== o[e + t]
        ? u >= o[e] && u < o[e + t] && ((h = e), (m = o[e + t] - o[e]))
        : u >= o[e] && ((h = e), (m = o[o.length - 1] - o[o.length - 2]));
    }
    let v = null,
      y = null;
    n.rewind &&
      (t.isBeginning
        ? (y =
            n.virtual && n.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (v = 0));
    const b = (u - o[h]) / m,
      w = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
    if (p > n.longSwipesMs) {
      if (!n.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= n.longSwipesRatio
          ? t.slideTo(n.rewind && t.isEnd ? v : h + w)
          : t.slideTo(h)),
        "prev" === t.swipeDirection &&
          (b > 1 - n.longSwipesRatio
            ? t.slideTo(h + w)
            : null !== y && b < 0 && Math.abs(b) > n.longSwipesRatio
            ? t.slideTo(y)
            : t.slideTo(h));
    } else {
      if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl)
        ? d.target === t.navigation.nextEl
          ? t.slideTo(h + w)
          : t.slideTo(h)
        : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : h + w),
          "prev" === t.swipeDirection && t.slideTo(null !== y ? y : h));
    }
  }
  function W() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e,
      r = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const o = r && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    o
      ? e.params.loop && !r
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = n),
      (e.allowSlideNext = i),
      e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
  }
  function Y(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function X() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let n;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const a = e.maxTranslate() - e.minTranslate();
    (n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
      n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function U(e) {
    const t = this;
    $(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  let K = !1;
  function Q() {}
  const J = (e, t) => {
    const s = u(),
      { params: i, el: n, wrapperEl: a, device: r } = e,
      o = !!i.nested,
      l = "on" === t ? "addEventListener" : "removeEventListener",
      d = t;
    n[l]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[l]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
      s[l]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        n[l]("click", e.onClick, !0),
      i.cssMode && a[l]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[d](
            r.ios || r.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            W,
            !0,
          )
        : e[d]("observerUpdate", W, !0),
      n[l]("load", e.onLoad, { capture: !0 });
  };
  const Z = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var ee = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function te(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        n = s[i];
      "object" == typeof n && null !== n
        ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
            !0 === e[i] &&
            (e[i] = { auto: !0 }),
          i in e && "enabled" in n
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              b(t, s))
            : b(t, s))
        : b(t, s);
    };
  }
  const se = {
      eventsEmitter: z,
      update: B,
      translate: H,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            F({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              F({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: j,
      loop: N,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            t = u(),
            { params: s } = e;
          (e.onTouchStart = V.bind(e)),
            (e.onTouchMove = q.bind(e)),
            (e.onTouchEnd = R.bind(e)),
            s.cssMode && (e.onScroll = X.bind(e)),
            (e.onClick = Y.bind(e)),
            (e.onLoad = U.bind(e)),
            K || (t.addEventListener("touchstart", Q), (K = !0)),
            J(e, "on");
        },
        detachEvents: function () {
          J(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: n } = e,
            a = i.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const r = e.getBreakpoint(a, e.params.breakpointsBase, e.el);
          if (!r || e.currentBreakpoint === r) return;
          const o = (r in a ? a[r] : void 0) || e.originalParams,
            l = Z(e, i),
            d = Z(e, o),
            c = i.enabled;
          l && !d
            ? (n.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !l &&
              d &&
              (n.classList.add(`${i.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === i.grid.fill)) &&
                n.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === o[t]) return;
              const s = i[t] && i[t].enabled,
                n = o[t] && o[t].enabled;
              s && !n && e[t].disable(), !s && n && e[t].enable();
            });
          const p = o.direction && o.direction !== i.direction,
            u = i.loop && (o.slidesPerView !== i.slidesPerView || p);
          p && s && e.changeDirection(), b(e.params, o);
          const h = e.params.enabled;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !h ? e.disable() : !c && h && e.enable(),
            (e.currentBreakpoint = r),
            e.emit("_beforeBreakpoint", o),
            u && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
            e.emit("breakpoint", o);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const n = m(),
            a = "window" === t ? n.innerHeight : s.clientHeight,
            r = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: a * t, point: e };
              }
              return { value: e, point: e };
            });
          r.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < r.length; e += 1) {
            const { point: a, value: o } = r[e];
            "window" === t
              ? n.matchMedia(`(min-width: ${o}px)`).matches && (i = a)
              : o <= s.clientWidth && (i = a);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: n, device: a } = e,
            r = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...r), n.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    ie = {};
  class ne {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
        i[n] = arguments[n];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = b({}, t)),
        e && !t.el && (t.el = e);
      const a = u();
      if (
        t.el &&
        "string" == typeof t.el &&
        a.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          a.querySelectorAll(t.el).forEach((s) => {
            const i = b({}, t, { el: s });
            e.push(new ne(i));
          }),
          e
        );
      }
      const r = this;
      (r.__swiper__ = !0),
        (r.support = k()),
        (r.device = _({ userAgent: t.userAgent })),
        (r.browser = I()),
        (r.eventsListeners = {}),
        (r.eventsAnyListeners = []),
        (r.modules = [...r.__modules__]),
        t.modules && Array.isArray(t.modules) && r.modules.push(...t.modules);
      const o = {};
      r.modules.forEach((e) => {
        e({
          params: t,
          swiper: r,
          extendParams: te(t, o),
          on: r.on.bind(r),
          once: r.once.bind(r),
          off: r.off.bind(r),
          emit: r.emit.bind(r),
        });
      });
      const l = b({}, ee, o);
      return (
        (r.params = b({}, l, ie, t)),
        (r.originalParams = b({}, r.params)),
        (r.passedParams = b({}, t)),
        r.params &&
          r.params.on &&
          Object.keys(r.params.on).forEach((e) => {
            r.on(e, r.params.on[e]);
          }),
        r.params && r.params.onAny && r.onAny(r.params.onAny),
        Object.assign(r, {
          enabled: r.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === r.params.direction,
          isVertical: () => "vertical" === r.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: r.params.allowSlideNext,
          allowSlidePrev: r.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: r.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            evCache: [],
          },
          allowClick: !0,
          allowTouchMove: r.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        r.emit("_swiper"),
        r.params.init && r.init(),
        r
      );
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = C(T(t, `.${s.slideClass}, swiper-slide`)[0]);
      return C(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = T(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        n = (s.maxTranslate() - i) * e + i;
      s.translateTo(n, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: n,
        slidesSizesGrid: a,
        size: r,
        activeIndex: o,
      } = this;
      let l = 1;
      if (s.centeredSlides) {
        let e,
          t = i[o] ? i[o].swiperSlideSize : 0;
        for (let s = o + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > r && (e = !0));
        for (let s = o - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (l += 1), t > r && (e = !0));
      } else if ("current" === e)
        for (let e = o + 1; e < i.length; e += 1) {
          (t ? n[e] + a[e] - n[o] < r : n[e] - n[o] < r) && (l += 1);
        }
      else
        for (let e = o - 1; e >= 0; e -= 1) {
          n[o] - n[e] < r && (l += 1);
        }
      return l;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let n;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && $(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          n = e.slideTo(t.length - 1, 0, !1, !0);
        } else n = e.slideTo(e.activeIndex, 0, !1, !0);
        n || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          "SWIPER-CONTAINER" === s.parentNode.host.nodeName &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let n = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return T(s, i())[0];
      })();
      return (
        !n &&
          t.params.createElements &&
          ((n = E("div", t.params.wrapperClass)),
          s.append(n),
          T(s, `.${t.params.slideClass}`).forEach((e) => {
            n.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: n,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : n,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === x(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === x(s, "direction")),
          wrongRTL: "-webkit-box" === x(n, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? $(t, e)
            : e.addEventListener("load", (e) => {
                $(t, e.target);
              });
        }),
        D(t),
        (t.initialized = !0),
        D(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: n, wrapperEl: a, slides: r } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            n.removeAttribute("style"),
            a.removeAttribute("style"),
            r &&
              r.length &&
              r.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      b(ie, e);
    }
    static get extendedDefaults() {
      return ie;
    }
    static get defaults() {
      return ee;
    }
    static installModule(e) {
      ne.prototype.__modules__ || (ne.prototype.__modules__ = []);
      const t = ne.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ne.installModule(e)), ne)
        : (ne.installModule(e), ne);
    }
  }
  function ae(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((n) => {
          if (!s[n] && !0 === s.auto) {
            let a = T(e.el, `.${i[n]}`)[0];
            a || ((a = E("div", i[n])), (a.className = i[n]), e.el.append(a)),
              (s[n] = a),
              (t[n] = a);
          }
        }),
      s
    );
  }
  function re(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null });
    const a = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function r(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function o(e, s) {
      const i = t.params.navigation;
      (e = a(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function l() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return o(s, !1), void o(e, !1);
      o(s, t.isBeginning && !t.params.rewind),
        o(e, t.isEnd && !t.params.rewind);
    }
    function d(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), n("navigationPrev"));
    }
    function c(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), n("navigationNext"));
    }
    function p() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = ae(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = r(e.nextEl),
        i = r(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = a(s)),
        (i = a(i));
      const n = (s, i) => {
        s && s.addEventListener("click", "next" === i ? c : d),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => n(e, "next")), i.forEach((e) => n(e, "prev"));
    }
    function u() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = a(e)), (s = a(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? c : d),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    i("init", () => {
      !1 === t.params.navigation.enabled ? h() : (p(), l());
    }),
      i("toEdge fromEdge lock unlock", () => {
        l();
      }),
      i("destroy", () => {
        u();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = a(e)),
          (s = a(s)),
          [...e, ...s]
            .filter((e) => !!e)
            .forEach((e) =>
              e.classList[t.enabled ? "remove" : "add"](
                t.params.navigation.lockClass,
              ),
            );
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: r } = t.navigation;
        (i = a(i)), (r = a(r));
        const o = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !r.includes(o) &&
          !i.includes(o)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === o || t.pagination.el.contains(o))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : r.length &&
              (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
            n(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...r]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const h = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        u();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          p(),
          l();
      },
      disable: h,
      update: l,
      init: p,
      destroy: u,
    });
  }
  function oe(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function le(e) {
    let { swiper: t, extendParams: s, on: i, emit: n } = e;
    const a = "swiper-pagination";
    let r;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${a}-bullet`,
        bulletActiveClass: `${a}-bullet-active`,
        modifierClass: `${a}-`,
        currentClass: `${a}-current`,
        totalClass: `${a}-total`,
        hiddenClass: `${a}-hidden`,
        progressbarFillClass: `${a}-progressbar-fill`,
        progressbarOppositeClass: `${a}-progressbar-opposite`,
        clickableClass: `${a}-clickable`,
        lockClass: `${a}-lock`,
        horizontalClass: `${a}-horizontal`,
        verticalClass: `${a}-vertical`,
        paginationDisabledClass: `${a}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let o = 0;
    const l = (e) => (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    function d() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function c(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function p(e) {
      const s = e.target.closest(oe(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = C(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        const e = t.realIndex,
          s = t.getSlideIndexByData(i),
          n = t.getSlideIndexByData(t.realIndex);
        if (s > t.slides.length - t.loopedSlides) {
          const i = t.activeIndex;
          t.loopFix({
            direction: s > n ? "next" : "prev",
            activeSlideIndex: s,
            slideTo: !1,
          });
          i === t.activeIndex && t.slideToLoop(e, 0, !1, !0);
        }
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function u() {
      const e = t.rtl,
        s = t.params.pagination;
      if (d()) return;
      let i,
        a,
        p = t.pagination.el;
      p = l(p);
      const u =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        h = t.params.loop
          ? Math.ceil(u / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((a = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
          ? ((i = t.snapIndex), (a = t.previousSnapIndex))
          : ((a = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const n = t.pagination.bullets;
        let l, d, u;
        if (
          (s.dynamicBullets &&
            ((r = M(n[0], t.isHorizontal() ? "width" : "height", !0)),
            p.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                r * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== a &&
              ((o += i - (a || 0)),
              o > s.dynamicMainBullets - 1
                ? (o = s.dynamicMainBullets - 1)
                : o < 0 && (o = 0)),
            (l = Math.max(i - o, 0)),
            (d = l + (Math.min(n.length, s.dynamicMainBullets) - 1)),
            (u = (d + l) / 2)),
          n.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          p.length > 1)
        )
          n.forEach((e) => {
            const n = C(e);
            n === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (n >= l &&
                  n <= d &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                n === l && c(e, "prev"),
                n === d && c(e, "next"));
          });
        else {
          const e = n[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              n.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = n[l],
              t = n[d];
            for (let e = l; e <= d; e += 1)
              n[e] &&
                n[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            c(e, "prev"), c(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(n.length, s.dynamicMainBullets + 4),
            a = (r * i - r) / 2 - u * r,
            o = e ? "right" : "left";
          n.forEach((e) => {
            e.style[t.isHorizontal() ? o : "top"] = `${a}px`;
          });
        }
      }
      p.forEach((e, a) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(oe(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(oe(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(h);
            })),
          "progressbar" === s.type)
        ) {
          let n;
          n = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
            ? "horizontal"
            : "vertical";
          const a = (i + 1) / h;
          let r = 1,
            o = 1;
          "horizontal" === n ? (r = a) : (o = a),
            e.querySelectorAll(oe(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${r}) scaleY(${o})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, h)),
            0 === a && n("paginationRender", e))
          : (0 === a && n("paginationRender", e), n("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function h() {
      const e = t.params.pagination;
      if (d()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.slides.length;
      let i = t.pagination.el;
      i = l(i);
      let a = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (a += e.renderBullet.call(t, s, e.bulletClass))
            : (a += `<${e.bulletElement} ${
                t.isElement ? 'part="bullet"' : ""
              } class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (a = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (a = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = a || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(oe(e.bulletClass)),
              );
        }),
        "custom" !== e.type && n("paginationRender", i[0]);
    }
    function m() {
      t.params.pagination = ae(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" },
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => L(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = l(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (o = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", p),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function f() {
      const e = t.params.pagination;
      if (d()) return;
      let s = t.pagination.el;
      s &&
        ((s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", p));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = l(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? g() : (m(), h(), u());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && u();
      }),
      i("snapIndexChange", () => {
        u();
      }),
      i("snapGridLengthChange", () => {
        h(), u();
      }),
      i("destroy", () => {
        f();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        u();
      }),
      i("click", (e, s) => {
        const i = s.target,
          a = l(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          a &&
          a.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = a[0].classList.contains(t.params.pagination.hiddenClass);
          n(!0 === e ? "paginationShow" : "paginationHide"),
            a.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const g = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = l(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        f();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = l(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          m(),
          h(),
          u();
      },
      disable: g,
      render: h,
      update: u,
      init: m,
      destroy: f,
    });
  }
  function de(e) {
    let t,
      s,
      { swiper: i, extendParams: n, on: a, emit: r, params: o } = e;
    (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      n({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !0,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let l,
      d,
      c,
      p,
      h,
      m,
      f,
      g = o && o.autoplay ? o.autoplay.delay : 3e3,
      v = o && o.autoplay ? o.autoplay.delay : 3e3,
      y = new Date().getTime;
    function b(e) {
      i &&
        !i.destroyed &&
        i.wrapperEl &&
        e.target === i.wrapperEl &&
        (i.wrapperEl.removeEventListener("transitionend", b), C());
    }
    const w = () => {
        if (i.destroyed || !i.autoplay.running) return;
        i.autoplay.paused ? (d = !0) : d && ((v = l), (d = !1));
        const e = i.autoplay.paused ? l : y + v - new Date().getTime();
        (i.autoplay.timeLeft = e),
          r("autoplayTimeLeft", e, e / g),
          (s = requestAnimationFrame(() => {
            w();
          }));
      },
      S = (e) => {
        if (i.destroyed || !i.autoplay.running) return;
        cancelAnimationFrame(s), w();
        let n = void 0 === e ? i.params.autoplay.delay : e;
        (g = i.params.autoplay.delay), (v = i.params.autoplay.delay);
        const a = (() => {
          let e;
          if (
            ((e =
              i.virtual && i.params.virtual.enabled
                ? i.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : i.slides[i.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(a) &&
          a > 0 &&
          void 0 === e &&
          ((n = a), (g = a), (v = a)),
          (l = n);
        const o = i.params.speed,
          d = () => {
            i &&
              !i.destroyed &&
              (i.params.autoplay.reverseDirection
                ? !i.isBeginning || i.params.loop || i.params.rewind
                  ? (i.slidePrev(o, !0, !0), r("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(i.slides.length - 1, o, !0, !0), r("autoplay"))
                : !i.isEnd || i.params.loop || i.params.rewind
                ? (i.slideNext(o, !0, !0), r("autoplay"))
                : i.params.autoplay.stopOnLastSlide ||
                  (i.slideTo(0, o, !0, !0), r("autoplay")),
              i.params.cssMode &&
                ((y = new Date().getTime()),
                requestAnimationFrame(() => {
                  S();
                })));
          };
        return (
          n > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                d();
              }, n)))
            : requestAnimationFrame(() => {
                d();
              }),
          n
        );
      },
      T = () => {
        (i.autoplay.running = !0), S(), r("autoplayStart");
      },
      E = () => {
        (i.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          r("autoplayStop");
      },
      x = (e, s) => {
        if (i.destroyed || !i.autoplay.running) return;
        clearTimeout(t), e || (f = !0);
        const n = () => {
          r("autoplayPause"),
            i.params.autoplay.waitForTransition
              ? i.wrapperEl.addEventListener("transitionend", b)
              : C();
        };
        if (((i.autoplay.paused = !0), s))
          return m && (l = i.params.autoplay.delay), (m = !1), void n();
        const a = l || i.params.autoplay.delay;
        (l = a - (new Date().getTime() - y)),
          (i.isEnd && l < 0 && !i.params.loop) || (l < 0 && (l = 0), n());
      },
      C = () => {
        (i.isEnd && l < 0 && !i.params.loop) ||
          i.destroyed ||
          !i.autoplay.running ||
          ((y = new Date().getTime()),
          f ? ((f = !1), S(l)) : S(),
          (i.autoplay.paused = !1),
          r("autoplayResume"));
      },
      L = () => {
        if (i.destroyed || !i.autoplay.running) return;
        const e = u();
        "hidden" === e.visibilityState && ((f = !0), x(!0)),
          "visible" === e.visibilityState && C();
      },
      M = (e) => {
        "mouse" === e.pointerType &&
          ((f = !0), i.animating || i.autoplay.paused || x(!0));
      },
      P = (e) => {
        "mouse" === e.pointerType && i.autoplay.paused && C();
      };
    a("init", () => {
      i.params.autoplay.enabled &&
        (i.params.autoplay.pauseOnMouseEnter &&
          (i.el.addEventListener("pointerenter", M),
          i.el.addEventListener("pointerleave", P)),
        u().addEventListener("visibilitychange", L),
        (y = new Date().getTime()),
        T());
    }),
      a("destroy", () => {
        i.el.removeEventListener("pointerenter", M),
          i.el.removeEventListener("pointerleave", P),
          u().removeEventListener("visibilitychange", L),
          i.autoplay.running && E();
      }),
      a("beforeTransitionStart", (e, t, s) => {
        !i.destroyed &&
          i.autoplay.running &&
          (s || !i.params.autoplay.disableOnInteraction ? x(!0, !0) : E());
      }),
      a("sliderFirstMove", () => {
        !i.destroyed &&
          i.autoplay.running &&
          (i.params.autoplay.disableOnInteraction
            ? E()
            : ((c = !0),
              (p = !1),
              (f = !1),
              (h = setTimeout(() => {
                (f = !0), (p = !0), x(!0);
              }, 200))));
      }),
      a("touchEnd", () => {
        if (!i.destroyed && i.autoplay.running && c) {
          if (
            (clearTimeout(h),
            clearTimeout(t),
            i.params.autoplay.disableOnInteraction)
          )
            return (p = !1), void (c = !1);
          p && i.params.cssMode && C(), (p = !1), (c = !1);
        }
      }),
      a("slideChange", () => {
        !i.destroyed && i.autoplay.running && (m = !0);
      }),
      Object.assign(i.autoplay, { start: T, stop: E, pause: x, resume: C });
  }
  function ce() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(se).forEach((e) => {
    Object.keys(se[e]).forEach((t) => {
      ne.prototype[t] = se[e][t];
    });
  }),
    ne.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const n = m();
        let a = null,
          r = null;
        const o = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          l = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== n.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((a = new ResizeObserver((e) => {
                r = n.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let n = s,
                    a = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: r } = e;
                    (r && r !== t.el) ||
                      ((n = i ? i.width : (s[0] || s).inlineSize),
                      (a = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (n === s && a === i) || o();
                });
              })),
              a.observe(t.el))
            : (n.addEventListener("resize", o),
              n.addEventListener("orientationchange", l));
        }),
          s("destroy", () => {
            r && n.cancelAnimationFrame(r),
              a && a.unobserve && t.el && (a.unobserve(t.el), (a = null)),
              n.removeEventListener("resize", o),
              n.removeEventListener("orientationchange", l);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: n } = e;
        const a = [],
          r = m(),
          o = function (e, s) {
            void 0 === s && (s = {});
            const i = new (r.MutationObserver || r.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void n("observerUpdate", e[0]);
                const s = function () {
                  n("observerUpdate", e[0]);
                };
                r.requestAnimationFrame
                  ? r.requestAnimationFrame(s)
                  : r.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              a.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = L(t.hostEl);
                for (let t = 0; t < e.length; t += 1) o(e[t]);
              }
              o(t.hostEl, { childList: t.params.observeSlideChildren }),
                o(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            a.forEach((e) => {
              e.disconnect();
            }),
              a.splice(0, a.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      ce(),
        document.querySelector(".our-mission__slider") &&
          new ne(".our-mission__slider", {
            modules: [le, re, de],
            autoplay: { delay: 6e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            speed: 1200,
            loop: !0,
            navigation: {
              prevEl:
                ".our-mission__main-slider-buttons .main-slider-buttons__item-prev",
              nextEl:
                ".our-mission__main-slider-buttons .main-slider-buttons__item-next",
            },
            on: {},
          }),
        document.querySelector(".projects__slider") &&
          new ne(".projects__slider", {
            modules: [le, re, de],
            autoplay: { delay: 5e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 32,
            speed: 1200,
            loop: !0,
            pagination: { el: ".slide-main-controll__dotts", clickable: !0 },
            navigation: {
              prevEl:
                ".projects__project-slide-buttons .project-slide-buttons__item-prev",
              nextEl:
                ".projects__project-slide-buttons .project-slide-buttons__item-next",
            },
            on: {
              init: function (e) {
                (document.querySelector(".fraction-controll__all").innerHTML =
                  e.slides.length < 12
                    ? `0${e.slides.length}`
                    : e.slides.length),
                  console.log(e);
              },
              slideChange: function (e) {
                document.querySelector(
                  ".fraction-controll__current",
                ).innerHTML =
                  e.realIndex + 1 < 12
                    ? `0${e.realIndex + 1}`
                    : e.realIndexx + 1;
              },
            },
          });
    });
  let pe = !1;
  setTimeout(() => {
    if (pe) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0),
    window.addEventListener("load", function (e) {
      document.body.insertAdjacentHTML(
        "beforeend",
        '<div class="main-bg"></div>',
      );
    }),
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
          n && (a(), document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      const e = document.querySelectorAll("[data-spollers]");
      if (e.length > 0) {
        const t = Array.from(e).filter(function (e, t, s) {
          return !e.dataset.spollers.split(",")[0];
        });
        t.length && a(t);
        let n = l(e, "spollers");
        function a(e, t = !1) {
          e.forEach((e) => {
            (e = t ? e.item : e),
              t.matches || !t
                ? (e.classList.add("_spoller-init"),
                  r(e),
                  e.addEventListener("click", o))
                : (e.classList.remove("_spoller-init"),
                  r(e, !1),
                  e.removeEventListener("click", o));
          });
        }
        function r(e, t = !0) {
          const s = e.querySelectorAll("[data-spoller]");
          s.length > 0 &&
            s.forEach((e) => {
              t
                ? (e.removeAttribute("tabindex"),
                  e.classList.contains("_spoller-active") ||
                    (e.nextElementSibling.hidden = !0))
                : (e.setAttribute("tabindex", "-1"),
                  (e.nextElementSibling.hidden = !1));
            });
        }
        function o(e) {
          const t = e.target;
          if (t.closest("[data-spoller]")) {
            const n = t.closest("[data-spoller]"),
              a = n.closest("[data-spollers]"),
              r = !!a.hasAttribute("data-one-spoller");
            a.querySelectorAll("._slide").length ||
              (r && !n.classList.contains("_spoller-active") && d(a),
              n.classList.toggle("_spoller-active"),
              ((e, t = 500) => {
                e.hidden ? i(e, t) : s(e, t);
              })(n.nextElementSibling, 500)),
              e.preventDefault();
          }
        }
        function d(e) {
          const t = e.querySelector("[data-spoller]._spoller-active");
          t &&
            (t.classList.remove("_spoller-active"),
            s(t.nextElementSibling, 500));
        }
        n &&
          n.length &&
          n.forEach((e) => {
            e.matchMedia.addEventListener("change", function () {
              a(e.itemsArray, e.matchMedia);
            }),
              a(e.itemsArray, e.matchMedia);
          });
      }
    })(),
    new t({});
})();
