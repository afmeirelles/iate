Some years ago I was writing web applications with CakePHP and it just felt ok having to start a webserver (LAMP, actually) in order to run unit tests. Being a strongly opinionated MVC framework, however, CakePHP had some helper classes that made testing a bit easier, but looking back now I can see how cumbersome it was.

Doesn’t it feel odd someone need to simulate HTTP requests in unit tests? Why does you business logic code have to be aware of what HTTP method is used? Why do your classes need to be categorized by their role in the system (model, controller, view) instead of what business entity they represent?

Let’s face it: most frameworks make it easier to do 95% of the work you need to. But when it comes to that 5%, they make your life a living hell - sooner or later you’ll be forking and messing with the core files and wondering why didn’t you choose to be an accountant.

This is actually an old topic. Uncle Bob is advocating for better architecture for years now, check this talk (link) if you haven’t heard about it.

For me, the key takeaways are:

Whenever it’s possible, don’t extend frameworks. If you need one, import it and use it like any other libraries.
Keep the delivery mechanism code separated from you business logic code.
Keep the persistence mechanism code separated from you business logic code too.
Structure you code by business domains.

But how to do all of that in a way that’s easy to communicate and don’t require to write your own framework? The solution we’ve found is kind of organic and makes so much sense that it quickly settled within our team and later spread to others in the company. We named it IATE (in brazilian portuguese, it sounds exactly like “yatch”), an acronym for the key components: Translator, Interactor, Entity and Adapter.

IATE is all about boundaries

In order to protect your precious business code from the delivery and persistence mechanism, we just need to set boundaries. That’s what Translators and the Adapters, while Interactors and Entities hold the business-logic code. Let’s take a look at each component in the context of an example: a transfer between accounts.

| Boundary | Business Code | Boundary |
|----------|---------------|----------| 
| Translator | Interactor Entity | Adapter |

Translator: this is the component in charge of translating the message received from a delivery mechanism into the domain language of the application, e.g., an HTTP request to a json - and vice-versa. As a translator, it’s important to validate the incoming message, like checking if it comes from an authenticated source or whether the syntax is correct.

Interactor: the component in which the business logic resides. It is pretty much the same as the Controller in MVC, but there’s only domain-related code in here. In the interactor, you’ll probably find yourself writing the same as you would in a use case.

Entity: here you’ll find the business rules. Each step described in the interactor must be implemented in detail here.

Adapter: the component responsible for adapt the application messages (json) into the persistence layer language, e.g., json to SQL - and the other way around.







-------
Don’t extend frameworks.
IATE is not a framework, you don’t have to marry it; it’s just a way of structuring your code. You’ll not find any npm packages do import neither it tells you what to use. In fact, IATE makes it easier to move from - for example - restify to express, express to lambda functions connectors etc. The same is valid for the persistence layer.







