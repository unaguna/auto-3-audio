(function(){

  /** 時刻を監視し音声を再生するタスクのID */
  let intervalId: number | null = null;

  /** 再生するオーディオ要素 */
  let mainAudio: HTMLAudioElement;

  /**
   * 再生開始条件を満たすかどうかを返す。
   */
  function startConditionSatisfied(): boolean {
    // TODO: 本実装
    return (window as any).startConditon;
  }

  /**
   * 定期的に実行する関数。
   * 
   * 時刻を監視し音声を再生する。
   */
  function intervalFunction(): void {
    console.debug(`startConditionSatisfied() = ${!!startConditionSatisfied()}`);

    if(mainAudio.paused && startConditionSatisfied()) {
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
  };
})();