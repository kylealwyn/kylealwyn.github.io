---
title: Custom Fonts with React Native
description: Learn how to add and use custom fonts to your React Native app.
slug: custom-fonts-with-react-native
date: 2016-08-25
---

After building an analytics dashboard for [Lemonaid Health](https://lemonaidhealth.com) with React/Redux, I felt ready to dive into some native programming with React Native. As with any custom project, you'll probably want to add some custom fonts to brand the app or give it some sex appeal. After some googling around, I found [RNPM](https://github.com/rnpm/rnpm) (React Native Package Manager) which makes the process a breeze.

## Add your custom assets to the project
The first step is to add your custom assets to your project directory. I put all my custom code into a `source` folder at the root of the project directory. Within `source`, I have an `assets` folder which will contain any static assets such as my fonts, images, etc.

```
react-native-app
│   README.md
│   index.ios.js
│   index.android.js
└── ios
└── android
└── source
│   │
│   └── components
│   │
│   └── assets
│       └── fonts
│            └── Custom fonts go here
```

## Install RNPM
First, you will need to install RNPM globally

```shell
$ npm install -g rnpm
```

Once installed, we need to add some meta data to our `package.json` file. This tells `rnpm` where our asset directory lives.

```json
{
  "rnpm": {
    "assets": [
      "source/assets/fonts"
    ]
  }
}
```

## Link Assets
Now that `rnpm` knows where our assets live, we can link our assets through the command line.

```shell
$ rnpm link assets
```

This will *automagically* add our assets to both our android and ios distributions.

## Using the Fonts
Once we have our assets linked up, we can now use the fonts in our application. You must use the exact filename when referencing the font within your javascript.

In this example, lets assume we have a file in our font directory named `ProximaNova-Bold.ttf` and have already linked the assets.

```javascript
import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ProximaNova-Bold'
  }
})

class CustomFontTest extends Component {
  render() {
    return (
      <Text style={styles.text} />
    )
  }
}
```

We should be able to see our custom font in our app now!
