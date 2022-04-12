import { Action } from "@sfajs/router";
import { Inject } from "@sfajs/inject";
import { CbappService } from "../../services/cbapp.service";

/**
 * @openapi
 * /res/{type}:
 *   get:
 *     tags:
 *       - res
 *     description: Get cloud storage resources
 *     parameters:
 *       - name: type
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *           default: favicon
 *           enum:
 *             - album
 *             - music
 *             - cover
 *             - favicon
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Can't find environment variable, or the type is error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export default class extends Action {
  @Inject
  private readonly cbappService!: CbappService;

  private async getCloudPath(): Promise<string> {
    const tempFile = "t";
    const res = await this.cbappService.app.getUploadMetadata({
      cloudPath: tempFile,
    });
    const { fileId } = res.data;
    return fileId.substr(0, fileId.length - tempFile.length - 1);
  }
  cloudPath!: string;

  async invoke(): Promise<void> {
    const type = this.ctx.req.params.type;
    this.cloudPath = await this.getCloudPath();

    switch (type) {
      case "album":
        const albumStr = process.env.ALBUM;
        if (!albumStr) {
          this.badRequestMsg({
            message:
              '请添加环境变量"ALBUM", 值为多个图片名称，逗号分隔，如"1.jpg,beautiful.png"，并在云存储的"album"文件夹中上传对应图片',
          });
        } else {
          this.ok(await this.getAlbum(albumStr));
        }
        return;
      case "music":
        const MUSIC = process.env.MUSIC;
        if (!MUSIC) {
          this.badRequestMsg({
            message:
              '请添加环境变量"MUSIC"，值为音乐文件名，并在云存储中上传对应文件',
          });
          return;
        } else {
          this.ok(await this.getFile(MUSIC));
          return;
        }
      case "cover":
        const COVER = process.env.COVER;
        if (!COVER) {
          this.badRequestMsg({
            message:
              '请添加环境变量"COVER"，值为封面图片文件名，并在云存储中上传对应文件',
          });
          return;
        } else {
          this.ok(await this.getFile(COVER));
          return;
        }
      case "favicon":
        const FAVICON = process.env.FAVICON;
        if (!FAVICON) {
          this.badRequestMsg({
            message:
              '请添加环境变量"FAVICON"，值为图标文件名，并在云存储中上传对应文件',
          });
          return;
        } else {
          this.ok(await this.getFile(FAVICON));
          return;
        }
      default: {
        this.badRequestMsg({ message: "unknown type" });
        return;
      }
    }
  }

  async getAlbum(albumStr: string): Promise<string[]> {
    const imgs = albumStr.split(",");
    if (!imgs || !imgs.length || (imgs.length == 1 && !imgs[0])) {
      return [];
    }
    const fileRes = await this.cbappService.app.getTempFileURL({
      fileList: imgs.map((img) => `${this.cloudPath}/album/${img}`),
    });
    if (!fileRes.fileList || !fileRes.fileList.length) {
      return [];
    }

    return fileRes.fileList.map((file) => file.tempFileURL);
  }

  async getFile(fileName: string): Promise<{ url: string }> {
    const fileRes = await this.cbappService.app.getTempFileURL({
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
