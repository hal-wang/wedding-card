import { Action } from "@sfajs/router";
import linq = require("linq");
import * as tcb from "@cloudbase/node-sdk";
import { ResponseError } from "sfa";

export default class extends Action {
  private async getCloudPath(): Promise<string> {
    const tempFile = "t";
    const res = await this.ctx.bag<tcb.CloudBase>("CB_APP").getUploadMetadata({
      cloudPath: tempFile,
    });
    const { fileId } = res.data;
    return fileId.substr(0, fileId.length - tempFile.length - 1);
  }
  cloudPath!: string;

  async invoke(): Promise<void> {
    const type = this.ctx.req.query.type;
    this.cloudPath = await this.getCloudPath();

    switch (type) {
      case "album":
        this.ok(await this.getAlbum());
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

  async getAlbum(): Promise<string[]> {
    const ALBUM = process.env.ALBUM;
    if (!ALBUM) {
      this.badRequestMsg({
        message:
          '请添加环境变量"ALBUM", 值为多个图片名称，逗号分隔，如"1.jpg,beautiful.png"，并在云存储的"album"文件夹中上传对应图片',
      });
      throw new ResponseError();
    }

    const imgs = ALBUM.split(",");
    if (!imgs || !imgs.length || (imgs.length == 1 && !imgs[0])) {
      return [];
    }
    const fileRes = await this.ctx.bag<tcb.CloudBase>("CB_APP").getTempFileURL({
      fileList: imgs.map((img) => `${this.cloudPath}/album/${img}`),
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
    const fileRes = await this.ctx.bag<tcb.CloudBase>("CB_APP").getTempFileURL({
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
