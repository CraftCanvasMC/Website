<script lang="ts">
  import { t } from "@/lib/i18n";
  import { getStatusColor } from "@/lib/statusColor";

  interface Props {
    result?: string;
    channel?: string;
  }

  let { result, channel = "stable" }: Props = $props();

  const color = $derived(getStatusColor(result, channel));

  const label = $derived.by(() => {
    if (result === "FAILURE") return $t("common.failed");
    if (result === "ABORTED") return $t("common.cancelled");
    if (channel === "alpha") return $t("downloads.alpha");
    if (channel === "beta") return $t("downloads.beta");
    if (channel === "experimental") return $t("downloads.experimental");
    return $t("downloads.stable")
  });

  const badgeClass = $derived.by(() => {
    if (color === "red") return "bg-red-500/20 text-red-400";
    if (color === "gray") return "bg-gray-500/20 text-gray-400";
    if (color === "yellow") return "bg-yellow-500/20 text-yellow-400";
    return "bg-blue-500/20 text-blue-400";
  });
</script>

{#if label}
  <span class="rounded-full px-2 py-0.5 text-xs font-semibold {badgeClass}"
  >{label}</span
  >
{/if}
