<script lang="ts">
  /**
   * @typedef Props
   * @prop {number} [sizeMultiplier] - The size multiplier for the icon | Default: `1`
   */

  /**
   * @type {Props}
   */
  let { sizeMultiplier = 1 } = $props();
  let size = (0.25 * sizeMultiplier).toFixed(2) + "rem";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  style="width: {size}; height: {size};"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
  />
</svg>
