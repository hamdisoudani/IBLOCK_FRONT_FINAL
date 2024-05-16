
import {javascriptGenerator} from 'blockly/javascript';

import './python/robot_blocks_generator'





javascriptGenerator.forBlock['test_react_field'] = function (block) {
  return "console.log('custom block');\n";
};

javascriptGenerator.forBlock['test_react_date_field'] = function (block) {
  return 'console.log(' + block.getField('DATE').getText() + ');\n';
};