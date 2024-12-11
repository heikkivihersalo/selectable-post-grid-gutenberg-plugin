/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { usePosts } from './hooks/usePosts';
import Controls from './components/Controls';
import PostItem from './components/PostItem';
import './editor.scss';

/**
 * Edit component
 * @param {Object} props
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { selectedPosts },
		setAttributes,
		isSelected: blockSelected,
	} = props;
	const [ limit, setLimit ] = useState( 3 );
	const [ search, setSearch ] = useState( '' );
	const { data, isLoading } = usePosts( {
		limit,
		search,
		selected: selectedPosts,
		blockSelected,
	} );

	const handleSelect = ( event, id ) => {
		event.preventDefault();

		setAttributes( {
			selectedPosts: selectedPosts.includes( id )
				? selectedPosts.filter( ( postId ) => postId !== id )
				: [ ...selectedPosts, id ],
		} );
	};

	return (
		<div { ...useBlockProps( { className: 'editor-posts-grid' } ) }>
			{ /**
			 * !NOTE There is little bit of prop drilling here, but it's fine for this example.
			 * Could be refactored to use context API or similar if needed and there
			 * is more components that need to access the same data.
			 */ }
			<Controls
				blockSelected={ blockSelected }
				search={ search }
				setSearch={ setSearch }
				limit={ limit }
				setLimit={ setLimit }
			/>
			{ isLoading && <p>{ __( 'Loading posts...' ) }</p> }

			{ /**
			 * Handle the empty and loading states
			 */ }
			{ ! isLoading && data.length === 0 && (
				<p>
					{ __(
						'No posts selected. Click here to select the posts to show.'
					) }
				</p>
			) }

			{ /**
			 * If everything is loaded and there are posts to show, render the posts grid.
			 */ }
			<div className="posts-grid">
				{ ! isLoading &&
					data.map( ( post ) => (
						<PostItem
							key={ post.id }
							post={ post }
							selected={ selectedPosts.includes( post.id ) }
							selectCallback={ handleSelect }
							showSelect={ blockSelected }
						/>
					) ) }
			</div>
		</div>
	);
}
