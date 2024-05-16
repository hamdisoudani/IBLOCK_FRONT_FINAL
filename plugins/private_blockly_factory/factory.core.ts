import Blockly, { Block } from "blockly";
//import DarkTheme from '@blockly/theme-dark';
import { FactoryUtils } from "../blockly_factory/factory_utils";
import {BlockDefinitionExtractor} from "../blockly_factory/block_definition_extractor";
import { StandardCategories } from "../blockly_factory/standard_categories";

export class PrivateBlocklyFactory {
    isLoaded: boolean;
    isBlockTypeForbidden: { error: boolean; message: string; };
    mainWorkspace: Blockly.WorkspaceSvg | null;
    previewWorkpace: Blockly.WorkspaceSvg | null;
    blockType: string | null;
    pythonCode: string | null;
    jsonCode: string;
    setPythonCode: (code: string) => void;
    setJsonCode: (code: string) => void;
    setXml: (code: string) => void;

    constructor(setPythonCode: (code: string) => void, setJsonCode: (code: string) => void, setXml: (code: string) => void) {
        this.isLoaded = false;
        this.isBlockTypeForbidden = { error: true, message: '' };
        this.mainWorkspace = null;
        this.previewWorkpace = null;
        this.blockType = 'block_type';
        this.pythonCode = "";
        this.jsonCode = "";
        this.setPythonCode = setPythonCode;
        this.setJsonCode = setJsonCode;
        this.setXml = setXml;
    }
    init() {
        if(this.isLoaded) {
            return;
        }
        this.isLoaded = true;
        this.mainWorkspace = this.initMainWorkSpace();
        this.previewWorkpace = this.initPreviewWorkSpace();
        this.showStarterBlock();
        //this.updateLanguage();
    }
    showStarterBlock() {
        const STARTER_BLOCK_XML_TEXT =
        '<xml xmlns="https://developers.google.com/blockly/xml">' +
          '<block type="factory_base" deletable="false" movable="false">' +
            '<value name="TOOLTIP">' +
              '<block type="text" deletable="false" movable="false">' +
                '<field name="TEXT"></field>' +
              '</block>' +
            '</value>' +
            '<value name="HELPURL">' +
              '<block type="text" deletable="false" movable="false">' +
                '<field name="TEXT"></field>' +
              '</block>' +
            '</value>' +
            '<value name="COLOUR">' +
              '<block type="colour_hue">' +
                '<mutation colour="#5b67a5"></mutation>' +
                '<field name="HUE">230</field>' +
              '</block>' +
            '</value>' +
          '</block>' +
        '</xml>';
        if(this.mainWorkspace) {
            this.mainWorkspace.clear();
            var xml = Blockly.utils.xml.textToDom(STARTER_BLOCK_XML_TEXT);
            Blockly.Xml.domToWorkspace(xml, this.mainWorkspace);
        }
    }

    getFactoryXmlCode() {
        let xml = Blockly.Xml.workspaceToDom(this.mainWorkspace!);
        let xml_text = Blockly.Xml.domToText(xml);
        return xml_text;
    }

    initMainWorkSpace(): Blockly.WorkspaceSvg {
        var toolbox = `<xml xmlns="https://developers.google.com/blockly/xml" id="blockfactory_toolbox" class="toolbox">
  <category name="Input">
    <block type="input_value">
      <value name="TYPE">
        <shadow type="type_null"></shadow>
      </value>
    </block>
    <block type="input_statement">
      <value name="TYPE">
        <shadow type="type_null"></shadow>
      </value>
    </block>
    <block type="input_dummy"></block>
    <block type="input_end_row"></block>
  </category>
  <category name="Field">
    <block type="field_static"></block>
    <block type="field_label_serializable"></block>
    <block type="field_input"></block>
    <block type="field_number"></block>
    <block type="field_angle"></block>
    <block type="field_dropdown"></block>
    <block type="field_checkbox"></block>
    <block type="field_colour"></block>
    <block type="field_variable"></block>
    <block type="field_image"></block>
  </category>
  <category name="Type">
    <block type="type_group"></block>
    <block type="type_null"></block>
    <block type="type_boolean"></block>
    <block type="type_number"></block>
    <block type="type_string"></block>
    <block type="type_list"></block>
    <block type="type_other"></block>
  </category>
  <category name="Colour" id="colourCategory">
    <block type="colour_hue"><mutation colour="20"></mutation><field name="HUE">20</field></block>
    <block type="colour_hue"><mutation colour="65"></mutation><field name="HUE">65</field></block>
    <block type="colour_hue"><mutation colour="120"></mutation><field name="HUE">120</field></block>
    <block type="colour_hue"><mutation colour="160"></mutation><field name="HUE">160</field></block>
    <block type="colour_hue"><mutation colour="210"></mutation><field name="HUE">210</field></block>
    <block type="colour_hue"><mutation colour="230"></mutation><field name="HUE">230</field></block>
    <block type="colour_hue"><mutation colour="260"></mutation><field name="HUE">260</field></block>
    <block type="colour_hue"><mutation colour="290"></mutation><field name="HUE">290</field></block>
    <block type="colour_hue"><mutation colour="330"></mutation><field name="HUE">330</field></block>
  </category>
        </xml>`;

        const mainWorkspace = Blockly.inject('buildblocks',
        {
            collapse: false,
            toolbox: toolbox,
            comments: false,
            disable: false,
            //theme: DarkTheme,
            renderer: 'zelos',
            toolboxPosition: 'top',
            media: 'https://google.github.io/blockly/media/'
        });

        return mainWorkspace;
    }

    initPreviewWorkSpace(): Blockly.WorkspaceSvg {
        const previewWorkspace = Blockly.inject('previewWorkspaceDiv',
        {
         media: 'https://google.github.io/blockly/media/',
         scrollbars: true,
         collapse: false,
          comments: false,
          disable: false,
          //theme: DarkTheme,
          renderer: 'zelos',
        });
        return previewWorkspace;
    }

    getJsonFromCreatedBlock() {
        const rootBlock = this.getRootBlock();
        let JS: any = {};
        // Type is not used by Blockly, but may be used by a loader.
        JS.type = this.blockType;
        // Generate inputs.
        let message = [];
        let args = [];
        let contentsBlock = this.getRootBlock()?.getInputTargetBlock('INPUTS');
        let lastInput = null;
        while (contentsBlock) {
          //!contentsBlock.disabled && 
          if (!contentsBlock.getInheritedDisabled() && contentsBlock.isEnabled()) {
            var fields = this.getFieldsJson_(
                contentsBlock.getInputTargetBlock('FIELDS'));
            for (var i = 0; i < fields.length; i++) {
              if (typeof fields[i] === 'string') {
                message.push(fields[i].replace(/%/g, '%%'));
              } else {
                args.push(fields[i]);
                message.push('%' + args.length);
              }
            }
      
            let input = {type: contentsBlock.type, name: '', check: null, align: 'LEFT'};
            // Dummy inputs don't have names.  Other inputs do.
            if (contentsBlock.type !== 'input_dummy' &&
                contentsBlock.type !== 'input_end_row') {
              input.name! = contentsBlock.getFieldValue('INPUTNAME');
            }
            var check = JSON.parse(
                this.getOptTypesFrom(contentsBlock, 'TYPE') || 'null');
            if (check) {
              input.check = check;
            }
            var align = contentsBlock.getFieldValue('ALIGN');
            if (align !== 'LEFT') {
              input.align = align;
            }
            args.push(input);
            message.push('%' + args.length);
            lastInput = contentsBlock;
          }
          contentsBlock = contentsBlock.nextConnection &&
              contentsBlock.nextConnection.targetBlock();
        }
        // Remove last input if dummy and not empty.
        if (lastInput && lastInput.type === 'input_dummy') {
          let fields = lastInput.getInputTargetBlock('FIELDS');
          if (fields && this.getFieldsJson_(fields).join('').trim() !== '') {
            var align = lastInput.getFieldValue('ALIGN');
            if (align !== 'LEFT') {
              JS.implicitAlign0 = align;
            }
            args.pop();
            message.pop();
          }
        }
        JS.message0 = message.join(' ');
        if (args.length) {
          JS.args0 = args;
        }
        // Generate inline/external switch.
        if (rootBlock?.getFieldValue('INLINE') === 'EXT') {
          JS.inputsInline = false;
        } else if (rootBlock?.getFieldValue('INLINE') === 'INT') {
          JS.inputsInline = true;
        }
        // Generate output, or next/previous connections.
        switch (rootBlock?.getFieldValue('CONNECTIONS')) {
          case 'LEFT':
            JS.output =
                JSON.parse(
                    this.getOptTypesFrom(rootBlock, 'OUTPUTTYPE') || 'null');
            break;
          case 'BOTH':
            JS.previousStatement =
                JSON.parse(
                    this.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null');
            JS.nextStatement =
                JSON.parse(
                    this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null');
            break;
          case 'TOP':
            JS.previousStatement =
                JSON.parse(
                    this.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null');
            break;
          case 'BOTTOM':
            JS.nextStatement =
                JSON.parse(
                    this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null');
            break;
        }
        // Generate colour.
        let colourBlock = rootBlock?.getInputTargetBlock('COLOUR');
        if (colourBlock && colourBlock.isEnabled()) {
          var hue = parseInt(colourBlock.getFieldValue('HUE'), 10);
          JS.colour = hue;
        }
      
        JS.tooltip = this.getTooltipFromRootBlock_();
        JS.helpUrl = this.getHelpUrlFromRootBlock_();
      
        return JSON.stringify(JS, null, '  ');
    };

    getRootBlock(): Blockly.Block | null {
        var blocks = this.mainWorkspace?.getTopBlocks(true) || [];
        for (var i = 0, block; block = blocks[i]; i++) {
            if (block.type === 'factory_base') {
            return block;
            }
        }
        return null;
    }

    getNewCretedBlockJson() {
        if(!this.blockType) {
            return;
        }
        this.blockType = this.blockType.replace(/\W/g, '_').replace(/^(\d)/, '_$1')
        var code = this.getJsonFromCreatedBlock();
        return code;
    }

    // Generate code from root block (old function)
    /*generateJsonCodeFromRootBlock() {
        let rootBlock = this.getRootBlock();
        if (!rootBlock) {
            return;
        }
        let blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
        if (!blockType) {
            blockType = 'unnamed';
        }

        if (!this.isBlockTypeForbidden.error) {
            var format = 'JSON';

            var code = FactoryUtils.getBlockDefinition(blockType, rootBlock, format,
                this.mainWorkspace);
            this.updatePreviewWorkSpace(code);
            this.jsonCode = code;
            this.blockType = blockType;
        }
    }*/

    updatePreviewWorkSpace(codeX: string = '') {
        const code = codeX;
        if(this.previewWorkpace) {
            this.previewWorkpace.clear();
        }
      
        const format = 'JSON';
        //let code = this.getJsonFromCreatedBlock();
        // if (!code.trim()) {
        //   // Nothing to render.  Happens while cloud storage is loading.
        //   return;
        // }
        // Don't let the user create a block type that already exists,
        // because it doesn't work.
      
        //this.blockType = 'block_type';
        var blockCreated = false;
        try {
            var json = JSON.parse(code);
            this.blockType = json.type || 'unnamed';
            if (this.warnExistingBlock()) {
              return;
            }
            Blockly.Blocks[this.blockType!] = {
              init: function() {
                this.jsonInit(json);
              }
            };
          blockCreated = true;
      
          // Create the preview block.
          let previewBlock = this.previewWorkpace?.newBlock(this.blockType!);
          previewBlock?.initSvg();
          previewBlock?.render();
          previewBlock?.setMovable(false);
          previewBlock?.setDeletable(false);
          previewBlock?.moveBy(15, 10);
          this.previewWorkpace?.clearUndo();
          const pythonCode = this.getGeneratorStub(previewBlock!, 'Python');
          this.setPythonCode(pythonCode);
      
          // Warn user only if their block type is already exists in Blockly's
          // standard library.
          let rootBlock = this.getRootBlock();
          if (StandardCategories.coreBlockTypes.includes(this.blockType)) {
            this.handleDisplayErrorIfBlockTypeIsForbidden(true,'A core Blockly block already exists under this name.');
            rootBlock?.setWarningText('A core Blockly block already exists ' +
                'under this name.');
      
          } else if (this.blockType === 'block_type') {
            // Warn user to let them know they can't save a block under the default
            // name 'block_type'
            this.handleDisplayErrorIfBlockTypeIsForbidden(true, 'You cannot save a block with the default name, "block_type"');
            rootBlock?.setWarningText('You cannot save a block with the default ' +
                'name, "block_type"');
      
          } else {
            this.handleDisplayErrorIfBlockTypeIsForbidden(false, '');
            rootBlock?.setWarningText(null);
          }
        } catch(err) {
          // Display an error if the block could not be created.
          var text = 'Unable to create block. ' + err;
          this.handleDisplayErrorIfBlockTypeIsForbidden(true, text);
          this.getRootBlock()?.setWarningText(text);
        } finally {
          // Remove the newly-created block.
          // We have to check if the block was actually created so that we don't remove
          // one of the built-in blocks, like factory_base.
          if (blockCreated) {
            delete Blockly.Blocks[this.blockType!];
          }
        }
    };
    
    updateLanguage() {
      let rootBlock = this.getRootBlock();
      if (!rootBlock) {
        return;
      }
      var blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase();
      if (!blockType) {
        blockType = "unnamed";
      }
      var format = 'JSON';
  
      var code = FactoryUtils.getBlockDefinition(blockType, rootBlock, format, this.mainWorkspace); 

      this.setJsonCode(code);
      this.updatePreviewWorkSpace(code);
      const xml = this.getFactoryXmlCode();
      this.setXml(xml);
      this.blockType = blockType;
    };

    // Utils functions
    getFieldsJson_(block: any) {
        let fields: any = [];
        while (block) {
          if (!block.disabled && !block.getInheritedDisabled()) {
            switch (block.type) {
              case 'field_static':
                // Result: 'hello'
                fields.push(block.getFieldValue('TEXT'));
                break;
              case 'field_label_serializable':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  text: block.getFieldValue('TEXT')
                });
                break;
              case 'field_input':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  text: block.getFieldValue('TEXT')
                });
                break;
              case 'field_number':
                let obj : any = {
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  value: Number(block.getFieldValue('VALUE'))
                };
                var min = Number(block.getFieldValue('MIN'));
                if (min > -Infinity) {
                  obj.min = min;
                }
                var max = Number(block.getFieldValue('MAX'));
                if (max < Infinity) {
                  obj.max = max;
                }
                var precision = Number(block.getFieldValue('PRECISION'));
                if (precision) {
                  obj.precision = precision;
                }
                fields.push(obj);
                break;
              case 'field_angle':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  angle: Number(block.getFieldValue('ANGLE'))
                });
                break;
              case 'field_checkbox':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  checked: block.getFieldValue('CHECKED') === 'TRUE'
                });
                break;
              case 'field_colour':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  colour: block.getFieldValue('COLOUR')
                });
                break;
              case 'field_variable':
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  variable: block.getFieldValue('TEXT') || null
                });
                break;
              case 'field_dropdown':
                var options = [];
                for (var i = 0; i < block.optionList_.length; i++) {
                  options[i] = [block.getUserData(i),
                      block.getFieldValue('CPU' + i)];
                }
                if (options.length) {
                  fields.push({
                    type: block.type,
                    name: block.getFieldValue('FIELDNAME'),
                    options: options
                  });
                }
                break;
              case 'field_image':
                fields.push({
                  type: block.type,
                  src: block.getFieldValue('SRC'),
                  width: Number(block.getFieldValue('WIDTH')),
                  height: Number(block.getFieldValue('HEIGHT')),
                  alt: block.getFieldValue('ALT'),
                  flipRtl: block.getFieldValue('FLIP_RTL') === 'TRUE'
                });
                break;
            }
          }
          block = block.nextConnection && block.nextConnection.targetBlock();
        }
        return fields;
    };
    warnExistingBlock() {
        if (this.blockType! in Blockly.Blocks) {
          var text = `You can't make a block called ${this.blockType} in this tool because that name already exists.`;
          this.getRootBlock()?.setWarningText(text);
          this.handleDisplayErrorIfBlockTypeIsForbidden(true, text);
          return true;
        }
        this.handleDisplayErrorIfBlockTypeIsForbidden(false, '');
        return false;
    }
    handleDisplayErrorIfBlockTypeIsForbidden(error: boolean, message: string) {
        this.isBlockTypeForbidden = {error, message};
    }
    buildBlockFactoryWorkspace(block: Blockly.Block): any {
        let workspaceXml = Blockly.utils.xml.createElement('xml');
        workspaceXml.append(BlockDefinitionExtractor.factoryBase_(block, block.type));
        return workspaceXml;
    };
    getGeneratorStub(block: Blockly.BlockSvg, generatorLanguage: string) {
        // Build factory blocks from block
        if (this.isBlockTypeForbidden.error) {  
          this.mainWorkspace?.clear();
          var xml = BlockDefinitionExtractor.buildBlockFactoryWorkspace(block);
          Blockly.Xml.domToWorkspace(xml, this.mainWorkspace!);
          // Calculate timer to avoid infinite update loops
          // TODO(#1267): Remove the global variables and any infinite loops.
          this.handleDisplayErrorIfBlockTypeIsForbidden(false, '');
        }
       // BlockFactory.lastUpdatedBlock = block; // Variable to share the block value.
      
        function makeVar(root:any, name: string) {
          name = name.toLowerCase().replace(/\W/g, '_');
          return '  var ' + root + '_' + name;
        }
        // The makevar function lives in the original update generator.
        var language = generatorLanguage.toLowerCase();
        var code = [];
        code.push('// ' + block.type + ' generator stub, generated by the Intellect block factory');
        //code.push("//TODO: Implement this block in " + language + " code");
        // code.push(`${language}.${language}Generator.forBlock['${block.type}'] = ` +
        //           'function(block, generator) {');
      
        // Generate getters for any fields or inputs.
        for (let i = 0, input; input = block.inputList[i]; i++) {
          for (var j = 0, field; field = input.fieldRow[j]; j++) {
            let name = field.name;
            if (!name) {
              continue;
            }
            if (field instanceof Blockly.FieldVariable) {
              // FieldVariable is subclass of FieldDropdown; must test first.
              code.push(`${makeVar('variable', name)} = ` +
                        `generator.nameDB_.getName(block.getFieldValue('${name}'), ` +
                        `Blockly.Variables.NAME_TYPE);`);
            } else if (field instanceof Blockly.FieldCheckbox) {
              code.push(`${makeVar('checkbox', name)} = ` +
                        `block.getFieldValue('${name}') === 'TRUE';`);
            } else {
              let prefix =
                  // Angle is subclass of FieldTextInput; must test first.
                  field instanceof Blockly.FieldAngle ? 'angle' :
                  field instanceof Blockly.FieldColour ? 'colour' :
                  field instanceof Blockly.FieldDropdown ? 'dropdown' :
                  field instanceof Blockly.FieldNumber ? 'number' :
                  field instanceof Blockly.FieldTextInput ? 'text' :
                  'field';  // Default if subclass not found.
              code.push(`${makeVar(prefix, name)} = block.getFieldValue('${name}');`);
            }
          }
          let name = input.name;
          if (name) {
            if (input.connection?.type === Blockly.INPUT_VALUE) {
              code.push(`${makeVar('value', name)} = ` +
                        `generator.valueToCode(block, '${name}', ` +
                        `${language}.Order.ATOMIC);`);
            } else if (input.connection?.type === Blockly.NEXT_STATEMENT) {
              code.push(`${makeVar('statements', name)} = ` +
                        `generator.statementToCode(block, '${name}');`);
            }
          }
        }
        // Most languages end lines with a semicolon.  Python & Lua do not.
        
        //code.push("// TODO: Assemble " + language + " into code variable.");
        if (block.outputConnection) {
          code.push("var code = '...';");
          code.push("// TODO: Change ORDER_NONE to the correct strength.");
          code.push("return [code, Blockly." + language + ".ORDER_NONE];");
        } else {
          code.push("var code = '..." + "\\n';");
          code.push("return code;");
        }
        //code.push("};");
        return code.join('\n');
    };
    getTooltipFromRootBlock_() {
      const rootBlock = this.getRootBlock();
      var tooltipBlock = rootBlock?.getInputTargetBlock('TOOLTIP');
      if (tooltipBlock && tooltipBlock.isEnabled()) {
        return tooltipBlock.getFieldValue('TEXT');
      }
      return '';
    };
    getHelpUrlFromRootBlock_() {
      const rootBlock = this.getRootBlock();
      var helpUrlBlock = rootBlock?.getInputTargetBlock('HELPURL');
      if (helpUrlBlock && helpUrlBlock.isEnabled()) {
        return helpUrlBlock.getFieldValue('TEXT');
      }
      return '';
    };
    getOptTypesFrom (block: Blockly.Block, name: string) {
      var types = this.getTypesFrom_(block, name);
      if (types.length === 0) {
        return undefined;
      } else if (types.includes('null')) {
        return 'null';
      } else if (types.length === 1) {
        return types[0];
      } else {
        return '[' + types.join(', ') + ']';
      }
    };
    countBlocksOfType(workspace: Blockly.Workspace, type: string): number {
      let count = 0;
      const allBlocks = workspace.getAllBlocks();
      for (const block of allBlocks) {
        if (block.type === type) {
          count++;
        }
      }
      return count;
    }
    getTypesFrom_(block: Blockly.Block, name: string) {
      let typeBlock = block.getInputTargetBlock(name);
      let types: any;
      if (!typeBlock || typeBlock.isEnabled() === false) {
        types = [];
      } else if (typeBlock.type === 'type_other') {
        types = [JSON.stringify(typeBlock.getFieldValue('TYPE'))];
      } else if (typeBlock.type === 'type_group') {
        types = [];
        const count: number = this.countBlocksOfType(this.mainWorkspace!, typeBlock.type);
        for (var n = 0; n < count; n++) {
          types = types.concat(this.getTypesFrom_(typeBlock, 'TYPE' + n));
        }
        // Remove duplicates.
        var hash = Object.create(null);
        for (var n = types.length - 1; n >= 0; n--) {
          if (hash[types[n]]) {
            types.splice(n, 1);
          }
          hash[types[n]] = true;
        }
      } else {
        // bypass th error of valueType by defining it as any
        types = [JSON.stringify((typeBlock as any).valueType)];
        //types = [JSON.stringify(typeBlock.valueType)];
      }
      return types;
    };
}