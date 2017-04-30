
export default class MainPage {

  constructor() {
    this.createPage();
  }

  createPage() {
    const searchBox = document.createElement('input');
    document.body.appendChild(searchBox);
    searchBox.id = 'searchBox';
  }

}
