/**
 * External Dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Hook to get posts
 * @param {number} perPage Number of posts to return per page
 * @return {Array}
 *
 */
const usePosts = () => {
	return useSelect( ( select ) => {
		const data = select( 'core' ).getEntityRecords( 'postType', 'post' );
		return data || [];
	} );
};

export { usePosts };
