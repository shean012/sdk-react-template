import { observable, action } from "mobx"

class ExampleStore {
  @observable exampleData = ''

  @action setData(data) {
    this.exampleData = data
  }

}

export default new ExampleStore
