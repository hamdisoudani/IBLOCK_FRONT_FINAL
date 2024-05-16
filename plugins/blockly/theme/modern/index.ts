import Blockly from 'blockly/core';

export default Blockly.Theme.defineTheme('stylish_v4', {
  'base': Blockly.Themes.Classic,
  'blockStyles': {
    'colour_blocks': {
      'colourPrimary': '#1565c0', // Dark Blue
      'colourSecondary': '#1976d2', // Blue
      'colourTertiary': '#2196f3', // Light Blue
    },
    'list_blocks': {
      'colourPrimary': '#2e7d32', // Dark Green
      'colourSecondary': '#388e3c', // Green
      'colourTertiary': '#43a047', // Light Green
    },
    'logic_blocks': {
      'colourPrimary': '#e65100', // Dark Orange
      'colourSecondary': '#f57c00', // Orange
      'colourTertiary': '#ff9800', // Light Orange
    },
    'loop_blocks': {
      'colourPrimary': '#d32f2f', // Dark Red
      'colourSecondary': '#e57373', // Red
      'colourTertiary': '#f44336', // Light Red
    },
    'math_blocks': {
      'colourPrimary': '#6a1b9a', // Dark Purple
      'colourSecondary': '#8e24aa', // Purple
      'colourTertiary': '#9c27b0', // Light Purple
    },
    'procedure_blocks': {
      'colourPrimary': '#00796b', // Dark Teal
      'colourSecondary': '#0097a7', // Teal
      'colourTertiary': '#00bcd4', // Light Teal
    },
    'text_blocks': {
      'colourPrimary': '#fbc02d', // Dark Yellow
      'colourSecondary': '#fdd835', // Yellow
      'colourTertiary': '#ffeb3b', // Light Yellow
    },
    'variable_blocks': {
      'colourPrimary': '#455a64', // Dark Blue Grey
      'colourSecondary': '#546e7a', // Blue Grey
      'colourTertiary': '#607d8b', // Light Blue Grey
    },
    'variable_dynamic_blocks': {
      'colourPrimary': '#455a64', // Dark Blue Grey
      'colourSecondary': '#546e7a', // Blue Grey
      'colourTertiary': '#607d8b', // Light Blue Grey
    },
    'hat_blocks': {
      'colourPrimary': '#455a64', // Dark Blue Grey
      'colourSecondary': '#546e7a', // Blue Grey
      'colourTertiary': '#607d8b', // Light Blue Grey
      'hat': 'cap',
    },
  },
  'categoryStyles': {
    'colour_category': {
      'colour': '#1565c0', // Dark Blue
    },
    'list_category': {
      'colour': '#2e7d32', // Dark Green
    },
    'logic_category': {
      'colour': '#e65100', // Dark Orange
    },
    'loop_category': {
      'colour': '#d32f2f', // Dark Red
    },
    'math_category': {
      'colour': '#6a1b9a', // Dark Purple
    },
    'procedure_category': {
      'colour': '#00796b', // Dark Teal
    },
    'text_category': {
      'colour': '#fbc02d', // Dark Yellow
    },
    'variable_category': {
      'colour': '#455a64', // Dark Blue Grey
    },
    'variable_dynamic_category': {
      'colour': '#455a64', // Dark Blue Grey
    },
  },
  'componentStyles': {
    'workspaceBackgroundColour': '#f5f5f5', // Light Grey
    'toolboxBackgroundColour': '#ffffff', // White
    'toolboxForegroundColour': '#000000', // Black
    'flyoutBackgroundColour': '#ffffff', // White
    'flyoutForegroundColour': '#000000', // Black
    'flyoutOpacity': 1,
    'scrollbarColour': '#bdbdbd', // Light Grey
    'insertionMarkerColour': '#000000', // Black
    //'stackGlow': '#1565c0', // Dark Blue
    //'stackGlowSize': 2,
    //'stackGlowOpacity': 0.7,
    //'stackGlowColour': '#1565c0', // Dark Blue
    //'hatGlow': '#2e7d32', // Dark Green
    //'hatGlowSize': 2,
    //'hatGlowOpacity': 0.7,
    //'hatGlowColour': '#2e7d32', // Dark Green
  },
  'fontStyle': {
    'family': 'Roboto, sans-serif', // Change to your preferred font
    'weight': 'normal',
    'size': 12,
  },
  'startHats': true,
  name: 'stylish_v4',
});
