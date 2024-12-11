<?php

/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * Template file will be wrapped with `template-main` block.
 * It is used to keep the same structure for all templates and to avoid code duplication.
 * CSS classes can be passed in WordPress HTML -template which will be added to content area.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$sanitized_attributes = wp_kses_data(
    get_block_wrapper_attributes(
        array(
            'class' => 'posts-grid',
        )
    )
);

$selected_posts = $attributes['selectedPosts'];

$query = new WP_Query(array(
    'post_type' => 'post',
    'orderby' => 'date',
    'post__in' => $selected_posts,
));

?>
<?php if ($query->have_posts()) : ?>
    <ul <?php echo $sanitized_attributes; ?>>
        <?php if (count($selected_posts) === 0) : ?>
            <li>
                <p><?php _e('No posts selected', 'posts-grid-test'); ?></p>
            </li>
        <?php endif; ?>

        <?php if (count($selected_posts) > 0) : ?>
            <?php while ($query->have_posts()) : $query->the_post(); ?>
                <li>
                    <article class="posts-grid-item" data-url="<?php the_permalink(); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <img class="posts-grid-item__image" src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'large'); ?>" alt="<?php the_title(); ?>">
                        <?php else: ?>
                            <img class="posts-grid-item__image" src="<?php echo plugin_dir_url(__DIR__) . 'public/placeholder.png'; ?>" alt="<?php the_title(); ?>">
                        <?php endif; ?>
                        <h3 class="posts-grid-item__title"><?php the_title(); ?></h3>
                        <time class="posts-grid-item__date" datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                        <ul class="posts-grid-item__categories">
                            <?php foreach (get_the_category() as $cat): ?>
                                <li>
                                    <a href="<?php echo get_category_link($cat->term_id); ?>">
                                        <?php echo $cat->name; ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <div class="posts-grid-item__button">
                            <a class="posts-grid-item__link" href="<?php the_permalink(); ?>" class="button">
                                <span><?php _e('Read more', 'posts-grid-test'); ?></span>
                                <svg class="posts-grid-item__arrow" width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.46145 9.00001L0.845703 2.40001L2.73554 0.514679L11.2411 9.00001L2.73554 17.4853L0.845703 15.6L7.46145 9.00001Z" fill="var(--_button-text-color)" />
                                </svg>
                            </a>
                        </div>
                    </article>
                </li>
            <?php endwhile; ?>
        <?php endif; ?>
    </ul>
<?php endif; ?>