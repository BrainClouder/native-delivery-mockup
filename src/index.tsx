import { AppRegistry } from 'react-native';
import HocApp from './HocApp';

AppRegistry.registerComponent("App", () => HocApp);

AppRegistry.runApplication("App", {
    rootTag: document.getElementById("root")
});
