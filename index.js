let state = []
let CurrentIndex = 0
function useState(initialeValue) {
    
    const Index = CurrentIndex++
    state[Index] = state[Index] !== undefined ? state[Index] : initialeValue
    
    function setState(newValue) {
        console.log(newValue);
        state[Index] = newValue
        render()
    }
    return [state[Index], setState]
}

function render() {
    CurrentIndex = 0
    let [count, setCount] = useState(0)
    let [T, setText] = useState('a')
    const App = document.getElementById('App')
    App.innerHTML = ''
    const butt = document.createElement('button');
    butt.textContent = `Clicked ${count} Time`;
    const tt = document.createElement('p')
    tt.textContent = T
    butt.addEventListener('click',() => {
        setCount(count+1)
        setText(T+='a')
        render()
    })
    App.appendChild(butt)
    App.appendChild(tt)
}

render()
