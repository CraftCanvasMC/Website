export type StatusColor = "red" | "gray" | "yellow" | "blue" | "neutral";

export function getStatusColor(
  result?: string,
  channelName = "stable"
): StatusColor {
  if (result === "FAILURE") return "red";
  if (result === "ABORTED") return "gray";
  if (channelName === "alpha") return "red";
  if (channelName === "beta" || channelName === "experimental") return "yellow";
  return "blue";
}
