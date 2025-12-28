<script lang="ts">
  import DownloadsPageWrapper from './DownloadsPageWrapper.svelte';
  import Redirecting from './Redirecting.svelte';
  interface Props { job?: string }

  let { job }: Props = $props();

  let redirecting = $state(false);
</script>

<DownloadsPageWrapper bind:redirecting job={job} />
<Redirecting bind:show={redirecting} target="Javadocs" />
