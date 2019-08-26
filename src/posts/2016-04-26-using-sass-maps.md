---
title: How to use Sass maps
description: Learn what Sass maps are and how to use them to reduce source code and create frameworks
slug: how-to-use-sass-maps
date: 2016-04-26
---

Apart from frameworks, I've seen Sass maps used very little in production code bases. Sass maps allow you to define a variable containing key-value pairs. You can then loop through the map to generate generic code or reference the map somewhere else in your sass code. First, let's take a look at how to define a map:

## Defining A Map
What if we just wanted to have a simple color map defining our palette?

``` scss
// Primary colors for use within our application
$colors: (
  red: #e74c3c,
  blue: #3498db,
  purple: #9b59b6,
  turquoise: #1abc9c,
  green: #2ecc71,
  midnight: #34495e
);
```

## Accessing The Map
Great, now we have our map defined, but how do we use the dang thing? We'll need to use a Sass built-in `map-get` in order to access the map. `map-get` takes in two arguments: the map we are looking up and the key we want the value for.

``` scss
// Using our predefined $colors map above ^
.btn-primary {
  background: map-get($colors, red);
}
```

## Other Map Uses
Some may stop there and start using maps right away as this provides nice organization to our variables in semantic namespaces. We can go even further and use the maps to their full potential by looping through them. We will use several powerful features of sass: *placeholders*, *each loops*, and of course *maps*. Let's check it out

``` scss
// Defining our map
$colors: (
  red: #e74c3c,
  blue: #3498db,
  purple: #9b59b6,
  turquoise: #1abc9c,
  green: #2ecc71,
  midnight: #34495e
);

// Defining our default button style
%button {
  border: 0;
  border-radius: 4px;
  box-shadow: 0 2px 7px rgba(black, 0.17);
  color: white;
  padding: 8px 12px;
  position: relative;
  margin: 4px;
  transition: 250ms;
  text-transform: uppercase;
}

// Looping through our color map
// The each loop will provide both the key and value to it's scope
@each $color, $hex in $colors {
  .button--#{$color} {
    // Extend our default style
    @extend %button;

    // Set the background to our defined hex color in our map
    background: $hex;
  }
}
```

Sweet! We now have stylish buttons for all colors in our color map. The generated CSS would like something like this

``` css
.button--red, .button--blue, .button--purple, .button--turquoise, .button--green, .button--midnight {
  border: 0;
  border-radius: 4px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.17);
  color: white;
  font-family: 'Lato';
  outline: none;
  overflow: hidden;
  padding: 8px 12px;
  position: relative;
  margin: 4px;
  transition: 250ms;
  text-transform: uppercase;
}

.button--red:hover, .button--blue:hover, .button--purple:hover, .button--turquoise:hover, .button--green:hover, .button--midnight:hover {
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.36);
}

.button--red {
  background: #e74c3c;
}
.button--red:hover {
  background: #d62c1a;
}
```

Now, in order to add a button, all we need to do is add one more color to our colors map and the loop will dynamically generate a new button. Let's see it in action.

<p data-height="266" data-theme-id="light" data-slug-hash="zrBJyx" data-default-tab="result" data-user="kalwyn" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/kalwyn/pen/zrBJyx/">Easy buttons with sass map</a> by Kyle (<a href="http://codepen.io/kalwyn">@kalwyn</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

If you want to learn more about Sass and its awesome features, visit the [website](http://sass-lang.com/). Cheers!
