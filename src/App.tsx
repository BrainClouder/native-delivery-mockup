import React, { Component } from "react";
import { Button, Image, StyleSheet, Text, View, ScrollView } from "react-native";
import { Menu as MenuIcon,
LinkedIn as LnLogo,
GitHub as GHLogo,
} from '@material-ui/icons';


const Link = (props: any) => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(
      styles.link,
      props.style
    )}
  />
);



class App extends Component {
  render() {
    return (<>    
      <View style={styles.appBar}>
        <View style={styles.appToolBar}>
        <Text>Sideboard Menu</Text>
        <Text>This is some logo</Text>
        
        <Text>#</Text>
        </View>
      </View>
      <ScrollView>
      <View style={styles.app}>
        <Text>dsddfdf</Text>
        <Text>Oh yeah baby I'm in React Native now</Text>
        <Button onPress={() => console.log('hello')} title="ex-ampler" />
      </View>
      </ScrollView>
      <View style={styles.footBar}>
        <Link href="https://www.linkedin.com/in/contrateme/">
          Ln
        </Link>
        <Link href="https://github.com/BrainClouder">GitHub</Link>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  appToolBar: {
    padding: '0.8em',
    flex: 1,
    flexDirection: 'row',
    flexShrink: 1,
    width: '80vw',
    marginLeft: '7vw',
    justifyContent: 'space-between',
    flexWrap: 'wrap'

  },
  appBar: {
    width: '100vw',
    height: '3em',
    backgroundColor: 'steelblue',
  },
  footBar: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#888888",
    width: '',
    left: '',
  },
  app: {
    marginHorizontal: "auto",
    maxWidth: 500
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0",
    textAlign: "center"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
