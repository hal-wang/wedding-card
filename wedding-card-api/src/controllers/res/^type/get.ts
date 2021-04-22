import {
  Action,
  AppInstance,
  HttpResult,
  HttpResultError,
} from "@hal-wang/cloudbase-access";
import linq = require("linq");

export default class extends Action {
  private async getCloudPath(): Promise<string> {
    const tempFile = "t";
    const res = await AppInstance.instance.app.getUploadMetadata({
      cloudPath: tempFile,
    });
    const { fileId } = res.data;
    return fileId.substr(0, fileId.length - tempFile.length - 1);
  }
  cloudPath!: string;

  async do(): Promise<HttpResult> {
    const type = this.requestParams.query.type;
    this.cloudPath = await this.getCloudPath();

    switch (type) {
      case "album":
        return this.ok(await this.getAlbum());
      case "music":
        const MUSIC = process.env.MUSIC;
        if (!MUSIC) {
          return this.badRequestMsg({
            message:
              '请添加环境变量"MUSIC"，值为音乐文件名，并在云存储中上传对应文件',
          });
        }
        return this.ok(await this.getFile(MUSIC));
      case "cover":
        const COVER = process.env.COVER;
        if (!COVER) {
          return this.badRequestMsg({
            message:
              '请添加环境变量"COVER"，值为封面图片文件名，并在云存储中上传对应文件',
          });
        }
        return this.ok(await this.getFile(COVER));
      case "favicon":
        const FAVICON = process.env.FAVICON;
        if (!FAVICON) {
          return this.badRequestMsg({
            message:
              '请添加环境变量"FAVICON"，值为图标文件名，并在云存储中上传对应文件',
          });
        }
        return this.ok(await this.getFile(FAVICON));
      default:
        return this.badRequestMsg({ message: "unknown type" });
    }
  }

  async getAlbum(): Promise<string[]> {
    const ALBUM = process.env.ALBUM;
    if (!ALBUM) {
      throw new HttpResultError(
        this.badRequestMsg({
          message:
            '请添加环境变量"ALBUM", 值为多个图片名称，逗号分隔，如"1.jpg,beautiful.png"，并在云存储的"album"文件夹中上传对应图片',
        })
      );
    }

    const imgs = ALBUM.split(",");
    if (!imgs || !imgs.length || (imgs.length == 1 && !imgs[0])) {
      return [];
    }
    const fileRes = await AppInstance.instance.app.getTempFileURL({
      fileList: imgs.filter((img) => `${this.cloudPath}/album/${img}`),
    });
    if (!fileRes.fileList || !fileRes.fileList.length) {
      return [];
    }
    return linq
      .from(fileRes.fileList)
      .select((file) => file.tempFileURL)
      .toArray();
  }

  async getFile(fileName: string): Promise<{ url: string }> {
    const fileRes = await AppInstance.instance.app.getTempFileURL({
      fileList: [`${this.cloudPath}/${fileName}`],
    });
    if (!fileRes.fileList || !fileRes.fileList.length) {
      return { url: "" };
    }
    return {
      url: fileRes.fileList[0].tempFileURL,
    };
  }
}
