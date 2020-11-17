(function(){

  /** 時刻を監視し音声を再生するタスクのID */
  let intervalId: number | null = null;

  /** 再生するオーディオ要素 */
  let mainAudio: HTMLAudioElement;

  /** オーディオファイル選択 */
  let selectSoundFile: HTMLInputElement;

  /** ON/OFF スイッチ */
  let autoAudioPower: HTMLInputElement;

  /** 時計（時、10の位） */
  let clockDisitH1: HTMLImageElement;

  /** 時計（時、1の位） */
  let clockDisitH2: HTMLImageElement;

  /** 時計（分、10の位） */
  let clockDisitM1: HTMLImageElement;

  /** 時計（分、1の位） */
  let clockDisitM2: HTMLImageElement;

  /**
   * 最後に自動再生した時の時刻
   * 
   * 手動で停止した場合、同じ時刻である間は再び再生しない。
   */
  let lastAutoPlayedTime: string | null;

  /**
   * 0埋めする
   * 
   * @param n 0埋め対象の文字列
   */
  function zeroPadding(n: string | number) {
    return (`00` + n).slice(-2);
  };

  /**
   * 現在時刻を返す。
   */
  function getTime(): string {
    // TODO: 本実装
    return (window as any).time || "";

    const date = new Date();
    return `${zeroPadding(date.getHours())}:${zeroPadding(date.getMinutes())}`;
  }

  /**
   * 再生開始条件を満たすかどうかを返す。
   */
  function startConditionSatisfied(): boolean {
    const time = getTime();
    console.debug(`getTime() = ${time}`);

    return time.indexOf("3") >= 0;
  }

  /**
   * 時計を更新する
   * 
   * @param time "hh:mm" 形式の時刻
   */
  function updClock(time: string): void {
    clockDisitH1.src = `./img/d${time[0] ?? "h"}.png`;
    clockDisitH2.src = `./img/d${time[1] ?? "h"}.png`;
    clockDisitM1.src = `./img/d${time[3] ?? "h"}.png`;
    clockDisitM2.src = `./img/d${time[4] ?? "h"}.png`;
  }

  /**
   * 定期的に実行する関数。
   * 
   * 時刻を監視し音声を再生する。
   */
  function intervalFunction(): void {
    console.debug(`startConditionSatisfied() = ${!!startConditionSatisfied()}`);
    const now = getTime();

    // 時計を更新
    updClock(now);

    if(autoAudioPower.checked && mainAudio.paused && startConditionSatisfied() && lastAutoPlayedTime !== now) {
      lastAutoPlayedTime = getTime();
      console.debug("play()");
      mainAudio.play();
    }
    
  }

  window.onload = function(){
    mainAudio = document.querySelector<HTMLAudioElement>("#mainAudio")!

    autoAudioPower = document.querySelector<HTMLInputElement>("#autoAudioPower")!;

    selectSoundFile = document.querySelector<HTMLInputElement>("#selectSoundFile")!;
    selectSoundFile.onchange = function(event: Event) {
      const file = (event?.target as HTMLInputElement)?.files?.[0];
      if (!(file instanceof File)) {
          window.alert('Please upload file.');
      } else if (file.type.indexOf('audio') === -1) {
          window.alert('Please upload audio file.');
      } else {
        const src = window.URL.createObjectURL(file);
        mainAudio.src = src;
        mainAudio.pause();
      }
    }

    clockDisitH1 = document.querySelector<HTMLImageElement>("#clockDisitH1")!
    clockDisitH2 = document.querySelector<HTMLImageElement>("#clockDisitH2")!
    clockDisitM1 = document.querySelector<HTMLImageElement>("#clockDisitM1")!
    clockDisitM2 = document.querySelector<HTMLImageElement>("#clockDisitM2")!

    // 監視するインターバルがない場合、インターバルを開始
    if(intervalId == null) {
      setInterval(intervalFunction, 100);
    }
  };
})();