<?php
/**
 * Plugin Name: FL Learn More
 * Text Domain: fl-learn-more
 */

defined( 'ABSPATH' ) || exit;

class FL_Learn_More
{
    public function __construct()
    {
        add_action( 'init', [$this, 'registerBlock'] );
    }

    public function registerBlock()
    {
        if ( ! function_exists( 'register_block_type' ) ) {
            return;
        }

        register_block_type( __DIR__ );
    }
}

new FL_Learn_More;