/**
 * Merge selected posts with fetched posts
 * @param {Array} posts Fetched posts
 * @param {Array} selectedPosts Selected post ids
 * @param {Object} filter Filter options
 * @return {Array}
 */
export function mergePosts( { posts, selectedPosts, filter } ) {
	const { search } = filter;

	// If search query is empty, selected posts will be shown first
	if ( search === '' ) {
		return [ ...selectedPosts, ...posts ];
	}

	// If search query is not empty, selected posts will be shown last
	return [ ...posts, ...selectedPosts ];
}
