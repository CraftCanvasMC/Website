import type { Paragraph, PhrasingContent, Root } from "mdast";
import type { ContainerDirective } from "mdast-util-directive";
import { visit } from "unist-util-visit";

const CALLOUTS: Record<string, string> = {
  note: "Note",
  info: "Info",
  tip: "Tip",
  warning: "Warning",
  danger: "Danger",
  severe: "Important",
};

export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, (node, index, parent) => {
      if (node.type === "containerDirective") {
        const directive = node as ContainerDirective;
        const defaultTitle = CALLOUTS[directive.name];
        if (!defaultTitle) return;

        let title: PhrasingContent[] = [{ type: "text", value: defaultTitle }];
        const first = directive.children[0];
        if (first?.type === "paragraph" && first.data?.directiveLabel) {
          title = first.children;
          directive.children.shift();
        }

        const heading: Paragraph = {
          type: "paragraph",
          data: { hProperties: { className: ["callout__title"] } },
          children: title,
        };
        directive.children.unshift(heading);
        directive.data = {
          hName: "aside",
          hProperties: {
            className: ["callout", `callout--${directive.name}`],
            role: "note",
          },
        };
        return;
      }

      if (
        (node.type === "textDirective" || node.type === "leafDirective") &&
        parent &&
        index !== undefined
      ) {
        const prefix = node.type === "textDirective" ? ":" : "::";
        const text: PhrasingContent = {
          type: "text",
          value: `${prefix}${node.name}`,
        };
        const replacement =
          node.type === "textDirective"
            ? [text, ...node.children]
            : [{ type: "paragraph", children: [text, ...node.children] }];
        parent.children.splice(index, 1, ...(replacement as never[]));
        return index + replacement.length;
      }
    });
  };
}
