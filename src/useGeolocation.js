import { onUnmounted, onMounted, ref } from 'vue'

export function useGeolocation() {
    const coords = ref({ lattitude: 0, longitude: 0})
    const isSupported = 'navigator' in window && 'geolocation' in navigator

    let watcher = null
    onMounted(() => {
        if(isSupported)
            watcher = navigator.geolocation.watchPosition(
                posistion => (coords.value = posistion.coords)
            )
    })
    onUnmounted(() => {
        if(watcher) navigator.geolocation.clearWatch(watcher)
    })

    return {coords, isSupported}
}
