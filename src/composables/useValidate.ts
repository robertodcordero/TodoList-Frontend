export function useValidate() {
  function setInvalid(input: HTMLElement | null) {
    if (input) {
      if (!input.classList.contains('invalid')) {
        input.classList.add('invalid')
      }
    }
  }

  function setValid(input: HTMLElement | null) {
    if (input) {
      if (input.classList.contains('invalid')) {
        input.classList.remove('invalid')
      }
    }
  }
  return { setInvalid, setValid }
}
