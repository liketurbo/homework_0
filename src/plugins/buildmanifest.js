import path from 'path';
import fs from 'fs';

const BuildManifestPlugin = () => {};

BuildManifestPlugin.prototype.apply = (compiler) => {
  compiler.plugin('done', (stats) => {
    fs.writeFileSync(
      path.resolve('build/manifest.json'),
      JSON.stringify(stats.toJson().assetsByChunkName),
    );
  });
};

export default BuildManifestPlugin;
