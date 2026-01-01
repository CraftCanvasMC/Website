<script lang="ts">
  import { t } from '../lib/i18n';
  import { hoverScale } from '../lib/animations';
</script>

<section class="max-w-5xl mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <a href="/downloads/canvas" use:hoverScale={'small'} class="group border border-neutral-800 rounded-lg p-6 transition-all duration-300 bg-neutral-900/30 hover:shadow-lg hover:border-neutral-700">
      <div class="flex items-start gap-4">
        <div class="w-26 h-26 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img src="/logo.png" alt="Canvas logo" class="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 class="font-semibold transition-colors duration-200 group-hover:text-white">{$t('downloads.products.canvas.title')}</h3>
          <p class="text-sm text-neutral-400 mt-2 transition-colors duration-200 group-hover:text-neutral-300">{$t('downloads.products.canvas.description')}</p>
        </div>
      </div>
    </a>

    <a href="/downloads/horizon" use:hoverScale={'small'} class="group border border-neutral-800 rounded-lg p-6 transition-all duration-300 bg-neutral-900/30 hover:shadow-lg hover:border-neutral-700">
      <div class="flex items-start gap-4">
        <div class="w-26 h-26 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
          <img src="/logo_horizon.png" alt="Horizon logo" class="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 class="font-semibold transition-colors duration-200 group-hover:text-white">{$t('downloads.products.horizon.title')}</h3>
          <p class="text-sm text-neutral-400 mt-2 transition-colors duration-200 group-hover:text-neutral-300">{$t('downloads.products.horizon.description')}</p>
        </div>
      </div>
    </a>
  </div>
</section>

<style>
</style>
