"use strict";
// This plugin creates 5 rectangles on the screen.
const numberOfRectangles = 5;
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).
// figma.showUI(__html__)
//figma.notify("====== Starting ======")
// autolayoutVecticalFill()
if (figma.command === 'autolayoutHorizontalFill') {
    autolayoutFill("Vertical");
}
if (figma.command === 'autolayoutVecticalFill') {
    autolayoutFill("Horizontal");
}
if (figma.command === 'autolayoutBothFill') {
    autolayoutFill("Horizontal");
    autolayoutFill("Vertical");
}
if (figma.command === 'autolayoutHorizontalHug') {
    autolayoutHug("Vertical");
}
if (figma.command === 'autolayoutVecticalHug') {
    autolayoutHug("Horizontal");
}
if (figma.command === 'autolayoutBothHug') {
    autolayoutHug("Horizontal");
    autolayoutHug("Vertical");
}
console.log(figma.command);
// function hello() {
//   console.log("Hello function called");
//   figma.notify("Hello")
// }
function autolayoutHug(direction) {
    // Get the current selection in the Figma document
    const selection = figma.currentPage.selection;
    // Loop through the selected nodes
    for (const node of selection) {
        if (node.type === "FRAME" || node.type === "TEXT") {
            // Set the layoutSizingVertical to "FILL"
            direction == "Horizontal" ? node.layoutSizingVertical = "HUG" : null;
            direction == "Vertical" ? node.layoutSizingHorizontal = "HUG" : null;
            continue;
        }
        // Inform the user that the selected node doesn't support this property
        figma.notify("Fill doesn't apply for : " + node.name);
    }
}
function autolayoutFill(direction) {
    // Layout size vertical
    //https://www.figma.com/plugin-docs/api/properties/nodes-layoutsizingvertical/#signature
    // Get the current selection in the Figma document
    const selection = figma.currentPage.selection;
    // Check if there is at least one selected node
    if (selection.length > 0) {
        // Loop through the selected nodes
        for (const node of selection) {
            // Not used because I don't now how to check through an string array.
            const validTypes = [
                "FRAME",
                "GROUP",
                "INSTANCE",
                "VECTOR",
                "STAR",
                "LINE",
                "POLYGON",
                "TEXT",
                "ELLIPSE",
                "RECTANGLE"
            ];
            if (node.type === "FRAME" && node.children.length == 0) {
                figma.notify("Fill doesn't apply for : " + node.name);
            }
            // Check if the node is a frame and supports auto-layout
            // DIRTY ZONE but i'm too lazy to find a clean way sry not sry
            if (node.type === "FRAME" || node.type === "GROUP" || node.type === "INSTANCE" || node.type === "VECTOR" || node.type === "STAR" || node.type === "LINE" || node.type === "POLYGON" || node.type === "TEXT" || node.type === "ELLIPSE" || node.type === "RECTANGLE") {
                // Set the layoutSizingVertical to "FILL"
                direction == "Horizontal" ? node.layoutSizingVertical = "FILL" : null;
                direction == "Vertical" ? node.layoutSizingHorizontal = "FILL" : null;
                continue;
            }
            // Inform the user that the selected node doesn't support this property
            figma.notify("Fill doesn't apply for : " + node.name);
        }
    }
    else {
        // Inform the user that no nodes are selected
        figma.notify("Please select an object to set to FILL.");
    }
}
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
// ==================
// For later
//
// figma.getStyleById(id: string): BaseStyle | null
// https://www.figma.com/plugin-docs/api/figma/#getselectioncolors
