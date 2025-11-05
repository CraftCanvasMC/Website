<script lang="ts">
  import DownloadsPageWrapper from './DownloadsPageWrapper.svelte';
  import Redirecting from './Redirecting.svelte';

  let redirecting = $state(false);
</script>

<DownloadsPageWrapper bind:redirecting />
<Redirecting bind:show={redirecting} target="Javadocs" />
