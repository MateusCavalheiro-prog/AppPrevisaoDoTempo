const showLoader = () => {
  loader.classList.remove("hide")
  mainContent.classList.add('hide')
}

const hideLoader = () => {
  loader.classList.add("hide")
  mainContent.classList.remove('hide')
}