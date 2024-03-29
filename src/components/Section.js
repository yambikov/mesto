export default class Section {
  constructor({ renderer/* создает карточку */ }, selector /* место, куда нужно будет добавить карточку */) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  // для каждого item запускает функцию addItem
  renderItems(data) {
    data.forEach(item => {
      this.addItem(item);
    });
  }
  // addItem добавляет в разметку результат работы рендерера, который создает карточку
  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
};



/* Класс для управления секцией

  <section class="elements">
          ... сюда добавляет элементы
  </section> 
 
 */