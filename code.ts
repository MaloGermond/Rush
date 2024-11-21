// This plugin creates 5 rectangles on the screen.
// let styles = figma.clientStorage.getAsync('styles') || [];


// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// figma.showUI(__html__)

//figma.notify("====== Starting ======")
// autolayoutVecticalFill()

// ACTIVATE THE VM MACHINE ON FIGMA
//
// figma.on('run', ({ command, parameters }: RunEvent) => {
//   switch (command) {
//     case "autolayoutHorizontalFill":
//       autolayoutFill("Vertical");
//       break
//     case "autolayoutVecticalFill":
//       autolayoutFill("Horizontal")
//       break
//     case "autolayoutBothFill":
//       autolayoutFill("Horizontal");
//       autolayoutFill("Vertical");
//       break
//     case "autolayoutHorizontalHug":
//       autolayoutHug("Vertical");
//       break
//     case "autolayoutVecticalHug":
//       autolayoutHug("Horizontal");
//       break
//     case "autolayoutBothHug":
//       autolayoutHug("Horizontal");
//       autolayoutHug("Vertical");
//       break
//     case "maskSelection":
//       maskSelection();
//       break
//     case "guideGrid":
//       guideGrid();
//       break
//     case "removeGuides":
//       removeAllGuides();
//       break
//     default:
//       console.warn(`Unknown command: ${command}`);
//       break; // Handle any unexpected commands
//   }
// })

if(figma.command === 'autolayoutHorizontalFill') {
  autolayoutFill("Vertical");
}
if(figma.command === 'autolayoutVecticalFill') {
  autolayoutFill("Horizontal");
}
if(figma.command === 'autolayoutBothFill') {
  autolayoutFill("Horizontal");
  autolayoutFill("Vertical");
}

if(figma.command === 'autolayoutHorizontalHug') {
  autolayoutHug("Vertical");
}
if(figma.command === 'autolayoutVecticalHug') {
  autolayoutHug("Horizontal");
}
if(figma.command === 'autolayoutBothHug') {
  autolayoutHug("Horizontal");
  autolayoutHug("Vertical");
}

if(figma.command === 'maskSelection') {
  maskSelection()
}

if(figma.command === 'guideGrid') {
  guideGrid()
}

if(figma.command === 'removeGuides') {
  removeAllGuides()
}



//console.log(figma.command)

function getStyles() {
  // console.log(figma.getLocalPaintStyles())
  // let output = new Array()
  // figma.getLocalPaintStyles()
  //   .map(style => output.push(style))
  // // Save the updated styles array to client storage
  // figma.clientStorage.setAsync('styles', styles);
  // console.log({ styles })
  return figma.getLocalPaintStyles()
}

function setStyle(style ? : string) {
  // parameters in inputs
  // https://www.figma.com/plugin-docs/plugin-parameters/

  const styles = getStyles()

  console.log(style)

  console.log({
    styles
  })

  return
}

// Debug command
//console.log(figma.command)


// function hello() {
//   console.log("Hello function called");
//   figma.notify("Hello")
// }

function gapAuto() {

}

function autolayoutHug(direction: string) {
  // Get the current selection in the Figma document
  const selection = figma.currentPage.selection

  // Loop through the selected nodes
  for(const node of selection) {
    if(node.type === "FRAME" || node.type === "TEXT") {
      // Set the layoutSizingVertical to "FILL"
      direction == "Horizontal" ? node.layoutSizingVertical = "HUG" : null
      direction == "Vertical" ? node.layoutSizingHorizontal = "HUG" : null
      continue
    }

    // Inform the user that the selected node doesn't support this property
    figma.notify("Fill doesn't apply for : " + node.name);

  }
}

//https://www.figma.com/plugin-docs/api/properties/nodes-layoutmode/

function autolayoutFill(direction: string) {
  // Layout size vertical
  //https://www.figma.com/plugin-docs/api/properties/nodes-layoutsizingvertical/#signature

  // Get the current selection in the Figma document
  const selection = figma.currentPage.selection

  // Check if there is at least one selected node
  if(selection.length > 0) {

    // const parentFrame = figma.createFrame()
    // layoutMode === "HORIZONTAL"
    // figma.group(selection, parent)
    // parentFrame.counterAxisSizingMode = 'AUTO'
    //selection.every(el => el.parent !== null && el.parent.type === "PAGE") ? figma.group(selection, parent) : null

    // Loop through the selected nodes
    for(const node of selection) {

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
      ]

      if(node.type === "FRAME" && node.children.length == 0) {
        figma.notify("Fill doesn't apply for : " + node.name)
      }

      // Check if the node is a frame and supports auto-layout
      // DIRTY ZONE but i'm too lazy to find a clean way sry not sry
      if(node.type === "FRAME" || node.type === "GROUP" || node.type === "INSTANCE" || node.type === "VECTOR" || node.type === "STAR" || node.type === "LINE" || node.type === "POLYGON" || node.type === "TEXT" || node.type === "ELLIPSE" || node.type === "RECTANGLE") {
        // Set the layoutSizingVertical to "FILL"
        direction == "Horizontal" ? node.layoutSizingVertical = "FILL" : null
        direction == "Vertical" ? node.layoutSizingHorizontal = "FILL" : null
        continue
      }
      // Inform the user that the selected node doesn't support this property
      figma.notify("Fill doesn't apply for : " + node.name);
    }



  } else {
    // Inform the user that no nodes are selected
    figma.notify("Please select an object to set to FILL.");
  }
}

// function resetComponent() {
//   resetOverrides()
// }

function maskSelection() {

  // Get the current selection
  const selection = figma.currentPage.selection;

  // console.log(selection)

  // Ensure that the selection is not a group or a frame
  let isGroup = false

  if(selection[0].type === "GROUP" || selection[0].type === "FRAME") {
    isGroup = true
    figma.notify('Select inside group or frame');
    figma.closePlugin();
  }


  // Ensure the parent of the first selected node is not null
  const selectionParent = selection[0].parent;
  if(!selectionParent) {
    figma.notify('Cannot group layers without a valid parent');
    figma.closePlugin();
    return;
  }

  // Check if the selection contains more than one node
  if(selection.length < 2) {
    figma.notify('Please select at least two layers');
    figma.closePlugin();
    return;
  }

  // Ensure the selection is a group or frame
  // if(selection[0].parent.type !== 'GROUP' && selection[0].parent.type !== 'FRAME') {
  //   figma.notify('Please select layers within a group or frame');
  //   figma.closePlugin();
  //   return;
  // }


  const maskLayer = selection[0];

  // Check if the last layer can be a mask
  if(!('isMask' in maskLayer)) {
    figma.notify('The last layer cannot be used as a mask');
    figma.closePlugin();
    return;
  }

  console.log(maskLayer.name)

  // Set the last layer as a mask
  maskLayer.isMask = true;
  maskLayer.maskType = "LUMINANCE"

  // Create a group from the selection
  const group = figma.group(selection, selectionParent);
  group.name = 'Mask Layers';

  // Notify the user and close the plugin
  figma.notify('Mask applied successfully');
}

/*
//
//
//  GRID GUIDE
//
//
*/

// Les param que je n'arrive pas à utiliser...
// {
//     "name": "Create Guide Grid",
//     "command": "guideGrid",
//     "parameters":[{
//       "name": "columns",
//       "description": "Number of columns",
//       "key": "columns",
//       "allowFreeform": true,
//       "optional": true
//     },
//     {
//       "name": "rows",
//       "description": "Number of rows",
//       "key": "rows",
//       "allowFreeform": true,
//       "optional": true
//     }]
//   },

function guideGrid(columns: number = 11, rows: number = 5){
  const artboardWidth = 3584
  const artboardHeight = 1536
  const gap = 128

  const page = figma.currentPage;

  for(let i=0; i<columns; i++){
    addNewGuide(page, i*artboardWidth, 'X');
    addNewGuide(page, i*artboardWidth+gap, 'X');
  }

  for(let j=0; j<rows; j++){
    addNewGuide(page, j*artboardHeight, 'Y');
    addNewGuide(page, j*artboardHeight+gap, 'Y');
  }
  

}

// Définition de l'interface Guide
interface Guide {
  readonly axis: "X" | "Y";
  readonly offset: number;
}
// Fonction pour ajouter un nouveau guide à une position X ou Y
function addNewGuide(page: PageNode, position: number, axis: "X" | "Y") {
  const guide: Guide = { axis: axis, offset: position }; // Définit explicitement axis et offset

  // Ajoute le nouveau guide en créant une nouvelle liste de guides
  page.guides = page.guides.concat(guide);
}

// Fonction pour supprimer tous les guides d'une page
function removeAllGuides() {
  figma.currentPage.guides = []; // Assigne un tableau vide à la propriété guides pour supprimer tous les guides
}


// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();


// ==================
// For later
//

// figma.getStyleById(id: string): BaseStyle | null
// https://www.figma.com/plugin-docs/api/figma/#getselectioncolors
