import nsfw from 'fixtures/nsfw.json'
import cre from 'fixtures/cre.json'
import freakshow from 'fixtures/freakshow.json'

const playlistNode = document.getElementById('playlist')
const createEpisodeNode = list => episode => {
    const episodeNode = document.createElement('li')

    episodeNode.innerText = episode.name
    list.appendChild(episodeNode)

    return episodeNode
}

let currentEpisode

const episodes = [{
    name: 'NSFW078 Notbrot',
    config: nsfw
}, {
    name: 'CRE198 Pornographie',
    config: cre
}, {
    name: 'FS201 Multidimensionale Fisimatentendynamik',
    config: freakshow
}]

export const playlist = (dispatch) => {

    const episodeAppender = createEpisodeNode(playlistNode, dispatch)

    episodes.forEach((episode, index) => {
        const node = episodeAppender(episode)

        node.addEventListener('click', () => {
            dispatch({
                type: 'INIT',
                payload: episode.config
            })

            currentEpisode = index
        })
    })
}

export const onChange = (action) => {

}
