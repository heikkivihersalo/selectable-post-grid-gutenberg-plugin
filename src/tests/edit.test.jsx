import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { POSTS } from './__mocks__/posts';
import Edit from '../edit';

const mocksData = vi.hoisted( () => {
	return {
		usePosts: vi.fn(),
	};
} );

vi.mock( '../hooks/usePosts', () => mocksData );

const props = {
	attributes: { selectedPosts: [] },
	setAttributes: vi.fn(),
	isSelected: false,
};

describe( '#edit', () => {
	beforeEach( () => {
		// This is the default mock for the useSelect hook
		mocksData.usePosts.mockReturnValue( {
            data: [],
            isLoading: false,
        } );
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

	it( 'should render the edit component', () => {
		render( <Edit { ...props } /> );
		expect( screen.getByTestId( 'posts-grid-list' ) ).toBeInTheDocument();
	} );

	it( 'should render the edit component with loader', () => {
		mocksData.usePosts.mockReturnValue( {
            data: [],
            isLoading: true,
        } );

		render( <Edit { ...props } /> );
		expect( screen.getByTestId( 'posts-grid-loader' ) ).toBeInTheDocument();
	} );

	it( 'should render no posts found message', () => {
		mocksData.usePosts.mockReturnValue( {
            data: [],
            isLoading: false,
        } );

		render( <Edit { ...props } /> );
		expect(
			screen.getByTestId( 'posts-grid-no-posts' )
		).toBeInTheDocument();
	} );

    it( 'should render posts', () => {
        mocksData.usePosts.mockReturnValue( {
            data: POSTS,
            isLoading: false,
        } );

        render( <Edit { ...props } /> );
        expect( screen.getByText( 'Post 1' ) ).toBeInTheDocument();
    } );
} );

describe( '#handleSelect', () => {
    beforeEach( () => {
		// This is the default mock for the useSelect hook
        mocksData.usePosts.mockReturnValue( {
            data: POSTS,
            isLoading: false,
        } );
	} );

	afterEach( () => {
		vi.restoreAllMocks();
	} );

    it('should add post to selected posts', () => {
        const setAttributes = vi.fn();
        render(<Edit {...{
            attributes: { selectedPosts: [] },
            setAttributes,
            isSelected: true,
        }} />);

        const selectCheckbox = screen.getAllByTestId('posts-grid-item-select-button')[0];
        selectCheckbox.click();

        expect(setAttributes).toHaveBeenCalledWith({
            selectedPosts: [1]
        });
    });

    it('should remove post from selected posts', () => {
        const setAttributes = vi.fn();
        render(<Edit {...{
            attributes: { selectedPosts: [1,2] },
            setAttributes,
            isSelected: true,
        }} />);

        const selectCheckbox = screen.getAllByTestId('posts-grid-item-select-button')[0];
        selectCheckbox.click();

        expect(setAttributes).toHaveBeenCalledWith({
            selectedPosts: [2]
        });
    });
});
