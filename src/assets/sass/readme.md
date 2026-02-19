Here's a revised `README.md` file that clearly explains how to use the provided SCSS grid system and mixins, focusing on practical usage and parameter explanations.

---

# SCSS Grid System and Mixins

## Overview

This project includes a responsive grid system and SCSS mixins that help with layout and styling. The grid system is similar to Bootstrap, with classes for various screen sizes. Additionally, SCSS mixins for responsive styling and flexbox layout are provided.

## Grid System

### Grid Structure

The grid system uses the `cell` prefix to create responsive column classes. You can use these classes to define how many columns a grid item should span at different screen sizes.

#### Breakpoints

- **xs**: Extra small screens (0px)
- **sm**: Small screens (576px)
- **md**: Medium screens (768px)
- **lg**: Large screens (992px)
- **xl**: Extra large screens (1200px)
- **xxl**: Extra extra large screens (1400px)

### SCSS Code

```scss
// Define the breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);

// Mixin to generate the column classes for a given breakpoint
@mixin make-cell($size, $columns: 12) {
  @for $i from 1 through $columns {
    .cell-#{$size}-#{$i} {
      width: (100% / $columns) * $i;
    }
  }
}

// Generate column classes for all breakpoints
@mixin generate-grid($breakpoints) {
  @each $breakpoint, $breakpoint-width in $breakpoints {
    @if $breakpoint == xs {
      @include make-cell(xs);
    } @else {
      @media (min-width: $breakpoint-width) {
        @include make-cell($breakpoint);
      }
    }
  }
}

// Call the mixin to generate the grid
@include generate-grid($grid-breakpoints);

// Optional: Create a container and row mixin for convenience
@mixin container {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
  @media (min-width: 1400px) {
    max-width: 1320px;
  }
}

@mixin row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
```

### Usage

To use the grid system in your HTML:

```html
<div class="container">
  <div class="row">
    <div class="cell-12 cell-sm-6 cell-md-4 cell-lg-3 cell-xl-2 cell-xxl-1">
      Cell 1
    </div>
    <div class="cell-12 cell-sm-6 cell-md-4 cell-lg-3 cell-xl-2 cell-xxl-1">
      Cell 2
    </div>
    <!-- Add more cells as needed -->
  </div>
</div>
```

- **.cell-12**: Full width on extra small screens.
- **.cell-sm-6**: Half width on small screens.
- **.cell-md-4**: One-third width on medium screens.
- **.cell-lg-3**: One-fourth width on large screens.
- **.cell-xl-2**: One-sixth width on extra large screens.
- **.cell-xxl-1**: One-twelfth width on extra extra large screens.
- **So On**

## Mixins

### `jn-standalone`

This mixin applies responsive styles based on specified breakpoints. It supports various properties and values for different screen sizes.

#### Usage

```scss
.element {
    @include jn-standalone((
        padding-top: (40px, 60px, null, 80px, 100px, 120px),
        font-size: (40px, 60px, null, 80px, 100px, 120px),
        font-weight: (400, 600, null, 800, 100, 100),
    ), min);
}
```

- **padding-top**: Defines the padding-top property at different breakpoints.
- **font-size**: Sets the font-size property for various screen sizes.
- **font-weight**: Specifies the font-weight property for different breakpoints.

### `flexbox`

The `flexbox` mixin allows you to apply flexbox properties to an element.

#### Usage

```scss
.xyz {
    @include flexbox(
      ('flex-direction', row),
      ('justify-content', center),
      ('align-items', center),
      ('order', 4)
    );
}
```

- **flex-direction**: Defines the direction of flex items (e.g., `row`, `column`).
- **justify-content**: Aligns items along the main axis (e.g., `center`, `space-between`).
- **align-items**: Aligns items along the cross axis (e.g., `center`, `stretch`).
- **order**: Sets the order of the flex item (e.g., `4`).

## Conclusion

This `README.md` provides instructions for using the grid system and SCSS mixins. Customize the breakpoints, column sizes, and properties as needed for your project. 

Feel free to modify or extend the mixins and classes to suit your specific design requirements.

---

You can update this `README.md` as your project evolves or if additional features are added.