import { Application } from "@hotwired/stimulus";
import HeaderController from "./controllers/header_controller";
import NavigationController from "./controllers/navigation_controller";

const application = Application.start();
application.register("header", HeaderController);
application.register("navigation", NavigationController);
