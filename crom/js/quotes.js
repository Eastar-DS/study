const quotes = [
    {
        quote : "지금 공부 안 하면 더울 때 더운 데서 일하고 추울 때 추운 데서 일한다.",
        author : "박명수"
    },
    {
        quote : "늦었다고 생각할 땐 너무 늦은거다. 그러니 지금 당장 시작해라.",
        author : "박명수"
    },
    {
        quote : "(내 너 그럴 줄 알았다) 알았으면 제발 미리 말 해줘라",
        author : "박명수"
    },
    {
        quote : "어려운 길은 길이 아니다",
        author : "박명수"
    },
    {
        quote : "즐길 수 없으면 피하라",
        author : "박명수"
    },
    {
        quote : "성공은 1% 재능과 99%의 빽",
        author : "박명수"
    },
    {
        quote : "내일도 할 수 있는 일을 굳이 오늘 할 필요 없다 ",
        author : "박명수"
    },
    {
        quote : "가는 말이 고우면 얕본다",
        author : "박명수"
    },
    {
        quote : "고생 끝에 골병 난다",
        author : "박명수"
    },
    {
        quote : "참을 인 세 번이면 호구",
        author : "박명수"
    },
    {
        quote : "티끌 모아 티끌",
        author : "박명수"
    },
    {
        quote : "원수는 회사에서 만난다",
        author : "박명수"
    },
    {
        quote : "헌신하면 헌신 짝 된다",
        author : "박명수"
    },
    {
        quote : "죽음과 결혼은 뒤로 미룰수록 좋다 ",
        author : "박명수"
    },
    {
        quote : "대문으로 가난이 찾아오면 사랑은 창문으로 도망간다",
        author : "박명수"
    }
]

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)]

quote.innerText = todaysQuote.quote
author.innerText = todaysQuote.author