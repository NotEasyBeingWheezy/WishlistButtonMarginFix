(function () {
  'use strict';

  // Only act on pages that have a product form
  if (!document.querySelector('[data-cart-item-add]')) return;

  /*
   * Wishlist Button Margin Fix
   *
   * Root cause: The .form-action CSS class is shared by the Add to Cart wrapper
   * div (#add-to-cart-wrapper .form-action) and the Wish List form
   * (.form-wishlist[data-wishlist-add]). Competing breakpoint rules in the theme
   * stylesheet set margin-right to 0 on .form-action when page interaction causes
   * a scrollbar to appear and the effective viewport width drops into the adjacent
   * breakpoint. This halves the gap between the two buttons.
   *
   * Specifically: the gap between the two buttons is composed of two parts —
   *   1. margin-right: 10px on #add-to-cart-wrapper .form-action
   *   2. margin-left:  10px on .productView-options [data-wishlist-add]
   *
   * When the user interacts with the product form (selecting size options,
   * toggling the personalisation "Initials" field, etc.), Stencil JS shows or
   * hides additional form fields. This can change the page's rendered height,
   * causing a vertical scrollbar to appear. The scrollbar reduces the effective
   * viewport width by ~17 px, which is enough to trigger the adjacent CSS
   * breakpoint where a competing .form-action rule sets margin-right: 0,
   * halving the visible gap from ~20 px down to ~10 px.
   *
   * Fix: Inject a <style> tag with !important overrides that lock both margins
   * regardless of which breakpoint rule the browser selects. An !important rule
   * in an author stylesheet outranks both lower-specificity cascade rules and
   * JavaScript-applied inline styles (which are normal-priority author rules).
   */
  var style = document.createElement('style');
  style.id = 'wishlist-margin-fix';
  style.textContent =
    '#add-to-cart-wrapper .form-action { margin-right: 10px !important; }' +
    '.productView-options [data-wishlist-add] { margin-left: 10px !important; }';
  document.head.appendChild(style);
}());
