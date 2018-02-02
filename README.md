# Podlove Web Player v4 - Workshop

[![Greenkeeper badge](https://badges.greenkeeper.io/alexander-heimbuch/webplayer-workshop.svg)](https://greenkeeper.io/)

---

## Agenda

1. Architektur
2. Embedding
3. Erweiterung

---

## 1 - Architektur

- View Layer: VueJS
- Statemanagement: Redux
- Seiteneffekte: Effects
- Audio Backend: @podlove/html5-audio-driver

----

## A - View Layer: VueJS

- Open source View Library
- Ähnlich wie React: Data driven rendering
- Components bestehen aus template, script sowie style in einem file
- Component Encapsulation mit properties
- Component Transclusion mit rendering slots

----

```javascript
<template>
  <div class="podlove" :class="{[display]: display, [runtime.platform]: runtime.platform}" :style="appStyle">
    <HeaderComponent></HeaderComponent>
    <PlayerComponent></PlayerComponent>
    <TabsComponent></TabsComponent>
  </div>
</template>
```

----

```javascript
<script>
  import HeaderComponent from './header/Header.vue'
  import PlayerComponent from './player/Player.vue'
  import TabsComponent from './tabs/Tabs.vue'

  export default {
    name: 'app',
    data () {
      return {
        display: this.$select('display'),
        runtime: this.$select('runtime'),
        theme: this.$select('theme')
      }
    },
    computed: {
      appStyle () {
        return {
          background: this.theme.background
        }
      }
    },
    components: {
      HeaderComponent,
      PlayerComponent,
      TabsComponent
    }
  }
</script>
```

----

```
<style lang="scss">
  @import '~styles/variables';

  .podlove {
    display: block;
    position: relative;
    width: 100%;
    max-width: $width-xl;
    min-width: $width-xs;

    @include font();
  }
</style>
```

----

## B - Statemanagement: Redux

- Aktuell gehypter Ansatz zum management von state
- Ein globaler State für UIs
- State wird in einem _Store_ gehalten
- Store berechnet State mittels _Reducern_
- State wird mit _Actions_ geändert

----

### Actions

- Jede Interaktion mit dem Player wird über eine Aktion ausgedrückt
- Besteht immer aus einem typ und einem payload:

```javascript
{
    type: 'UPDATE_PLAYTIME',
    payload: 5000
}
```

----

### Reducer

- Für jeden Teilbaum
- Pure Function
- Parameter (sub)State und Action

----

```javascript
import { get } from 'lodash'
import { timeToSeconds } from 'utils/time'

export function playtime (state = 0, action) {
  switch (action.type) {
    case 'INIT':
      const playtime = state > 0 ? state : get(action.payload, 'playtime', state)
      return timeToSeconds(playtime)
    case 'UPDATE_PLAYTIME':
      return parseInt(action.payload, 10)
    case 'SET_PLAYTIME':
      return parseInt(action.payload, 10)
    default:
      return state
  }
}
```

----

## C - Seiteneffekte

- Alles was als Auswirkung eine Veränderung des Zustandes hat
- Beispiele:
    - Nutzerinteraktionen
    - Audio Backends
    - Systemzustände
    - Zusammenhänge zwischen Substates (bspw. Chapter und Playtime)

----

### Verwaltung: Effects

- Middleware für Redux Store
- _Effect_ kann eine _Action_ auslösen
- _Effect_ kann eine _Action_ auslösen
- _Effect_ wird immer nach einer _State_ Änderung ausgef¨¨hrt
- Bsp: Audio Backend

----

![Redux Store](/images/redux.gif)

----

## D - Audio Backend

[html5-audio-driver](https://github.com/podlove/html5-audio-driver)

---

## 2 - Embedding

----

### Assets

- Gebundelten assets in npm paket: `@podlove/podlove-web-player-4`
- `/dist` Ordner
- Funtion auf globalen window objekt: `podlovePlayer`

----

```javascript
<div id="example"></div>
<script src="embed.js"></script>
<script>
    podlovePlayer('#example', './fixtures/example.json');
</script>
```

----

`podlovePlayer` akzeptiert 2 Parameter:

- Selektor oder DOM node
- Konfiguration: Objekt oder Pfad zu config file

----

### Konfiguration

[Übersicht](https://docs.podlove.org/podlove-web-player/config.html)
[Playground](https://docs.podlove.org/podlove-web-player/playground.html)

----

### Live Mode

- Player in spezieller Variante
- `mode: 'live'`
- Beispiel: [Live Mode](https://docs.podlove.org/podlove-web-player/live.html)

---

## 3 Erweiterung

----

```javascript
<div id="example"></div>
<script src="embed.js"></script>
<script>
    podlovePlayer('#example', './fixtures/example.json').then(store => {
        store.subscribe...
        store.dispatch...
        store.getState...
    })
</script>
```
