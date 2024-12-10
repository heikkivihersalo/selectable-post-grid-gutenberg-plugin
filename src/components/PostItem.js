/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
/**
 * Internal dependencies
 */
import placeholder from '../../public/placeholder.png';

import '../editor.scss';

/**
 * PostItem component
 * @param {Object} props
 * @param {Object} props.post
 * @param {boolean} props.selected
 * @param {Function} props.selectCallback
 * @return {Element} Element to render.
 */
export default function PostItem( { post, selected, selectCallback } ) {
	const [ isSelected, setIsSelected ] = useState( selected );

	const {
		title: { rendered: title },
		metadata: { featured_image: image, categories },
		date,
	} = post;

	const formatDateString = ( ISODate ) => {
		const date = new Date( ISODate );
		return `${ date.getDate() }.${
			date.getMonth() + 1
		}.${ date.getFullYear() }`;
	};

	useEffect( () => {
		setIsSelected( selected );

		return () => {
			setIsSelected( false );
		};
	}, [ selected ] );

	return (
		<li>
			<article className="posts-grid-item">
				{ image.url !== '' ? (
					<img
						className="posts-grid-item__image"
						src={ image.url }
						alt={ image.alt }
						width={ image.width }
						height={ image.height }
						title={ image.title }
					/>
				) : (
					<img
						className="posts-grid-item__image"
						src={ placeholder }
						alt="Placeholder"
					/>
				) }
				<h3 className="posts-grid-item__title">{ title }</h3>
				<time className="posts-grid-item__date" dateTime={ date }>
					{ formatDateString( date ) }
				</time>
				<ul className="posts-grid-item__categories">
					{ categories.map( ( category ) => (
						<li key={ category.id }>
							<span>{ category.name }</span>
						</li>
					) ) }
				</ul>
				<div className="posts-grid-item__button">
					<span className="posts-grid-item__link">
						<span>{ __( 'Read more', 'posts-grid-test' ) }</span>
						<svg
							className="posts-grid-item__arrow"
							width="12"
							height="18"
							viewBox="0 0 12 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.46145 9.00001L0.845703 2.40001L2.73554 0.514679L11.2411 9.00001L2.73554 17.4853L0.845703 15.6L7.46145 9.00001Z"
								fill="var(--_button-text-color)"
							/>
						</svg>
					</span>
				</div>
				<label
					className="posts-grid-item__select-wrapper"
					data-selected={ selected }
				>
					<span className="posts-grid-item__select-label">
						{ __( 'Select post', 'posts-grid-test' ) }
					</span>
					<input
						type="checkbox"
						className="posts-grid-item__select-input"
						checked={ isSelected }
						onChange={ ( event ) =>
							selectCallback( event, post.id )
						}
					/>
				</label>
			</article>
		</li>
	);
}
