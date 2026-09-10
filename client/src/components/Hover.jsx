import { useState } from 'react';

// Small helper that reproduces the design prototype's style-hover / style-focus
// attributes, which don't exist in plain React/CSS-in-JS.
export function Hover({ as: As = 'div', style, hoverStyle, focusStyle, children, ...props }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const merged = { ...style, ...(hovered ? hoverStyle : null), ...(focused ? focusStyle : null) };
  return (
    <As
      style={merged}
      onMouseEnter={(e) => { setHovered(true); props.onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); props.onMouseLeave?.(e); }}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e) => { setFocused(false); props.onBlur?.(e); }}
      {...props}
    >
      {children}
    </As>
  );
}
