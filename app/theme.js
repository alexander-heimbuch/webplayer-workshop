const randomColor = () => '#'+(0x1000000 + (Math.random())*0xfffff).toString(16).substr(1, 6)

export const switchTheme = (action, state, dispatch) => {
    if (action.type === 'SET_THEME') {
        return
    }

    dispatch({
        type: 'SET_THEME',
        payload: {
            main: randomColor()
        }
    })
}
