
			const wixAdsOffsetHeight = document.querySelector(':is(.WIX_ADS, #WIX_ADS)')?.offsetHeight || 0;
			const header = document.getElementsByTagName('header')[0];

			let headerOffsetHeight = 0;

			if (header) {
				const headerPosition = window.getComputedStyle(header).getPropertyValue('position').toLowerCase();
				const isHeaderStickyOrFixed = headerPosition === 'sticky' || headerPosition === 'fixed';
				headerOffsetHeight = isHeaderStickyOrFixed ? header.offsetHeight : 0;
			}

			document.documentElement.style.scrollPaddingTop = `${wixAdsOffsetHeight + headerOffsetHeight}px`;
        