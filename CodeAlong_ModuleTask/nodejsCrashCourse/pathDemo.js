import path from "path";

const filePath = './hei/hoi/sa.txt'

console.log(path.basename(filePath));
console.log(path.dirname(filePath));
console.log(path.extname(filePath));
console.log(path.parse(filePath));

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath2 = path.join(__dirname, 'hei', 'hoi', 'sa.txt');
const filePath3 = path.resolve(__dirname, 'hei', 'hoi', 'sa.txt');
console.log(filePath2);
console.log(filePath3);