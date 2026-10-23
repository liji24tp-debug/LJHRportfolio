;(function(){function isSamePageAnchor(e) {
    const target = e.target;
    const anchor = target && target.closest && target.closest('a[data-anchor], a[data-popupid], a[href*="#"]');
    if (!anchor || anchor.getAttribute('target') === '_blank') {
        return false;
    }
    const href = anchor.getAttribute('href');
    if (href === null) {
        return false;
    }
    if (href === '') {
        return true;
    }
    if (!anchor.hasAttribute('data-anchor') && !anchor.hasAttribute('data-popupid') && href.charAt(0) === '#' && href !== '#' && href !== '#SCROLL_TO_TOP' && href !== '#SCROLL_TO_BOTTOM') {
        return false;
    }
    try {
        const url = new URL(href, location.href);
        return url.origin === location.origin && url.pathname === location.pathname;
    } catch (_) {
        return false;
    }
};function isClickedTreeHydrated(e) {
    const target = e.target;
    let node = target && target.closest && target.closest('a[data-anchor], a[data-popupid], a[href*="#"]');
    while(node){
        const keys = Object.keys(node);
        for(let i = 0; i < keys.length; i++){
            if (keys[i].indexOf('__reactFiber$') === 0 || keys[i].indexOf('__reactInternalInstance$') === 0) {
                return true;
            }
        }
        let sibling = node.previousSibling;
        let depth = 0;
        while(sibling){
            if (sibling.nodeType === 8) {
                const data = sibling.data;
                if (data === '/$') {
                    depth++;
                } else if (data.charAt(0) === '$') {
                    if (depth === 0) {
                        return false;
                    }
                    depth--;
                }
            }
            sibling = sibling.previousSibling;
        }
        node = node.parentElement;
    }
    return false;
};var guard=(function preventSamePageAnchorReloadBeforeHydration(e) {
    if (e.metaKey || e.ctrlKey) {
        return;
    }
    if (!isSamePageAnchor(e)) {
        return;
    }
    const serviceable = preventSamePageAnchorReloadBeforeHydration.linkClickReady === true && isClickedTreeHydrated(e);
    if (!serviceable) {
        e.preventDefault();
    }
});guard.linkClickReady=false;window.__tbAnchorGuard=guard;document.addEventListener('click',guard,true)})();