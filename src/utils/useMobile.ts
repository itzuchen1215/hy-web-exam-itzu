export default function useMobile() {
  function isMobile(): boolean {
    try {
      document.createEvent('TouchEvent')
      return true
    } catch (e) {
      return false
    }
  }

  return {
    isMobile
  }
}
