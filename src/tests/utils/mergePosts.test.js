import { mergePosts } from '../../utils/lib/mergePosts';
import { describe, expect, it } from 'vitest'; // <-- **

describe( '#mergePosts', () => {
	const posts = [ 1, 2, 3 ];
	const selectedPosts = [ 4, 5, 6 ];
	const filter = { search: '' };

	it( 'should return selected posts first when no search query is provided', () => {
		const result = mergePosts( { posts, selectedPosts, filter } );
		expect( result ).toEqual( [ 4, 5, 6, 1, 2, 3 ] );
	} );

	it( 'should return selected posts last when search query is provided', () => {
		const result = mergePosts( {
			posts,
			selectedPosts,
			filter: { search: 'query' },
		} );
		expect( result ).toEqual( [ 1, 2, 3, 4, 5, 6 ] );
	} );

	it( 'should return only posts when no selected posts are provided', () => {
		const result = mergePosts( { posts, selectedPosts: [], filter } );
		expect( result ).toEqual( [ 1, 2, 3 ] );
	} );

	it( 'should return only selected posts when no posts are provided', () => {
		const result = mergePosts( { posts: [], selectedPosts, filter } );
		expect( result ).toEqual( [ 4, 5, 6 ] );
	} );
} );
