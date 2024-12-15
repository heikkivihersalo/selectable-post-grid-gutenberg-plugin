/**
 * Dependencies
 */
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

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
            refetch: vi.fn(),
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
            refetch: vi.fn(),
        } );

		render( <Edit { ...props } /> );
		expect( screen.getByTestId( 'posts-grid-loader' ) ).toBeInTheDocument();
	} );

	it( 'should render no posts found message', () => {
		mocksData.usePosts.mockReturnValue( {
            data: [],
            isLoading: false,
            refetch: vi.fn(),
        } );

		render( <Edit { ...props } /> );
		expect(
			screen.getByTestId( 'posts-grid-no-posts' )
		).toBeInTheDocument();
	} );

    it( 'should render posts', () => {
        mocksData.usePosts.mockReturnValue( {
            data: [
                {
                    id: 1,
                    title: { rendered: 'Post 1' },
                    metadata: {
                        featured_image: {
                            url: '',
                            alt: '',
                            width: '',
                            height: '',
                            title: '',
                        },
                        categories: [],
                    },
                    date: '2021-01-01T00:00:00',
                },
            ],
            isLoading: false,
            refetch: vi.fn(),
        } );

        render( <Edit { ...props } /> );
        expect( screen.getByText( 'Post 1' ) ).toBeInTheDocument();
    } );
} );
