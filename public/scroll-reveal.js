// BrinMetal scroll reveal -- vanilla JS, zero dependencies
// This file runs independently from React/Next.js

document.addEventListener("DOMContentLoaded", function () {
  // Debug marker
  var marker = document.createElement("div");
  marker.textContent = "JS OK";
  marker.style.cssText =
    "position:fixed;top:0;right:0;background:#c4956a;color:#1a1a1a;font:bold 10px/1 monospace;padding:3px 6px;z-index:99999";
  document.body.appendChild(marker);

  // TEST: Big visible animation to prove transitions work on this device
  var testBox = document.createElement("div");
  testBox.textContent = "ANIMATION TEST";
  testBox.style.cssText =
    "position:fixed;bottom:60px;left:50%;transform:translateX(-50%) translateY(100px);opacity:0;" +
    "background:#c4956a;color:#1a1a1a;font:bold 14px/1 system-ui;padding:12px 24px;z-index:99998;" +
    "border-radius:2px;-webkit-transition:opacity 1s ease, -webkit-transform 1s ease;transition:opacity 1s ease, transform 1s ease";
  document.body.appendChild(testBox);
  setTimeout(function() {
    testBox.style.opacity = "1";
    testBox.style.webkitTransform = "translateX(-50%) translateY(0)";
    testBox.style.transform = "translateX(-50%) translateY(0)";
  }, 500);
  setTimeout(function() {
    testBox.style.opacity = "0";
    testBox.style.webkitTransform = "translateX(-50%) translateY(100px)";
    testBox.style.transform = "translateX(-50%) translateY(100px)";
  }, 4000);
  setTimeout(function() { testBox.remove(); }, 5000);

  var ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  var els = document.querySelectorAll("[data-assemble]");

  if (!els.length) {
    marker.textContent = "JS OK / 0 els";
    return;
  }

  marker.textContent = "JS OK / " + els.length + " els";

  // Step 1: hide all elements instantly
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var dir = el.getAttribute("data-assemble") || "up";
    var delayIdx = parseInt(el.getAttribute("data-assemble-delay") || "0");
    var delay = Math.min(delayIdx * 0.07, 0.5);

    el.style.willChange = "opacity, transform";
    el.style.webkitTransition = "none";
    el.style.transition = "none";

    if (dir === "line") {
      el.style.webkitTransform = "scaleX(0)";
      el.style.transform = "scaleX(0)";
    } else {
      el.style.opacity = "0";
      if (dir === "up") {
        el.style.webkitTransform = "translateY(30px)";
        el.style.transform = "translateY(30px)";
      } else if (dir === "left") {
        el.style.webkitTransform = "translateX(-30px)";
        el.style.transform = "translateX(-30px)";
      } else if (dir === "right") {
        el.style.webkitTransform = "translateX(30px)";
        el.style.transform = "translateX(30px)";
      } else if (dir === "scale") {
        el.style.webkitTransform = "scale(0.93)";
        el.style.transform = "scale(0.93)";
      }
    }

    el._rvlDir = dir;
    el._rvlDelay = delay;
  }

  // Step 2: force layout reflow
  void document.body.offsetHeight;

  // Step 3: enable transitions (after reflow)
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      for (var j = 0; j < els.length; j++) {
        var e = els[j];
        var t =
          "opacity 0.7s " +
          ease +
          " " +
          e._rvlDelay +
          "s, " +
          "-webkit-transform 0.7s " +
          ease +
          " " +
          e._rvlDelay +
          "s, " +
          "transform 0.7s " +
          ease +
          " " +
          e._rvlDelay +
          "s";
        e.style.webkitTransition = t;
        e.style.transition = t;
      }

      // Step 4: observe
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            for (var k = 0; k < entries.length; k++) {
              var entry = entries[k];
              var target = entry.target;
              var d = target._rvlDir;

              if (entry.isIntersecting) {
                target.style.opacity = "1";
                target.style.webkitTransform = d === "line" ? "scaleX(1)" : "none";
                target.style.transform = d === "line" ? "scaleX(1)" : "none";
              } else {
                if (d === "line") {
                  target.style.webkitTransform = "scaleX(0)";
                  target.style.transform = "scaleX(0)";
                } else {
                  target.style.opacity = "0";
                  var tr =
                    d === "up"
                      ? "translateY(30px)"
                      : d === "left"
                        ? "translateX(-30px)"
                        : d === "right"
                          ? "translateX(30px)"
                          : "scale(0.93)";
                  target.style.webkitTransform = tr;
                  target.style.transform = tr;
                }
              }
            }
          },
          { threshold: 0.05, rootMargin: "20px" }
        );

        for (var m = 0; m < els.length; m++) {
          observer.observe(els[m]);
        }

        marker.textContent = "JS OK / " + els.length + " / IO active";
      } else {
        // No IntersectionObserver -- just show everything
        for (var n = 0; n < els.length; n++) {
          els[n].style.opacity = "1";
          els[n].style.webkitTransform = "none";
          els[n].style.transform = "none";
        }
        marker.textContent = "JS OK / no IO / shown";
      }
    });
  });
});
