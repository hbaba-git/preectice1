'use strict';

{
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    const scoreLabel = document.querySelector('#result > p');
    const quizSet = shuffle([//クイズ一覧
        { q: '世界で一番大きな湖は?', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
        { q: '2の8乗は', c: ['256', '64', '1024'] },
        { q: '次のうち、最初にリリースされた言語は?', c: ['Python', 'JavaScript', 'HTML'] },
    ]);
    let currentNum = 0;
    let isAnswered;//回答有無を判定するフラグ
    let score = 0;//正答数をカウント


    //関数
    function shuffle(arr) {//選択肢を順不同にする
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {//正誤判定する
        if (isAnswered) {//回答有無を判定する
            return;
        }
        isAnswered = true;//回答済みフラグを立てる

        if (li.textContent === quizSet[currentNum].c[0]) {//回答結果を返す
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {//クイズを設定する
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;//問題文の表示

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'Show Score'
        }
    }


    //mian
    setQuiz();

    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length} `
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }

    });

}