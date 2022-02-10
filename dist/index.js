"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const smartcrop_sharp_1 = __importDefault(require("smartcrop-sharp"));
const fs_1 = __importDefault(require("fs"));
const imageFileNames = fs_1.default.readdirSync('./test-images');
const contrast = 1.1;
const brightness = 1.1;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    imageFileNames.forEach((filename) => __awaiter(void 0, void 0, void 0, function* () {
        const processed = yield smartcrop_sharp_1.default.crop(`./test-images/${filename}`, { width: 800, height: 800 });
        const crop = processed.topCrop;
        return (0, sharp_1.default)(`./test-images/${filename}`)
            .extract({
            width: crop.width, height: crop.height, left: crop.x, top: crop.y,
        })
            .rotate()
            .linear(contrast, -(128 * contrast) + 128)
            .modulate({ brightness })
            .toFile(`./output/${filename}`);
    }));
});
main();
//# sourceMappingURL=index.js.map