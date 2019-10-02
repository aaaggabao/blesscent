import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ActivityIndicator, View } from 'react-native';

export default function AccountScreen() {
  const [visible, setVisible] = useState(false);

  const showSpinner = () => {
    setVisible(true);
  }

  const hideSpinner = () => {
    setVisible(false);
  }

  const errorLoading = () => {
    console.log("Error Loading")
  }
  return (

    <View
      style={visible === true ? styles.stylOld : styles.styleNew}>
      {visible ? (
        <ActivityIndicator
          color="#ffe536"
          size="large"
          style={styles.ActivityIndicatorStyle}
        />
      ) : null}

      <WebView
        style={styles.WebViewStyle}
        //Loading URL
        source={{ uri: 'https://blesscentsmktg.com/vo/index.php' }}
        //Enable Javascript support
        javaScriptEnabled={true}
        //For the Cache
        domStorageEnabled={true}
        //View to show while loading the webpage
        //Want to show the view or not
        //startInLoadingState={true}
        onLoadStart={showSpinner}
        onLoad={hideSpinner}
        onError={errorLoading}
      />
    </View>

  );
}

AccountScreen.navigationOptions = {
  title: 'Blesscent Dashboard',
  headerStyle: {
    backgroundColor: "#ffe536"
  },
};

const styles = StyleSheet.create({
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: 0,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});