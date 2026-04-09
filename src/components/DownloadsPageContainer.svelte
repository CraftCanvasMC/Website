<script lang="ts">
  import DownloadsPageWrapper from "./DownloadsPageWrapper.svelte";
  import type { Project } from "@/config/jenkins";
  interface Props {
    project: Project;
    hideSculptor?: boolean;
  }

  let { project, hideSculptor = false }: Props = $props();

  let redirecting = $state(false);
</script>

<DownloadsPageWrapper bind:redirecting {project} {hideSculptor} />
