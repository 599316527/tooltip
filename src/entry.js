import {throttle} from 'lodash'
import Vue from 'vue'
import Tooltip from './Tooltip.vue'

Vue.config.productionTip = false

const selector = '[data-tooltip], [data-tooltip-img]'
install(document.body)

export function install (root) {
    function mouseoverHandler (evt) {
        let el = evt.target.closest(selector)
        if (!el) {
            return
        }
        tooltip.show(getItem(el))
    }
    const dMouseoverHandler = throttle(mouseoverHandler, 100)
    const vueRoot = document.createElement('div')
    const tooltip = new (Vue.extend(Tooltip))({el: vueRoot})

    function uninstall () {
        root.removeEventListener('mouseover', dMouseoverHandler)
        root.removeEventListener('click', mouseoverHandler)
        vueRoot.parentNode.removeChild(vueRoot)
        tooltip.$destroy()
    }

    root.appendChild(vueRoot)
    root.addEventListener('mouseover', dMouseoverHandler)
    root.addEventListener('click', mouseoverHandler)

    return uninstall
}

function getItem(el) {
    let type, content
    if (el.dataset.tooltipImg) {
        type = 'image'
        content = el.dataset.tooltipImg
    } else {
        type = 'text'
        content = el.dataset.tooltip
    }
    return {el, type, content}
}