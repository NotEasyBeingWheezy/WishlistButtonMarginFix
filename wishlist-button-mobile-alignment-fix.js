(function () {
  'use strict';

  // Only act on pages that have a product form
  if (!document.querySelector('[data-cart-item-add]')) return;

  /*
   * Wishlist Button Mobile Alignment Fix
   *
   * On mobile viewports (< 1200px) the Add to Cart and Wish List buttons stack
   * vertically and should both be full-width with identical left alignment.
   * An unwanted margin-left on the Wish List form and/or margin-right on the
   * Add to Cart wrapper causes the Wish List button to appear narrower and
   * shifted to the right relative to the Add to Cart button.
   *
   * Root cause: At the mobile breakpoint the theme CSS sets no margin-left on
   * [data-wishlist-add] — it should be 0. However a conflicting rule (either
   * from the theme cascade or from another script) applies a margin-left that
   * offsets the button to the right.
   *
   * Fix: Inject a @media (max-width: 1199px) style block that explicitly resets
   * margin-right on the Add to Cart wrapper and margin-left on the Wish List
   * form to 0 using !important. This takes precedence over any conflicting rule
   * regardless of its source (theme stylesheet or injected script), because:
   *   - !important in an author stylesheet beats normal-priority rules
   *   - When two !important rules share equal specificity, the one appearing
   *     later in source order wins — this style tag is appended to <head> and
   *     will therefore follow any earlier conflicting style tag
   *
   * Breakpoint 1199px matches the theme's own boundary: at max-width 1199px the
   * theme already stacks the buttons via float + width: calc(100% - 40px);
   * at min-width 1200px the side-by-side layout with margin-left: 10px applies.
   */
  var style = document.createElement('style');
  style.id = 'wishlist-margin-fix-mobile';
  style.textContent = [
    '@media (max-width: 1199px) {',
    '  #add-to-cart-wrapper .form-action {',
    '    margin-right: 0 !important;',
    '  }',
    '  .productView-options [data-wishlist-add] {',
    '    margin-left: 0 !important;',
    '  }',
    '}'
  ].join('\n');
  document.head.appendChild(style);
}());
