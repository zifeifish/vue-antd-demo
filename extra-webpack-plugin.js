/** 个简单的示例插件，生成一个叫做 filelist.md 的新文件；文件内容是所有构建生成的文件的列表。 */
class FileListPlugin {
  apply(compiler) {
    // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
    compiler.hooks.emit.tapAsync("FileListPlugin", (compilation, callback) => {
      // 在生成文件中，创建一个头部字符串：
      var filelist = "In this build:\n\n";

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      for (var filename in compilation.assets) {
        filelist += "- " + filename + "\n";
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets["filelist.md"] = {
        source: function () {
          return filelist;
        },
        size: function () {
          return filelist.length;
        },
      };

      callback();
    });
  }
}

/** 自定义的插件: 生成版本号json文件 */
const { version } = require("./package.json");
const fs = require("fs");
class VersionPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("Version Plugin", (compilation) => {
      const outputPath = compiler.path || compilation.options.output.path;
      const versionFile = outputPath + "/version.json";
      const content = `{"version": "${version}"}`;

      /** 如果路径存在则返回 true，否则返回 false。 */
      if (!fs.existsSync(outputPath)) {
        // 同步地创建目录。 返回 undefined 或创建的第一个目录路径（如果 recursive 为 true）。 这是 fs.mkdir() 的同步版本。
        fs.mkdirSync(outputPath, { recursive: true }); 
      }

      // http://nodejs.cn/api-v14/fs.html#fs_fs_writefilesync_file_data_options
      fs.writeFileSync(versionFile, content, {
        encoding: "utf8",
        flag: "w",
      });
    });
  }
}

module.exports = { FileListPlugin, VersionPlugin };
