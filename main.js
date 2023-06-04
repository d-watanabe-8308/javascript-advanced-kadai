//変数の初期化。''は文字列の長さが0であることを意味する。
let untyped = '';
let typed = '';
let score = 0;

//htmlの要素を取得する。
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
  ];

//ランダムなテキストを表示する。
const createText = () => {

    //最初に変数の初期化をしてたのにここでの初期化は意味がある？
    typed = '';
    typedfield.textContent = typed;

    //ランダムな数値の生成
    let random= Math.floor(Math.random() * textLists.length);

    //ランダムに生成した数値から該当する順番のテキストを抽出し表示する。
    untyped = textLists[random];
    untypedfield.textContent = untyped;

};


//間違ったキーを押した時に背景色が変わる処理
//正しいキーを押した時
const keyPress = e => {

    //キープレスされたキーの値(e.key)と、未入力文字列(untyped)の先頭の1文字(untyped.substring(0, 1))を比較します。
    //もし、キープレスされたキーと先頭の文字が異なる場合は、以下の処理が実行されます。
    //!==は不等号を意味し、比較する文字同士が一致しない時にTRUEとなる。
    if(e.key !== untyped.substring(0, 1)) {

    //wrapというHTML要素のクラスリストに、mistypedというクラスを追加します。
    //これによって、スタイリングが適用され、入力が誤っていることを視覚的に示すことができます。
        wrap.classList.add('mistyped');

    //100ミリ秒後に、wrapのクラスリストからmistypedクラスを削除します。
    //つまり、一時的な間違い表示のスタイリングを削除することで、正しい入力へのフィードバックをリセットします。
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);

    //間違ったキーが入力された場合は、その時点で関数を終了します。
    //これにより、正しいキーが入力された場合の処理は実行されません。
        return;

    }

    //入力が正解だった場合の処理
    //score++でスコアの値を1増やす
    //untypedの変数を取得しtypedに代入する
    //untypedの先頭の文字を1文字削除し、残りの文字をuntypedに代入する
    //typedfieldとuntypedfieldの値を先ほどのtypedとuntypedの値から代入する
    //untypedの文字が無くなったら、新しいテキストを生成する

    score++;
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    
    if(untyped === '') {
    createText();
    }
}

//ランクの判定を行う
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';
   
    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
    } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます!`;    
    }
   
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
  };

// ゲームを終了
const gameOver = id => {
    clearInterval(id);
  
    const result = confirm(rankCheck(score));
  
    // OKボタンをクリックされたらリロードする
    if(result == true) {
      window.location.reload();
    }
  };

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素（p要素）を取得する
    let time = count.textContent;
  
    const id = setInterval(() => {
  
      // カウントダウンする
      time--;
      count.textContent = time;
  
      // カウントが0になったらタイマーを停止する
      if(time <= 0) {
        gameOver(id);
      }
    }, 1000);
  };

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();
  
    // ランダムなテキストを表示する
    createText();
  
    // 「スタート」ボタンを非表示にする
    start.style.display = 'none';
  
    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
  });
  
untypedfield.textContent = 'スタートボタンで開始';