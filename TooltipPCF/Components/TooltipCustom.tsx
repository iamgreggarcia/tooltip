import * as React from 'react';
import {
    TooltipHost,
    ITooltipHostStyles,
    ThemeProvider,
    createTheme,
    IPartialTheme,
    initializeIcons,
    FontIcon,
    mergeStyles,
} from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { TooltipProps } from './Component.Types';

// Initialize icons
initializeIcons();

function getIconClass(props: Partial<TooltipProps>) {
    const { iconSize, height, width, iconColor } = props;
    return mergeStyles({
        iconSize: iconSize,
        height: height,
        width: width,
        color: iconColor,
    });
}

export const TooltipCustom = React.memo((props: TooltipProps) => {
    const { content, iconName, themeJSON, ariaLabel } = props;
    // Use useId() to ensure that the ID is unique on the page.
    // (It's also okay to use a plain string and manually ensure uniqueness.)
    const tooltipId = useId(`tooltip ${Math.random()}`);
    const calloutProps = { gapSpace: 0 };
    // The TooltipHost root uses display: inline by default.
    // If that's causing sizing issues or tooltip positioning issues, try overriding to inline-block.
    const hostStyles: Partial<ITooltipHostStyles> = {
        root: { display: 'inline-block' },
    };

    const theme = React.useMemo(() => {
        try {
            return themeJSON ? createTheme(JSON.parse(themeJSON) as IPartialTheme) : undefined;
        } catch (ex) {
            /* istanbul ignore next */
            console.error('Cannot parse theme', ex);
        }
    }, [themeJSON]);

    return (
        <ThemeProvider theme={theme}>
            <TooltipHost
                content={content}
                // This id is used on the tooltip itself, not the host
                // (so an element with this id only exists when the tooltip is shown)
                id={tooltipId}
                calloutProps={calloutProps}
                styles={hostStyles}
            >
                <FontIcon aria-label={ariaLabel} iconName={iconName} className={getIconClass(props)} />

                {/* <DefaultButton aria-describedby={tooltipId}>{props.text}</DefaultButton> */}
            </TooltipHost>
        </ThemeProvider>
    );
});

TooltipCustom.displayName = 'Tooltip';
