export const pageview = (url) => {
    (window as Window & typeof globalThis & { gtag: any } ).gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    })
}
export const event = ({ action, params }) => {
    (window as Window & typeof globalThis & { gtag: any } ).gtag('event', action, params)
}