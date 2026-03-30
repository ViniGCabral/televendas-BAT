import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "inverse-surface": "#2e3034",
                "on-tertiary-container": "#fffbff",
                "tertiary": "#bc000a",
                "surface-variant": "#e2e2e7",
                "primary-fixed": "#d8e2ff",
                "on-error-container": "#93000a",
                "on-secondary-container": "#536d00",
                "primary-fixed-dim": "#adc6ff",
                "on-error": "#ffffff",
                "surface-container-low": "#f3f3f8",
                "secondary-fixed-dim": "#aad630",
                "secondary-fixed": "#c6f34c",
                "on-secondary": "#ffffff",
                "on-surface-variant": "#414755",
                "background": "#f9f9fe",
                "secondary": "#4e6700",
                "on-surface": "#1a1c1f",
                "tertiary-fixed-dim": "#ffb4aa",
                "surface-tint": "#005bc1",
                "on-tertiary": "#ffffff",
                "on-primary-container": "#fefcff",
                "primary-container": "#0070eb",
                "outline-variant": "#c1c6d7",
                "on-primary-fixed": "#001a41",
                "on-primary": "#ffffff",
                "on-secondary-fixed-variant": "#3a4d00",
                "primary": "#0058bc",
                "tertiary-fixed": "#ffdad5",
                "inverse-on-surface": "#f0f0f5",
                "surface-container-high": "#e8e8ed",
                "on-tertiary-fixed-variant": "#930005",
                "surface-container-highest": "#e2e2e7",
                "on-primary-fixed-variant": "#004493",
                "surface": "#f9f9fe",
                "error-container": "#ffdad6",
                "error": "#ba1a1a",
                "surface-container": "#ededf2",
                "on-tertiary-fixed": "#410001",
                "outline": "#717786",
                "inverse-primary": "#adc6ff",
                "on-background": "#1a1c1f",
                "tertiary-container": "#e2241f",
                "surface-container-lowest": "#ffffff",
                "surface-bright": "#f9f9fe",
                "secondary-container": "#c6f34c",
                "surface-dim": "#d9dade",
                "on-secondary-fixed": "#151f00"
            },
            fontFamily: {
                "headline": ["Manrope"],
                "body": ["Inter"],
                "label": ["Inter"]
            },
            borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "2xl": "1rem", "full": "9999px" },
        },
    },
    plugins: [
        forms,
        containerQueries
    ],
}
