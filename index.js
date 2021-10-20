const { PNG } = require("pngjs");

module.exports.niceDiff = (img1, img2) => {
  return new Promise((resolve) => {
    const png1 = PNG.sync.read(img1);
    const png2 = PNG.sync.read(img2);
    if (png1.data.length !== png2.data.length) {
      throw new Error(
        `image size mismatch: ${png1.width}x${png1.height} vs. ${png2.width}x${png2.height}`
      );
    }
    const byteCount = png1.data.length;
    const diff = {
      data: [],
      width: png1.width,
      height: png1.height,
    };
    for (let index = 0; index < byteCount; index += 4) {
      if (
        png1.data[index] !== png2.data[index] ||
        png1.data[index + 1] !== png2.data[index + 1] ||
        png1.data[index + 2] !== png2.data[index + 2] ||
        png1.data[index + 3] !== png2.data[index + 3]
      ) {
        // a bright marker
        diff.data.push(...[255, 120, 255, 255]);
      } else {
        const darker = [
          png1.data[index],
          png1.data[index + 1],
          png1.data[index + 2],
        ].map((p) => Math.floor(p / 5));
        diff.data.push(...darker, 255);
      }
    }
    resolve(PNG.sync.write(diff));
  });
};
