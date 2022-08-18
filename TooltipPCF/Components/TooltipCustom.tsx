import * as React from "react";
import {
  TooltipHost,
  ITooltipHostStyles,
  ThemeProvider,
  initializeIcons,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";
import { useId } from "@fluentui/react-hooks";
import { TooltipProps } from "./Component.Types";

// Initialize icons in case this example uses them
initializeIcons();

function getIconClass(props: Partial<TooltipProps>) {
  return mergeStyles({
    fontSize: props.fontSize,
    height: props.height,
    width: props.width,
    margin: props.margin,
    color: props.iconColor,
  });
}

export const TooltipCustom = React.memo((props: TooltipProps) => {
  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string and manually ensure uniqueness.)
  const tooltipId = useId(`tooltip ${Math.random()}`);
  const calloutProps = { gapSpace: 0 };
  // The TooltipHost root uses display: inline by default.
  // If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
  const hostStyles: Partial<ITooltipHostStyles> = {
    root: { display: "inline-block" },
  };

  return (
    <ThemeProvider>
      <TooltipHost
        content={props.content}
        // This id is used on the tooltip itself, not the host
        // (so an element with this id only exists when the tooltip is shown)
        id={tooltipId}
        calloutProps={calloutProps}
        styles={hostStyles}
      >
        <FontIcon
          aria-label="Compass"
          iconName={props.iconName}
          className={getIconClass(props)}
        />

        {/* <DefaultButton aria-describedby={tooltipId}>{props.text}</DefaultButton> */}
      </TooltipHost>
    </ThemeProvider>
  );
});

TooltipCustom.displayName = "Tooltip";
