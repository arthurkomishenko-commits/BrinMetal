// BrinMetal scroll reveal -- heavy industrial animations
// Vanilla JS, zero dependencies, works on all devices

// Wait for React hydration to complete before modifying DOM
window.addEventListener("load", function () {
  setTimeout(function () {
  // Heavy industrial easing -- slow start, powerful finish
  var heavyEase = "cubic-bezier(0.16, 1, 0.3, 1)";
  var els = document.querySelectorAll("[data-assemble]");
  if (!els.length) return;

  // Step 1: Set hidden state (no transition, instant)
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var dir = el.getAttribute("data-assemble") || "up";
    var delayIdx = parseInt(el.getAttribute("data-assemble-delay") || "0");
    var delay = Math.min(delayIdx * 0.08, 0.6);

    el.style.webkitTransition = "none";
    el.style.transition = "none";
    el.style.willChange = "opacity, transform";

    if (dir === "line") {
      el.style.webkitTransform = "scaleX(0)";
      el.style.transform = "scaleX(0)";
    } else {
      el.style.opacity = "0";
      switch (dir) {
        case "up":
          el.style.webkitTransform = "translateY(50px)";
          el.style.transform = "translateY(50px)";
          break;
        case "left":
          el.style.webkitTransform = "translateX(-50px)";
          el.style.transform = "translateX(-50px)";
          break;
        case "right":
          el.style.webkitTransform = "translateX(50px)";
          el.style.transform = "translateX(50px)";
          break;
        case "scale":
          el.style.webkitTransform = "scale(0.88)";
          el.style.transform = "scale(0.88)";
          break;
      }
    }

    el._rvlDir = dir;
    el._rvlDelay = delay;
  }

  // Step 2: Force reflow
  void document.body.offsetHeight;

  // Step 3: Enable heavy transitions (after reflow)
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      for (var j = 0; j < els.length; j++) {
        var e = els[j];
        // Heavy duration: 0.9s base, feels like mass moving
        var dur = "0.9s";
        var t =
          "opacity " + dur + " " + heavyEase + " " + e._rvlDelay + "s, " +
          "-webkit-transform " + dur + " " + heavyEase + " " + e._rvlDelay + "s, " +
          "transform " + dur + " " + heavyEase + " " + e._rvlDelay + "s";
        e.style.webkitTransition = t;
        e.style.transition = t;
      }

      // Step 4: IntersectionObserver -- reveal/hide on scroll
      var observer = new IntersectionObserver(
        function (entries) {
          for (var k = 0; k < entries.length; k++) {
            var entry = entries[k];
            var target = entry.target;
            var d = target._rvlDir;

            if (entry.isIntersecting) {
              target.style.opacity = "1";
              var show = d === "line" ? "scaleX(1)" : "none";
              target.style.webkitTransform = show;
              target.style.transform = show;
            } else {
              if (d === "line") {
                target.style.webkitTransform = "scaleX(0)";
                target.style.transform = "scaleX(0)";
              } else {
                target.style.opacity = "0";
                var hide;
                switch (d) {
                  case "up":    hide = "translateY(50px)"; break;
                  case "left":  hide = "translateX(-50px)"; break;
                  case "right": hide = "translateX(50px)"; break;
                  case "scale": hide = "scale(0.88)"; break;
                  default:      hide = "translateY(50px)";
                }
                target.style.webkitTransform = hide;
                target.style.transform = hide;
              }
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
      );

      for (var m = 0; m < els.length; m++) {
        observer.observe(els[m]);
      }
    });
  });
  }, 300); // 300ms delay ensures React hydration is complete
});
