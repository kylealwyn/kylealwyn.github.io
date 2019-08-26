---
title: How to track object changes in Javascript
description: Learn how to find the difference between two javascript objects
slug: how-to-track-object-changes-javascript
date: 2016-04-07
---

Recently, I needed a good way to find out exactly what had changed between two objects in an Angular application. Soooo, I wrote one.

<p data-height="268" data-theme-id="0" data-slug-hash="BKJYRN" data-default-tab="result" data-user="kalwyn" class="codepen">See the Pen <a href="http://codepen.io/kalwyn/pen/BKJYRN/">BKJYRN</a> by Kyle (<a href="http://codepen.io/kalwyn">@kalwyn</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

As an example scenario, let's say we are editing a post. We load our page and pull down our post from the server. We make an initial copy of the and append another copy to our view. A user will edit a couple of values, e.g. the title and the description. At this point, I only want to send to the server the updated values rather than the entire post object, so I'd like to find the difference between the view-bound object and our original copy.

All we need to do is run the two objects through the below function and we will be returned an object consisting only of differing key-value pairs! It works for deeply nested objects as well, something I found lacking in most Stack Overflow posts. Our only dependency is the [lodash](http://lodash.com/docs) library. Lodash is full of useful javascript helpers that make day to day programming much simpler. Why reinvent the wheel when you have open source?

<script src="https://gist.github.com/alwynsays/f8e0a03d836f2923de9f83744cf45d09.js"></script>
