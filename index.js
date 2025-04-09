let state = []
let CurrentIndex = 0
function useState(initialeValue) {

    const Index = CurrentIndex++
    state[Index] = state[Index] !== undefined ? state[Index] : initialeValue !== undefined ? initialeValue : null

    function setState(newValue) {
        // console.log(Array.isArray(state[0]));
        // console.log(typeof state[0]);
        if (typeof newValue === 'function') {
            state[Index] = newValue(state[Index])
        } else {
            state[Index] = newValue
        }

        render()
    }
    return [state[Index], setState]
}

function render() {
    CurrentIndex = 0
    const App = document.getElementById('App')
    App.innerHTML = ''
    MyApp()
}

function MyApp() {
    // let [items, setItems] = useState([])
    let [count, setcount] = useState(0)

    const App = document.getElementById('App')

    // const Input = document.createElement('input')
    // Input.value = name
    // Input.addEventListener('input', (e) => {
    //     setName(e.target.value)
    // })

    // const butt = document.createElement('button')
    renderElem(MyCreateElement(
        "button",
        {onclick : () => setcount(count+1)},
        `CLicked ${count} times`
    ), App)
    // const text = document.createElement('p')
    // text.textContent = "hello world"
    // Display array length or contents properly
    // butt.textContent = `Clicked ${count} Times`

    // const itemsList = document.createElement('ul')

    // Render each item in the array
    // items.forEach(item => {
    //     const li = document.createElement('li')
    //     li.textContent = item
    //     itemsList.appendChild(li)
    // })

    // butt.addEventListener('click', () => {
    //     // Update array immutably with function updater
    //     // setItems(prevItems => [...prevItems,name])
    //     setcount(count+1)
    // })
    // App.appendChild(text)
    // App.appendChild(butt)
    // App.appendChild(itemsList)
}
MyApp()

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//const ele = <h1 title="foo">Hello</h1>

// const element = {
//     type : "h1",
//     props : {
//         title : "foo",
//         childrens : "Hello"
//     },
// }

// const node = document.createElement(element.type);
// node["title"] = element.props.title;
// const text = document.createTextNode('')
// text["nodeValue"] = element.props.childrens
// node.appendChild(text)
// App.appendChild(node)



// const element = (
//     <div id="foo">
//       <a>bar</a>
//       <b />
//     </div>
//   )
//   const container = document.getElementById("root")
//   ReactDOM.render(element, container)

//   const ele = {
//     type : "div",
//     props : {
//         id : "foo",
//         childrens : {
//             type : "a",
//             props : {
//                 text : "bar",
//                 childrens : {
//                     type : "b"
//                 }
//             }
//         }
//     }
//   }




function MyCreateElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                if (typeof child === "object" || typeof child === "function") {
                    return child
                } else {
                    return MyCreateText(child)
                }
            })
        }
    }
}

function MyCreateText(text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: text,
            children: []
        }
    }
}

// const ele = render(
//     MyCreateElement(
//         "div",
//         { id: "foo" },
//         MyCreateElement("a", {className:"hh"}, "bar"),
//         MyCreateElement("b")
//     ), App
// )

function renderElem(element, container) {
    const dom = element.type !== "TEXT_ELEMENT" ? document.createElement(element.type) : document.createTextNode("")
    for (let [key, value] of Object.entries(element.props)) {
        if (key == "children") continue

        if (key.startsWith('on') && typeof value == "function" && element.type !== 'TEXT_ELEMENT') {
            dom.addEventListener(key.slice(2).toLowerCase(), value)
        }else{
            dom[key] = element.props[key]
        }
    }
    element.props.children.forEach(child => {
        renderElem(child, dom)
    });
    container.appendChild(dom)
}

// console.log(ele);
