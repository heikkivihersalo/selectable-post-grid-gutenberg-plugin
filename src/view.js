/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

/**
 * Handle user click on card
 * @return {void}
 */
domReady( function () {
	const cards = document.querySelectorAll( '.posts-grid-item' );

	cards.forEach( ( card ) => {
		card.addEventListener( 'click', () => {
			window.location.assign( card.dataset.url );
		} );
	} );
} );
