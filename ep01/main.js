/*
  총 4개의 practice 가 있고,
  if 내의 false 를 true 로 바꿔서
  하나 하나 실행해보세요.
*/

// begin - practice #1
if (false) {
  document.querySelector("#app").innerHTML = `
    <button type="button" class="hello1">Check the input</button>
    <button type="button" class="hello2">Hello2</button>
    <button type="button" class="hello3">Hello3</button>
  
    <div>
      <input class="name" type="text" placeholder="Type your name:" />
    </div>
  
    <div class="parent-of-button">
      <button class="helloworld-button" type="button">
        <span>Hello</span>
        <span>World</span>
      </button>
    </div>
  `;

  document.querySelector("button").addEventListener("click", (event) => {
    //가장 첫번째 버튼
    const input = document.querySelector(".name");
    console.log(input.value);
  });

  document.querySelector(".name").addEventListener("change", (event) => {
    console.log(event.target.value);
  }); //change vs input
  //change는 입력필드를 떠날때 한번 발생 vs input 이벤트는 입력필드 내용이 변경될때 마다 발생한다

  document
    .querySelector(".helloworld-button")
    .addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("event from button", event);
    });

  document
    .querySelector(".parent-of-button")
    .addEventListener("click", (event) => {
      console.log("event from div", event);
    });

  document.querySelector(".name").addEventListener("keyup", (event) => {
    console.log("input keyup", event);
  });

  document.body.addEventListener("keyup", (event) => {
    console.log(event.key);
  });
}
// end - practice #1

// begin - practice #2
if (false) {
  document.querySelector("#app").innerHTML = `
  <input />
  <button>Click</button>
`;

  let count = 0;
  setInterval(() => {
    count += 1;
    document.querySelector("#app").innerHTML = `
  <input />
  <button>Click</button>
  <p>count: ${count}</p>
`;
    document.querySelector("button").addEventListener("click", () => {
      console.log("클릭");
      const currentValue = document.querySelector("input").value;

      document.querySelector("input").value = currentValue + "*";
    });
  }, 5000); //초기화 이후 핸들러가 자동으로 등록되지 않음 그래서 직접 등록해야 한다

  document.querySelector("button").addEventListener("click", () => {
    console.log("클릭");
    const currentValue = document.querySelector("input").value;

    document.querySelector("input").value = currentValue + "*";
  });
}
// end - practice #2

// practice #3
if (false) {
  document.querySelector("#app").innerHTML = `
    <button class="btn-add-card" type="button">Add card</button>
  
    <div class="cards"></div>
  `;

  // const cards = [

  // ]
  let cardCount = 0;
  document.querySelector(".btn-add-card").addEventListener("click", () => {
    cardCount += 1;
    const card = document.createElement("div"); //div태그를 만든다
    card.className = "card";
    card.innerHTML = `
      <p>Card #${cardCount}</p>
      <button class="btn-hello" type="button" data-number="${cardCount}">hello</button>
    `;
    const myCardCount = cardCount;
    // card.querySelector(".btn-hello").addEventListener("click", () => {
    //   console.log(`💡 hello! ${myCardCount}`);
    // });
    document.querySelector(".cards").appendChild(card); //자식의 가장 끝에 삽입 vs prependChild
  });

  document.querySelector(".cards").addEventListener("click", (event) => {
    // console.log("click from .cards", event);
    const maybeButton = event.target;
    console.log(maybeButton);
    if (maybeButton.matches(".btn-hello")) {
      // const cardName = maybeButton.parentElement.children[0].innerText;
      // const cardNumber = parseInt(cardName.split(" ")[1].slice(1), 10);
      // console.log("button is clicked!", cardNumber);
      console.log(
        "button is clicked!",
        maybeButton.getAttribute("data-number")
      );
    } else {
      console.log("something else. let's ignore this.");
    }
  });
}
// end - practice #3

// begin - practice #4
// 영상엔 없는 보너스 예제!
// 네모 상자 안에 마우스를 올려 놓으면 그 좌표를 찍어서 보여줍니다.
// `style.css` 파일에 이 예제를 위한 기본 스타일을 만들어 놓았습니다.
if (false) {
  document.querySelector("#app").innerHTML = `
    <div class="practice-4">
      <div class="box"></div>
      <div class="info">sdf</div>
    </div>
  `;

  const container = document.querySelector(".practice-4");
  const box = container.querySelector(".box");
  const info = container.querySelector(".info");

  box.addEventListener("mouseenter", (event) => {
    container.classList.add("hover");
  });
  box.addEventListener("mouseleave", (event) => {
    container.classList.remove("hover");
  });
  box.addEventListener("mousemove", (event) => {
    info.innerHTML = `
      Mouse position: (${event.x}, ${event.y})
    `;
  });
}
// end - practice #4
