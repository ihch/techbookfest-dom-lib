/** @jsx TechbookFest.createElement */
import * as TechbookFest from "./main.ts";

const root = document.querySelector("#app");

const Text = () => {
  return <p class="text">テキスト</p>;
};

const App = (
  <div class="container">
    <Text />
  </div>
);

root && TechbookFest.render(App, root);
