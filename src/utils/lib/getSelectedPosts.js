/**
 * Get selected posts
 * @param {Object} options
 * @param {Function} options.select Select function
 * @param {Array} options.selected Selected post ids
 * @return {Object} { data, isResolved }
 */
export function getSelectedPosts( { selectCallbackFn, selectedPosts } ) {
	const posts = selectCallbackFn( 'core' ).getEntityRecords(
		'postType',
		'post',
		{
			include: selectedPosts,
		}
	);

	const hasResolved = selectCallbackFn( 'core' ).hasFinishedResolution(
		'getEntityRecords',
		[ 'postType', 'post', { include: selectedPosts } ]
	);

	return {
		data: posts || [],
		hasResolved,
	};
}
