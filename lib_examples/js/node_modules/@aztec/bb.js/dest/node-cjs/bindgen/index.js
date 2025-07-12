"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rust_js_1 = require("./rust.js");
const typescript_js_1 = require("./typescript.js");
const [, , exp = '../exports.json', lang = 'ts'] = process.argv;
function generateCode(exports, lang) {
    switch (lang) {
        case 'ts':
            return (0, typescript_js_1.generateTypeScriptCode)(exports);
        case 'rust':
            return (0, rust_js_1.generateRustCode)(exports);
        default:
            throw new Error(`Unknown lang: ${lang}`);
    }
}
console.log(generateCode(exp, lang));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluZGdlbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUE2QztBQUM3QyxtREFBeUQ7QUFFekQsTUFBTSxDQUFDLEVBQUUsQUFBRCxFQUFHLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUVoRSxTQUFTLFlBQVksQ0FBQyxPQUFlLEVBQUUsSUFBWTtJQUNqRCxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxJQUFBLHNDQUFzQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLEtBQUssTUFBTTtZQUNULE9BQU8sSUFBQSwwQkFBZ0IsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUNuQztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQztBQUNILENBQUM7QUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyJ9