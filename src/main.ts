(function(){

  /** 時刻を監視し音声を再生するタスクのID */
  let intervalId: number | null = null;

  /** 再生するオーディオ要素 */
  let mainAudio: HTMLAudioElement;

  /** ON/OFF スイッチ */
  let autoAudioPower: HTMLInputElement;

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
   * 定期的に実行する関数。
   * 
   * 時刻を監視し音声を再生する。
   */
  function intervalFunction(): void {
    console.debug(`startConditionSatisfied() = ${!!startConditionSatisfied()}`);

    if(autoAudioPower.checked && mainAudio.paused && startConditionSatisfied()) {
      console.debug("play()");
      mainAudio.play();
    }
    
  }

  /**
   * 音声ファイルがロードされたときに呼び出す。
   */
  function onLoadAudio(): void {

    // 監視するインターバルがない場合、インターバルを開始
    if(intervalId == null) {
      setInterval(intervalFunction, 100);
    }
    
  }

  window.onload = function(){
    mainAudio = document.querySelector<HTMLAudioElement>("#mainAudio")!
    mainAudio.onloadeddata = onLoadAudio;

    autoAudioPower = document.querySelector<HTMLInputElement>("#autoAudioPower")!;
  };
})();