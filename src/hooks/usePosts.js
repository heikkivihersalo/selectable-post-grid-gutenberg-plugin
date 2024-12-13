/**
 * External Dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { getPosts, getSelectedPosts, mergePosts } from '../utils';

/**
 * Hook to get posts
 * @param {number} perPage Number of posts to return per page
 * @param {string} search Search query
 * @param {Array} selected Selected posts
 * @return {Object} { data, isLoading, refetch }
 */
export function usePosts( {
	limit = 3,
	search = '',
	selected = [],
	blockSelected = true,
} ) {
	/**
	 * Handle the data fetching
	 */
	const { posts, selectedPosts, hasResolved } = useSelect(
		( select ) => {
			const { data: posts, hasResolved: postsHasResolved } = getPosts( {
				selectCallbackFn: select,
				selectedPosts: selected,
				filter: { limit, search },
			} );

			const {
				data: selectedPosts,
				hasResolved: selectedPostsHasResolved,
			} = getSelectedPosts( {
				selectCallbackFn: select,
				selectedPosts: selected,
			} );

			// Handle the block selected state
			if ( blockSelected ) {
				return {
					// To avoid showing too much posts in the grid, we'll only show the selected posts if the grid is full
					posts:
						limit - selectedPosts.length > 0 ||
						search !== ''
							? posts
							: [],
					// Always return selected posts
					selectedPosts,
					// This can be used to show a loading indicator
					hasResolved: selectedPostsHasResolved && postsHasResolved,
				};
			}

			// If block is not selected only return selected posts
			return {
				posts: [],
				selectedPosts,
				hasResolved: selectedPostsHasResolved && postsHasResolved,
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
		data: mergePosts( { posts, selectedPosts, filter: { search, limit } } ),
		isLoading: ! hasResolved,
		refetch,
	};
}
