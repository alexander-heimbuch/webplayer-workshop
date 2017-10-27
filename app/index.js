// Load application styles
import 'styles/index.scss'

// PLayer Files
import 'scripts/embed'

// Config
import exampleConfig from 'fixtures/example.json'

// Example 1: Auto Play
// import { autoPlay } from './auto-play'
// autoPlay(store.dispatch)

// Example 2: SwitchTheme
// import { switchTheme } from './theme'
// switchTheme(action, store.getState(), store.dispatch)

// Example 3: Playlist
// import { playlist, onChange } from './playlist'
// playlist(store.dispatch)
// onChange(action)

const getAction = getState => getState().lastAction

// Integration
podlovePlayer('#example', exampleConfig).then(store => {
    store.subscribe(() => {
        const action = getAction(store.getState)
    })
})
