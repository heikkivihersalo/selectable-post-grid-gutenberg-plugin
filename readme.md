# Posts Grid Test

## Description

This is a concept of an block with a grid of posts. 

## Few notes

1. A lot of the styles are inherited from the `theme.json`, so the look will depend on the theme. For example font size and font family can make the look drastically different. Further testing can be done to make sure the block looks good with different themes.

2. Amount of columns is designed to scale with the screen and container width. One item will always have minimum width of 420px, and the rest will scale with the screen. This could be moved to a setting if desired.

3. Depending on the desired behaviour, there are things that can be done differently. For example I guess the tutorial approach would have been choosing the posts from the `InspectorControls` but my approach uses customized UI to select the posts from the block itself. Filter controls could also be moved to use the Popover API if it desired to have controls move with the user flow.

4. There are editor styling improvements that can be made if desired. For example custom checkbox styles could be cool addition.

## Installation

1. Upload the plugin files to the `/wp-content/plugins/posts-grid-test` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress
