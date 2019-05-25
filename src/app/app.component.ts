import { Component } from "@angular/core";
import { JsonAdapterService } from "json-adapter";
import { DogModel } from "./models/dog.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "my-json-adapter";

  constructor(jsonAdapterService: JsonAdapterService) {
    const dogs = jsonAdapterService.deserializeArray<DogModel>(DogModel, [
      {
        id: "ID",
        name: "Kiara",
        owner: {
          id: "ID2",
          name: "Lucas"
        }
      },
      {
        id: "ID",
        name: "Kiara",
        owner: {
          id: "ID2",
          name: "Lucas"
        }
      }
    ]);

    console.log(dogs);
    this.test().then(console.log);
  }

  async test() {
    const result = await new Promise(resolve => {
      setTimeout(() => {
        resolve(5)
      }, 3000);
    });

    return result;
  }
}
