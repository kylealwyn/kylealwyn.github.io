---
title: Writing Pure Functions in Javascript
description: Exploring the benefits of writing pure functions in Javascript
slug: keeping-functions-pure
date: 2016-09-09
---

I've been perusing through Robert C. Martin's book, [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) and I wanted to document my takeaways from the chapter on functions. Although most of the book is tailored around the Java (in no way related to Javascript) programming language, some of the paradigms run true for any functional language.

One of the core concepts explored in this chapter can be summed up by the following:
> Functions should do one thing. They should do it well. They should do it only.

We should strive for a codebase full of single-purpose functions. This largely why modular systems such as CommonJS or RequireJS have risen in popularity; we create modules that do one thing really, really well and are then able to use it anywhere and know exactly what to expect.

Front end javascript frameworks such as Angular 2 and React have adopted the idea of components rather than pages and controllers. Systems we now build are composed of many components; these components can be transferred from system to system and replicate their functionality as long as they are provided the correct inputs.

The bit about frameworks may seem a bit tangiential to the topic of this article, but the basis of these frameworks are functions; functions that are taking in inputs and outputting something different based on the input. With this is mind, let's dive into some basic rules to follow when writing pure functions.

## Use descriptive names
A long, descriptive name is better than a short, ambiguous name. You should be [uglifying](https://github.com/mishoo/UglifyJS) your code for production anyways, so you do not have to worry about bloating your codebase with longer names. Trust me, you'll thank yourself later.

Names may also depend upon the returned output of the function. For example, if we are returning a boolean, we can prefix the function with `is` or `has`. When reading an example like `campaign.hasStarted()`, we already understand what object type this method will return and we can determine the meaning of the return value has without actually looking at the internals of the method.

## Don't manipulate arguments
Pure functions do not manipulate arguments. Rather, a function should decidedly mutate a copy of the object and return the copy, leaving the source object intact in case the original needs further processing.

If running mutable methods within a function, do your best to make a local copy of the object before mutating or somehow signal in the name that this function is destructive. Ruby does a good job of this by allowing you to add a bang to the end of the method, signaling that the method is destructive.

## No side effects
A pure function Has no side effects. Once again, the function does one thing, one thing well, and one thing only. Is that getting old yet? _Good_. They should not manipulate global variables and should not manipulate any arguments. If they do, the function has hidden meaning and functionality, and in turn we cannot truly predict what the function will output because of it's dependency on the environment. Bulletproof functions should produce the same output given the same input every single time.

Functions with side effects also produce temporal couplings and/or [race conditions](http://searchstorage.techtarget.com/definition/race-condition). A race condition means _this must be done before that, and that must be done before this, otherwise it won't work_. Race conditions can be devastating for an application, especially on the web, where the language is not compiled before runtime and we cannot predict where our user's exact entry point or current state will be (logging back into an application, moving backwards or forwards in history).

## Do throw exceptions
Throw exceptions when they are encountered rather than returning the error from the function. If we have encountered an issue with our program during runtime, we should not allow the business logic to continue in hopes that the error will eventually be caught and handled. The program must immediately respond by throwing an exception. It is useful to have some sort of global error handler that can gracefully handle errors when encountered.

## No flag arguments
A flag argument is a boolean value that says if this, do that, if that, do this. As soon as you use a flag argument, you violate the single purpose principle. This one is short and simple. Don't do it.

## Conclusion
These aren't the only guidelines to follow for writing pure functions but these concepts provide a solid foundation for the topic and explore some of the shortcomings of using non-pure functions in a runtime language.
