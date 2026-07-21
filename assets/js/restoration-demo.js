(() => {
  const widgets = document.querySelectorAll("[data-restore-widget], [data-restore-pair]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  widgets.forEach((widget) => {
    const frame = widget.querySelector(".restore-frame");
    const slider = widget.querySelector("[data-restore-slider]");
    const playButton = widget.querySelector("[data-restore-play]");
    const beforeImage = frame?.querySelector(".restore-before");
    const afterImage = frame?.querySelector(".restore-after-wrap img");
    const exampleButtons = widget.querySelectorAll("[data-restore-example]");
    let animationFrame = 0;
    let hasAutoplayed = false;

    const setProgress = (value) => {
      const next = Math.max(0, Math.min(100, Number(value) || 0));
      widget.style.setProperty("--restore-progress", `${next}%`);

      if (slider) {
        slider.value = String(Math.round(next));
      }
    };

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      widget.classList.remove("is-playing");
    };

    const playRepair = (startValue = 0, endValue = 100, duration = 1700) => {
      stopAnimation();
      widget.classList.add("is-playing");

      const startedAt = performance.now();
      const step = (now) => {
        const elapsed = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        setProgress(startValue + (endValue - startValue) * eased);

        if (elapsed < 1) {
          animationFrame = window.requestAnimationFrame(step);
          return;
        }

        animationFrame = 0;
        widget.classList.remove("is-playing");

        if (playButton) {
          playButton.textContent = "Replay Repair";
        }
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const updateFromPointer = (event) => {
      if (!frame) {
        return;
      }

      const bounds = frame.getBoundingClientRect();
      const progress = ((event.clientX - bounds.left) / bounds.width) * 100;
      setProgress(progress);
    };

    setProgress(slider ? slider.value : 55);
    widget.restorePlayRepair = playRepair;
    widget.restoreSetProgress = setProgress;

    slider?.addEventListener("input", () => {
      stopAnimation();
      setProgress(slider.value);

      if (playButton) {
        playButton.textContent = "Play Repair";
      }
    });

    playButton?.addEventListener("click", () => {
      playRepair(0, 100);
    });

    exampleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        stopAnimation();

        if (beforeImage && button.dataset.before) {
          beforeImage.src = button.dataset.before;
          beforeImage.alt = button.dataset.beforeAlt || beforeImage.alt;
        }

        if (afterImage && button.dataset.after) {
          afterImage.src = button.dataset.after;
        }

        exampleButtons.forEach((item) => {
          const isActive = item === button;
          item.classList.toggle("is-active", isActive);
          item.setAttribute("aria-pressed", String(isActive));
        });

        setProgress(50);

        if (playButton) {
          playButton.textContent = "Play Repair";
        }
      });
    });

    frame?.addEventListener("pointerdown", (event) => {
      stopAnimation();
      frame.setPointerCapture(event.pointerId);
      updateFromPointer(event);
    });

    frame?.addEventListener("pointermove", (event) => {
      if (frame.hasPointerCapture(event.pointerId)) {
        updateFromPointer(event);
      }
    });

    frame?.addEventListener("pointerup", (event) => {
      if (frame.hasPointerCapture(event.pointerId)) {
        frame.releasePointerCapture(event.pointerId);
      }
    });

    if (reduceMotion || widget.dataset.autoplay !== "true") {
      return;
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || hasAutoplayed) {
              return;
            }

            hasAutoplayed = true;
            window.setTimeout(() => playRepair(8, 88, 1800), 220);
            observer.disconnect();
          });
        },
        { threshold: 0.45 },
      );

      observer.observe(widget);
    } else {
      window.setTimeout(() => playRepair(8, 88, 1800), 420);
    }
  });

  document.querySelectorAll("[data-restore-play-all]").forEach((button) => {
    button.addEventListener("click", () => {
      const root = button.closest(".restore-widget") || document;
      const targets = root.querySelectorAll("[data-restore-pair]");

      targets.forEach((target, index) => {
        window.setTimeout(() => {
          target.restorePlayRepair?.(0, 100, 1500);
        }, index * 90);
      });
    });
  });
})();
