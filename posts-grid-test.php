<?php

/**
 * Plugin Name:       Posts Grid Test
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       posts-grid-test
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Get featured image metadata
 * @param mixed  $id
 * @param string $size
 * @return array
 */
function get_featured_image_meta(mixed $post_id, string $size = 'medium') {
	$id   = get_post_thumbnail_id($post_id);
	$meta = wp_get_attachment_image_src($id, $size);

	return array(
		'id'     => $id,
		'url'    => isset($meta[0]) ? $meta[0] : '',
		'width'  => isset($meta[1]) ? $meta[1] : '',
		'height' => isset($meta[2]) ? $meta[2] : '',
		'alt'    => get_post_meta($id, '_wp_attachment_image_alt', true),
		'title'  => get_the_title($id),
	);
}

/**
 * Add featured image to posts query
 * 
 * @return void
 */
function register_rest_images_for_posts() {
	register_rest_field(
		'post',
		'metadata',
		array(
			'get_callback' => function ($data) {
				$meta = get_post_meta($data['id'], '', '');
				$meta['featured_image'] = get_featured_image_meta($data['id'], 'full');
				$meta['categories'] = get_the_category($data['id']);
				return $meta;
			},
		)
	);
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_posts_grid_test_block_init() {
	register_block_type(__DIR__ . '/build');
}

add_action('rest_api_init', 'register_rest_images_for_posts');
add_action('init', 'create_block_posts_grid_test_block_init');
