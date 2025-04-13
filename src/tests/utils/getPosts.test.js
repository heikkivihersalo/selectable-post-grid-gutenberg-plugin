import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPosts, generateQuery } from '../../utils/lib/getPosts';

const selectCallbackFn = vi.fn().mockImplementation( ( namespace ) => {
	return {
		getEntityRecords: vi.fn().mockReturnValue( [ 1, 2, 3 ] ),
		hasFinishedResolution: vi.fn().mockReturnValue( true ),
	};
} );

describe( '#getPosts', () => {
	afterEach( () => {
		vi.restoreAllMocks();
	} );

	it( 'should return posts', () => {
		const result = getPosts( {
			selectCallbackFn,
			selectedPosts: [ 1, 2, 3 ],
			filter: { limit: 10, search: '' },
		} );
		expect( result ).toEqual( { data: [ 1, 2, 3 ], hasResolved: true } );
	} );
} );

describe( '#generateQuery', () => {
	it( 'should return query object', () => {
		const result = generateQuery( {
			limit: 10,
			search: '',
			selectedPosts: [],
		} );
		expect( result ).toEqual( { per_page: 10, search: '', exclude: [] } );
	} );

	it( 'should remove selected posts count from per_page', () => {
		const result = generateQuery( {
			limit: 10,
			search: '',
			selectedPosts: [ 1, 2, 3 ],
		} );
		expect( result ).toEqual( {
			per_page: 7,
			search: '',
			exclude: [ 1, 2, 3 ],
		} );
	} );

	it( 'should return at least one post to prevent API errors', () => {
		const result = generateQuery( {
			limit: 3,
			search: '',
			selectedPosts: [ 1, 2, 3 ],
		} );
		expect( result ).toEqual( {
			per_page: 1,
			search: '',
			exclude: [ 1, 2, 3 ],
		} );
	} );

	it( 'should return search query', () => {
		const result = generateQuery( {
			limit: 10,
			search: 'query',
			selectedPosts: [],
		} );
		expect( result ).toEqual( {
			per_page: 10,
			search: 'query',
			exclude: [],
		} );
	} );
} );
