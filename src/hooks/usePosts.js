/**
 * External Dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Hook to get posts
 * @param {number} perPage Number of posts to return per page
 * @param {string} search Search query
 * @param {Array} selected Selected posts
 * @return {Object} { data, isLoading, refetch }
 */
function usePosts( {
	limit = 3,
	search = '',
	selected = [],
	blockSelected = true,
} ) {
	/**
	 * Handle the posts data fetching
	 */
	const { posts, selectedPosts, hasResolved } = useSelect(
		( select ) => {
			const isFull = limit - selected.length <= 0; // Check if current grid is full

			const query = {
				per_page: isFull ? 1 : limit - selected.length, // Make sure that we always fetch at least one post
				search,
				exclude: selected,
			};

			const selectedPosts =
				select( 'core' ).getEntityRecords( 'postType', 'post', {
					include: selected,
				} ) || [];

			const posts =
				select( 'core' ).getEntityRecords(
					'postType',
					'post',
					query
				) || [];

			const hasResolved = select( 'core' ).hasFinishedResolution(
				'getEntityRecords',
				[ 'postType', 'post', query ]
			);

			if ( blockSelected ) {
				return {
					// Return all posts if grid is not full or search query is not empty
					posts: ! isFull || search !== '' ? posts : [],
					// Always return selected posts
					selectedPosts,
					// This can be used to show a loading indicator
					hasResolved,
				};
			}

			// If block is not selected only return selected posts
			return {
				posts: [],
				selectedPosts,
				hasResolved,
			};
		},
		[ limit, search, blockSelected ]
	);

	/**
	 * Handle force updates on data if needed
	 */
	const { invalidateResolution } = useDispatch( 'core/data' );

	const refetch = () => {
		invalidateResolution( 'core', 'getEntityRecords', [
			'postType',
			'post',
		] );
	};

	/**
	 * Return the data
	 */
	return {
		data: [ ...selectedPosts, ...posts ], // Merge selected posts with rest of the posts
		isLoading: ! hasResolved,
		refetch,
	};
}

export { usePosts };
