# Rush Figma Plugin

This Figma plugin simplifies the process of applying AutoLayout properties to selected nodes. It provides functionality for both "HUG" and "FILL" layout sizings in both horizontal and vertical directions.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [Installation](#installation)
- [Commands](#commands)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Rush Figma plugin streamlines the application of AutoLayout properties to selected nodes, reducing the manual effort required for consistent layout management. Whether you need to hug content or fill available space, this plugin has you covered.

## Features

- Apply AutoLayout properties to selected nodes.
- Support for "HUG" and "FILL" layout sizings.
- Direction options for horizontal and vertical layouts.

## Usage

1. **Install the Plugin:**
   - Download the plugin files.
   - Open Figma and navigate to the Plugins panel.
   - Click on the '+' button to add a new plugin.
   - Choose 'Development' and select the plugin files.

2. **Run the Plugin:**
   - Select the nodes you want to apply AutoLayout to.
   - Open the Plugins menu and run the desired command.

3. **Enjoy Consistent Layouts:**
   - Let the plugin handle AutoLayout for you, ensuring a consistent design.

## Installation

To install the Rush, follow these steps:

1. Download the plugin files from the repository.
2. Open Figma and go to the Plugins panel.
3. Click on the '+' button to add a new plugin.
4. Choose 'Development' and select the downloaded plugin files.

## Commands

The plugin supports the following commands:

- **autolayoutHorizontalFill:** Apply "FILL" layout sizing in the horizontal direction.
- **autolayoutVecticalFill:** Apply "FILL" layout sizing in the vertical direction.
- **autolayoutBothFill:** Apply "FILL" layout sizing in both horizontal and vertical directions.
- **autolayoutHorizontalHug:** Apply "HUG" layout sizing in the horizontal direction.
- **autolayoutVecticalHug:** Apply "HUG" layout sizing in the vertical direction.
- **autolayoutBothHug:** Apply "HUG" layout sizing in both horizontal and vertical directions.

## Examples

### Apply "FILL" Layout Sizing in Horizontal Direction

```javascript
if (figma.command === 'autolayoutHorizontalFill') {
    autolayoutFill("Vertical");
}
```

### Apply "HUG" Layout Sizing in Both Directions

```javascript
if (figma.command === 'autolayoutBothHug') {
    autolayoutHug("Horizontal");
    autolayoutHug("Vertical");
}
```

## Contributing

Contributions are welcome! If you encounter any issues or have ideas for improvements, feel free to [open an issue](https://github.com/your-repository/issues) or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE.md).