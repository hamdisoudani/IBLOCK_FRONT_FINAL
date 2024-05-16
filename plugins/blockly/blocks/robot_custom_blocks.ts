import * as Blockly from 'blockly/core';


// Define the block definition
  var moveForwardBlock = {
    type: 'move_forward',
    message0: 'move forward',
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: 'Move forward',
    helpUrl: ''
  };
  // Define the block definition for 'move_left'
  var moveLeftBlock = {
    type: 'move_left',
    message0: 'move left',
    previousStatement: null,
    nextStatement: null,
    colour: 230,
    tooltip: 'Move left',
    helpUrl: ''
  };
  
  // Register the blocks with Blockly
  Blockly.Blocks['move_forward'] = {
    init: function() {
      this.jsonInit(moveForwardBlock);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(moveForwardBlock.colour);
      this.setTooltip(moveForwardBlock.tooltip);
      this.setHelpUrl(moveForwardBlock.helpUrl);
    }
  };
  
  Blockly.Blocks['move_left'] = {
    init: function() {
      this.jsonInit(moveLeftBlock);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(moveLeftBlock.colour);
      this.setTooltip(moveLeftBlock.tooltip);
      this.setHelpUrl(moveLeftBlock.helpUrl);
    }
  };

// Define the allowed connections for the 'move_forward' block
Blockly.Blocks['move_forward'].getAllowedIncomingConnectionTypes = function() {
// This block can only be attached to from the top with another block of type 'move_forward' or 'move_left'
return [Blockly.ConnectionType.PREVIOUS_STATEMENT];
};