/**
 * Get posts
 * @param {Object} options
 * @param {Function} options.selectFn Select function
 * @param {Array} options.selectedPosts Selected post ids
 * @param {Object} options.filter Filter options
 * @param {number} options.filter.limit Number of posts to return
 * @param {string} options.filter.search Search query
 * @return {Object} { data, hasResolved }
 */
export function getPosts( { selectCallbackFn, selectedPosts, filter } ) {
	const { limit, search } = filter;

	const query = generateQuery( { limit, search, selectedPosts } );

	const posts =
		selectCallbackFn( 'core' ).getEntityRecords(
			'postType',
			'post',
			query
		) || [];

	const hasResolved = selectCallbackFn( 'core' ).hasFinishedResolution(
		'getEntityRecords',
		[ 'postType', 'post', query ]
	);

	return {
		data: posts || [],
		hasResolved,
	};
}

/**
 * Generate query
 * @param {Object} options
 * @param {number} options.limit Number of posts to return
 * @param {string} options.search Search query
 * @param {Array} options.selectedPosts Selected post ids
 * @return {Object} Query object
 */
export function generateQuery( { limit, search, selectedPosts } ) {
    const query = {
        per_page:
            limit - selectedPosts.length <= 0
                ? 1 // Make sure that we always fetch at least one post
                : limit - selectedPosts.length, // Fetch the remaining posts if above condition is not met
        search,
        exclude: selectedPosts,
    };

    return query;
}
