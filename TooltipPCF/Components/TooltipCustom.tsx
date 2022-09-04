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

const defaultHeight = 50;
const defaultWidth = 50;
const defaultIconSize = 26;
const defaultIcon = 'Info';

// Initialize icons
initializeIcons();

export const TooltipCustom = React.memo((props: TooltipProps) => {
    const { content, themeJSON, ariaLabel } = props;
    const iconName = props.iconName ?? defaultIcon;
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
            </TooltipHost>
        </ThemeProvider>
    );
});

function getIconClass(props: Partial<TooltipProps>) {
    return mergeStyles({
        iconSize: props.iconSize ?? defaultIconSize,
        height: props.height ?? defaultHeight,
        width: props.width ?? defaultWidth,
        color: props.iconColor ?? 'black',
        backgroundColor: props.fillColor ?? 'transparent',
    });
}

TooltipCustom.displayName = 'Tooltip';
