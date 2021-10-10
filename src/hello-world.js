import HelloWorldButton from "./components/hello-world-button/hello-world-button";
import Heading from "./components/heading/heading";
import _ from "lodash";

const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
const heading = new Heading();
heading.render(_.upperFirst("hello world"));

if (process.env.NODE_ENV === "production") {
  console.log("production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("development mode");
}

helloWorldButton.methodThatDoesNotExist();
