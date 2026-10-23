
    (function() {
        var navEntry = performance.getEntriesByType('navigation')[0];
        if (navEntry && navEntry.type === 'reload') {
            return;
        }
        if ('PageRevealEvent' in window) {
            window.__pageRevealPromise = new Promise(function(resolve) {
                window.addEventListener('pagereveal', resolve, { once: true });
            });
        } else {
            window.__pageRevealPromise = Promise.resolve();
        }
    })();
  