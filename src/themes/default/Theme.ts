import {
  AppShell,
  Button,
  Radio,
  Select,
  Tabs,
  TextInput,
  Textarea,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
} from "@mantine/core";

export const brandColors = {
  headerBackground: "#0E1D3E",
};

export const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: [
      "#F1F7FE",
      "#E8F1FD",
      "#D1E3FA",
      "#A2C6F6",
      "#74AAF1",
      "#468EEC",
      "#1A73E8",
      "#135BB9",
      "#0E448B",
      "#092D5D",
      "#05172E",
      "#020B17",
    ],
    // primary: [
    //   "#fffdf5",
    //   "#fffbe8",
    //   "#fff4c7",
    //   "#ffeaa6",
    //   "#ffe188",
    //   "#ffd363",
    //   "#ffb521",
    //   "#e69b1c",
    //   "#bf7813",
    //   "#99570c",
    //   "#733b07",
    //   "#4a2203",
    // ],
  },
  fontFamily: "Public Sans, sans-serif",
  components: {
    Button: Button.extend({
      defaultProps: {
        fw: 400,
        size: "md",
        variant: "filled",
        style: { fontSize: 14, fontWeight: 500, borderRadius: 8 },
      },
    }),
    AppShell: AppShell.Main.extend({
      defaultProps: {
        bg: "white",
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: "md",
      },
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    NumberInput: TextInput.extend({
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Select: Select.extend({
      defaultProps: {
        allowDeselect: false,
        checkIconPosition: "right",
        comboboxProps: {
          shadow: "var(--mantine-shadow-sm)",
        },
      },
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Textarea: Textarea.extend({
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Radio: Radio.Group.extend({
      styles: {
        label: {
          marginBottom: 6,
        },
      },
    }),
    Tabs: Tabs.extend({
      classNames: {
        tab: "firmli-tab",
      },
    }),
  },
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });

    // Override some properties for variant
    // if (
    //   parsedColor.isThemeColor &&
    //   parsedColor.color === "primary" &&
    //   input.variant === "filled"
    // ) {
    //   return {
    //     ...defaultResolvedColors,
    //     color: "var(--mantine-color-black)",
    //     hoverColor: "var(--mantine-color-black)",
    //   };
    // }

    // Completely override variant
    // if (input.variant === "light") {
    //   return {
    //     background: rgba(parsedColor.value, 0.1),
    //     hover: rgba(parsedColor.value, 0.15),
    //     border: `${rem(1)} solid ${parsedColor.value}`,
    //     color: "var(--mantine-color-primary-8)",
    //   };
    // }

    // Add new variants support
    if (input.variant === "danger") {
      return {
        background: "var(--mantine-color-red-9)",
        hover: "var(--mantine-color-red-8)",
        color: "var(--mantine-color-white)",
        border: "none",
      };
    }

    if (input.variant === "secondary") {
      return {
        background: "var(--mantine-color-white)",
        hover: "rgba(252, 252, 252, 1)",
        color: "var(--mantine-color-black)",
        border: "1px solid #D2D2D2",
      };
    }

    if (input.variant === "tertiary") {
      return {
        background: "var(--mantine-color-white)",
        hover: "var(--mantine-color-primary-6)",
        color: "var(--mantine-color-black)",
        hoverColor: "var(--mantine-color-white)",
        border: "1px solid #F2F2F2",
      };
    }

    return defaultResolvedColors;
  },
});

export const tableTheme = {
  table: {
    fontFamily: "inherit",
    backgroundColor: "#F5FBFF",
    borderRadius: 7,
    border: "1px solid #D2D2D2",
  },
  th: {
    color: "#363636",
    fontWeight: "400 !important" as any,
  },
  tr: {
    borderRadius: 7,
  },
  td: {
    fontSize: "12px !important",
  },
  thead: {
    ":after": {
      backgroundColor: "#D2D2D2",
      height: 1,
    },
  },
  tbody: {
    backgroundColor: "#FFFFFF",
  },
  resizer: {
    top: "20%",
    height: 26,
    borderRight: "1px solid #DADCE0",
  },
};
