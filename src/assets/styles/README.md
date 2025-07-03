# Stylesheet Structure

## Master Stylesheet

**`styles.scss`**:
The main stylesheet that currently only imports the [Global Styles](#global-styles).

## Global Styles

**`assets/styles/_global.scss`**:
Defines the global styles for the application.  Also imports the [Font Definitions](#font-definitions), [Consolidated Variable and Mixin Definitions](#consolidated-variable-and-mixin-definitions), [Kendo Theme Styles](#kendo-theme-styles), and [Kendo Global Styles](#kendo-global-styles)

## Font Definitions

**`assets/styles/_fonts.scss`**:
Defines the custom fonts (i.e., `@font-face` rules). No styles are included in this file.

## Consolidated Variable and Mixin Definitions

**`assets/styles/_definitions.scss`**:
Imports the [Variable and Mixin Partials](#variable-and-mixin-partials).

## Variable and Mixin Partials

### Colors

**`assets/styles/_colors.scss`**:
Varibles that define the color palette. Names are broken into three groups:

* **Descriptive** (internal only): Names that describes the color (e.g., `$_medium-green`). These varibles all begin with an underscore to indicate they are only to be used locally within this file.
* **Semantic** (internal & external): Names that give a meaning to a color (e.g., `$color-vixxo-primary`).
* **Assigned** (external only): Names that describes how a color is used (e.g., `$color-default-text`).

All *external* names begin with `color-`.

### Composites

**`assets/styles/_composites.scss`**:
Varibles and mixins that define reusable blocks of styles. All names begin with `composite-`.

### Typography

**`assets/styles/_type.scss`**:
Varibles and mixins that define typography rules. All names begin with `type-`.

### SVG Sprites

**`assets/images/svg-sprite/svg-sprite.scss`**:
Auto-generated file based on the contents of `assets/images/svgs/` Configuration for this auto-generated file can be found in `sprite-config.json`.

## Kendo Theme Styles

**`assets/styles/_kendo-theme.scss`**:
Varibles provided by the Kendo UI theme. Use the variables defined in the style definition partials to assign them to values for the Kendo UI theme. (e.g., `$accent: $color-vixxo-primary;`)

## Kendo Global Styles

**`assets/styles/_kendo-global.scss`**:
Styles that are specifc to the Kendo UI components that should apply globally and not just on individual components. All class names begin with `.k-`.

## Component Styles

**`app/components/*/*.component.scss`**:
Additional styling needed for a component that isn't handled by the previously listed files.
