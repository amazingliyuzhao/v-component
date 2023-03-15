/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
import SVGA, { Player } from "svgaplayerweb";

export enum SvgaKey {
  DAZUO = "dazuo",
}

export enum PkSvgaKey {
  PK_WIN = "pkWin",
}

const pkSvgaMap: Record<
  PkSvgaKey,
  {
    svgaFile: string;
  }
> = {
  [PkSvgaKey.PK_WIN]: {
    svgaFile: "",
  },
};

const svgaMap: Record<
  SvgaKey,
  {
    svgaFile: string;
  }
> = {
  [SvgaKey.DAZUO]: {
    svgaFile: "",
  },
};

export default class SvgaHelp {
  // @ts-ignore
  static svgaCache: Record<
    SvgaKey | PkSvgaKey,
    {
      canvasDom: HTMLDivElement;
      player: Player;
    }
  > | null = {};

  static init() {
    if (!this.svgaCache) {
      // @ts-ignore
      this.svgaCache = {};
    }
    Object.keys(svgaMap).forEach(async (key) => {
      const _key = key as PkSvgaKey;
      this.loadSvga(_key);
    });
  }

  static initPkSvga() {
    if (!this.svgaCache) {
      // @ts-ignore
      this.svgaCache = {};
    }
    Object.keys(pkSvgaMap).forEach(async (key) => {
      const _key = key as SvgaKey;
      this.loadSvga(_key, true);
    });
  }

  static async playSvga(
    anName: SvgaKey | PkSvgaKey,
    wrapDom: HTMLDivElement,
    loop = 1,
    playEndCallBack?: () => void
  ) {
    if (!wrapDom) return;

    if (!this.svgaCache![anName]) {
      const isPk = Object.values(PkSvgaKey).some((v) => v === anName);
      await this.loadSvga(anName, isPk);
    }
    const { player, canvasDom } = this.svgaCache![anName];
    wrapDom.innerHTML = "";
    wrapDom.appendChild(canvasDom);
    player.loops = loop;
    player.onFinished(() => {
      if (playEndCallBack) {
        playEndCallBack();
      }
    });

    player.startAnimation();
  }

  static playNewSvga(
    svgaUrl: string,
    element: HTMLDivElement | HTMLCanvasElement | string,
    playEndCallBack?: () => void,
    loop = 1
  ) {
    if (!svgaUrl || !element) {
      return;
    }

    const player = new SVGA.Player(element);
    const parser = new SVGA.Parser();
    player.loops = loop;
    player.clearsAfterStop = false;
    player.onFinished(() => {
      if (playEndCallBack) {
        playEndCallBack();
      }
    });
    parser.load(svgaUrl, (videoItem) => {
      player.setVideoItem(videoItem);
      player.startAnimation();
    });
  }

  static async loadSvga(
    svgaKey: SvgaKey | PkSvgaKey,
    isPk = false
  ): Promise<{
    player: Player;
    canvasDom: HTMLDivElement;
  }> {
    if (this.svgaCache![svgaKey]) return Promise.resolve(this.svgaCache![svgaKey]);
    const canvasDom = document.createElement("div");
    const { svgaFile } = isPk ? pkSvgaMap[svgaKey as PkSvgaKey] : svgaMap[svgaKey as SvgaKey];
    canvasDom.style.width = "100%";
    canvasDom.style.height = "100%";
    const player = new SVGA.Player(canvasDom);
    const parser = new SVGA.Parser();

    player.clearsAfterStop = false;
    player.setContentMode("AspectFill");

    return new Promise((rev, res) => {
      parser.load(svgaFile, (videoItem) => {
        player.setVideoItem(videoItem);
        this.svgaCache![svgaKey] = { player, canvasDom };
        rev({
          player,
          canvasDom,
        });
      });
    });
  }
}
