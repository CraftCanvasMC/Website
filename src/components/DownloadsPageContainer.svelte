<script lang="ts">
    import DownloadsPageWrapper from './DownloadsPageWrapper.svelte';
    import Redirecting from './Redirecting.svelte';
    interface Props { project: string; hideSculptor?: boolean }

    let { project, hideSculptor = false }: Props = $props();

    let redirecting = $state(false);
</script>

<DownloadsPageWrapper bind:redirecting project={project} {hideSculptor} />
<Redirecting bind:show={redirecting} target="Javadocs" />
