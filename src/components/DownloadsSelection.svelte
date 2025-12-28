<script lang="ts">
  import { t } from '../lib/i18n';
</script>

<section class="max-w-5xl mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <a href="/downloads/canvas" class="border border-neutral-800 rounded-lg p-6 hover:scale-[1.01] transition-transform bg-neutral-900/30">
      <div class="flex items-start gap-4">
        <div class="w-26 h-26 flex items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Canvas logo" class="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 class="font-semibold">{$t('downloads.products.canvas.title')}</h3>
          <p class="text-sm text-neutral-400 mt-2">{$t('downloads.products.canvas.description')}</p>
        </div>
      </div>
    </a>

    <a href="/downloads/horizon" class="border border-neutral-800 rounded-lg p-6 hover:scale-[1.01] transition-transform bg-neutral-900/30">
      <div class="flex items-start gap-4">
        <div class="w-26 h-26 flex items-center justify-center overflow-hidden">
          <img src="/logo_horizon.png" alt="Horizon logo" class="w-14 h-14 object-contain" />
        </div>
        <div>
          <h3 class="font-semibold">{$t('downloads.products.horizon.title')}</h3>
          <p class="text-sm text-neutral-400 mt-2">{$t('downloads.products.horizon.description')}</p>
        </div>
      </div>
    </a>
  </div>
</section>

<style>
</style>
