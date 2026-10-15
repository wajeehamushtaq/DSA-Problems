Problem statement:
Design a simplified Twitter-like system where users can create tweets, follow other users, like tweets, and retrieve a personalized news feed.
The feed must return the 10 most recent tweets written by the user and the people they follow, ordered by newest first.
Your implementation must be object-oriented, efficient, and easy to extend.


Your design should demonstrate these principles.
Encapsulation---Prevent external code from arbitrarily modifying internal state.
Abstraction---Expose clear public methods while hiding implementation details.
Composition---TwitterService coordinates User and Tweet objects.
Single Responsibility---Each class has a clear purpose.
Dependency injection---Allow a clock or ID generator to be supplied to the service.
Polymorphism---Optionally support different feed-ranking strategies.

Senior-level extension: Design a FeedRankingStrategy abstraction so the system can support chronological and popularity-based feeds without rewriting TwitterService.