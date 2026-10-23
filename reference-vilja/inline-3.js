
    (function () {
      var now = Date.now()
      var activationStart = 0
      try {
        var navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry && navEntry.activationStart > 0) {
          activationStart = navEntry.activationStart;
        }
      } catch (e) {}
      window.initialTimestamps = {
        initialTimestamp: now,
        initialRequestTimestamp: Math.round(performance.timeOrigin ? performance.timeOrigin + activationStart : now - performance.now() + activationStart)
      }

      window.thunderboltTag = "QA_READY"
      window.thunderboltVersion = "1.18201.0"
    })();
  