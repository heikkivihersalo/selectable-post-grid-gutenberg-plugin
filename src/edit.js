/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { usePosts } from './hooks/usePosts';
import PostItem from './components/PostItem';
import './editor.scss';

/**
 * Edit component
 * @param {Object} props
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { selectedPosts } = attributes;
	const posts = usePosts();

	const handleSelect = ( event, id ) => {
		event.preventDefault();

		setAttributes( {
			selectedPosts: selectedPosts.includes( id )
				? selectedPosts.filter( ( postId ) => postId !== id )
				: [ ...selectedPosts, id ],
		} );
	};

	return (
		<div { ...useBlockProps( { className: 'posts-grid' } ) }>
			{ posts.map( ( post ) => (
				<PostItem
					key={ post.id }
					post={ post }
					selected={ selectedPosts.includes( post.id ) }
					selectCallback={ handleSelect }
				/>
			) ) }
		</div>
	);
}
