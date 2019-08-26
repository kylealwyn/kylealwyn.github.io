---
title: How to add footnotes in Markdown
description: Adding footnotes in Jekyll blogs is helpful when referencing sources that do not need to be directly within content.
slug: how-to-add-footnotes-markdown
date: 2016-04-20
---

I've decided to start adding sources to my posts to give credit where credit is due <sup id="a1">[1](#f1)</sup>. The solution is simple but wanted to document in case anybody else needs a surefire solution.

First, we will need to create the superscripted link in the main content. The id of the superscript element will be used to link back to the section of the article from the footnotes, while the href value of the text will link down to the correlated footnote.

``` html
<sup id="a1">[1](#f1)</sup>
```

Now, we need the referenced footnote in place. Note the id of the *strong* element matches the id of the superscript link above. We also have a return link that will direct the user to the place in the article where the reference link was placed.

``` html
<strong id="f1">1</strong> Test Footnote. [↩](#a1)
```

I've placed an example in the first paragraph of this article to demonstrate our new footnotes! Good luck and happy sourcing.








### Sources
<strong id="f1">1</strong> Stack Overflow post that aided this solution. [↩](#a1)
