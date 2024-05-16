
import { pythonGenerator } from "blockly/python";
pythonGenerator.INDENT = '    ';
pythonGenerator.forBlock['move_forward'] = () => {
    var code = "send_command('F')\n"
    code += "time.sleep(1) \n"
    return code
} 

// pythonGenerator.forBlock['move_forward'] = () => {
//     return "console.log('move forward');\n";
// }