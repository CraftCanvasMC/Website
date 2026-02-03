<script lang="ts">
  import DownloadsPageWrapper from './DownloadsPageWrapper.svelte';
  import Redirecting from './Redirecting.svelte';
  interface Props { job?: string; hideSculptor?: boolean }

  let { job, hideSculptor = false }: Props = $props();

  let redirecting = $state(false);
</script>

<DownloadsPageWrapper bind:redirecting job={job} {hideSculptor} />
<Redirecting bind:show={redirecting} target="Javadocs" />
