/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import '../editor.scss';

/**
 * Edit component
 * @param {Object} props
 * @return {Element} Element to render.
 */
export default function Controls( {
	blockSelected,
	search,
	setSearch,
	limit,
	setLimit,
} ) {
	if ( ! blockSelected ) {
		return null;
	}

    /**
     * !NOTE These could be migrated to use Popover API if needed.
     */
	return (
		<div className="editor-posts-grid-controls">
			<div className="editor-posts-grid-controls__search">
				<label
					className="editor-posts-grid-controls__label"
					htmlFor="search"
				>
					{ __( 'Search posts', 'posts-grid-test' ) }
				</label>
				<input
					className="editor-posts-grid-controls__input"
					type="text"
					value={ search }
					onChange={ ( event ) => setSearch( event.target.value ) }
					placeholder={ __( 'Search posts...', 'posts-grid-test' ) }
				/>
			</div>
			<div className="editor-posts-grid-controls__limit">
				<label
					className="editor-posts-grid-controls__label"
					htmlFor="limit"
				>
					{ __( 'Limit', 'posts-grid-test' ) }
				</label>
				<select
					className="editor-posts-grid-controls__input"
					value={ limit }
					onChange={ ( event ) => setLimit( event.target.value ) }
				>
					<option value="3">3</option>
					<option value="9">9</option>
					<option value="12">12</option>
					<option value="15">15</option>
				</select>
			</div>
		</div>
	);
}
