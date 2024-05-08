바닐라 자바스크립트 공부하는 저장소

1. ep01 : 기본 돔api 학습

## createElement()

```
let element = document.createElement(tagName[, options]);

```

HTML 문서에서, Document.createElement() 메서드는 지정한 tagName의 HTML 요소를 만들어 반환합니다

## querySelector()

```
document.querySelector(selectors);

```

공한 선택자 또는 선택자 뭉치와 일치하는 문서 내 첫 번째 Element를 반환합니다. 일치하는 요소가 없으면 null을 반환합니다.

## innerHtml()

```
document.body.innerHTML = "";
```

Element 속성(property) innerHTML 은 요소(element) 내에 포함 된 HTML 또는 XML 마크업을 가져오거나 설정합니다.

## innerText

```
const renderedText = htmlElement.innerText;
htmlElement.innerText = string;
```

HTMLElement 인터페이스의 innerText 속성은 요소와 그 자손의 렌더링 된 텍스트 콘텐츠를 나타냅니다.

## appendChild vs prependChild

전자는 자식의 가장 마지막 후자는 자식의 가장 첫번째에 노드를 붙인다

## querySelectorAll

노드리스트가 나오는데 이건 배열이 아니다 배열처럼 사용하려면 Array.from() 사용
