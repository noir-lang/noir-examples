import { generateRustCode } from './rust.js';
import { generateTypeScriptCode } from './typescript.js';
const [, , exp = '../exports.json', lang = 'ts'] = process.argv;
function generateCode(exports, lang) {
    switch (lang) {
        case 'ts':
            return generateTypeScriptCode(exports);
        case 'rust':
            return generateRustCode(exports);
        default:
            throw new Error(`Unknown lang: ${lang}`);
    }
}
console.log(generateCode(exp, lang));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluZGdlbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDN0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFekQsTUFBTSxDQUFDLEVBQUUsQUFBRCxFQUFHLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUVoRSxTQUFTLFlBQVksQ0FBQyxPQUFlLEVBQUUsSUFBWTtJQUNqRCxRQUFRLElBQUksRUFBRSxDQUFDO1FBQ2IsS0FBSyxJQUFJO1lBQ1AsT0FBTyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxLQUFLLE1BQU07WUFDVCxPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0gsQ0FBQztBQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDIn0=