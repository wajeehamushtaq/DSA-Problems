// Map: set. get, has, delete
// Set: add, delete, size, has, delete

class User {
    constructor(id, username){
        this.id = id
        this.username = username

        this.followers = new Set()
        this.following = new Set()
        this.tweets = []
    }

    getFollowersCount(){
        return this.followers.size
    }
    getFollowingCount(){
        return this.following.size
    }
    getTweetCount(){
        return this.tweets.length
    }
}


class Tweet {
    constructor(id, authorId, text){
        if(!text || !text.trim()){
            throw new Error("Tweet cannot be empty")
        }

        this.id = id
        this.text = text
        this.authorId = authorId
        this.createAt = Date.now()
        this.likes = new Set()
    }
    like(userId){
        this.likes.add(userId)

    }
    unlike(userId){
        this.likes.delete(userId)
    }
    getLikesCount(){
        return this.likes.size
    }
    getDetails(){
        return {
            id: this.id,
            authorId: this.authorId,
            text: this.text,
            createAt: this.createAt,
            likes: this.likes.size
        }
    }
}

class TwitterService {
  constructor(){
    this.users = new Map()
    this.tweets = new Map()
    this.nextUserId = 1
    this.nextTweetId = 1
  }

  createUser(username){
    const user = new User(this.nextUserId++, username)
    this.users.set(user.id, user)
    return user
  }
  
  createTweet(userId, text){
    const user = this.users.get(userId)
    if(!user){
        throw new Error("User not found")
    }

    const tweet = new Tweet(this.nextTweetId++, user.id, text)
    this.tweets.set(tweet.id, tweet)
    user.tweets.push(tweet)

    return tweet
  }

  followUser(followerId, followeeId){
    const follower = this.users.get(followerId)
    const followee = this.users.get(followeeId)
    if(!followee || !follower){
        throw new Error("Users not found")
    }

    if(followee === follower){
        throw new Error("Same users can't follow")
    }
    followee.followers.add(followerId)
    follower.following.add(followeeId)
  }

  unfollowUser(followerId, followeeId){
    const follower = this.user.get(followerId)
    const followee = this.user.get(followeeId)
    if(!followee || !follower){
        throw new Error("Users not found")
    }

    followee.followers.delete(followerId)
    follower.following.delete(followeeId)
  }

  likeTweet(userId, tweetId){
    if (!this.users.has(userId)) {
      throw new Error("User not found");
    }

    const tweet = this.tweets.get(tweetId);

    if (!tweet) {
      throw new Error("Tweet not found");
    }
    tweet.like(userId)
  }
  unlikeTweet(userId,  tweetId){
    if (!this.users.has(userId)) {
      throw new Error("User not found");
    }

    const tweet = this.tweets.get(tweetId);

    if (!tweet) {
      throw new Error("Tweet not found");
    }
    tweet.unlike(userId)
  }
  deleteTweet(userId, tweetId){
    const tweet = this.tweets.get(tweetId)

    if(!tweet){throw new Error("Tweet not found")}
    if(!tweet.authorId !== userId){
        throw new Error("only author can delete it")
    }

    this.tweets.delete(tweetId)
    const author = this.users.get(tweet.authorId)
    // delete from user map
    author.tweets = author.tweets.filter( item => item.id !== tweetId)
    return true
  }

  getNewsFeed(userId, limit = 10){
    const user = this.users.get(userId)

    if(!user){ throw new Error("User not found")}
    const feed = [...user.tweets] // shallow copy not reference based
    for(const followedId of user.following){
        const followedUser = this.users.get(followedId)
        feed.push(...followedUser.tweets) // make it array to push
    }
    return feed.sort((a,b) => b.createAt - a.createAt).slice(0, Math.max(0, limit))
  }

}


//---------------------------------
//. TESTING
//---------------------------------

const twitter = new TwitterService();

// Create users
const ali = twitter.createUser("Ali");
const sara = twitter.createUser("Sara");
const ahmed = twitter.createUser("Ahmed");

// Follow users
twitter.followUser(ali.id, sara.id);
// twitter.followUser(ali.id, ahmed.id);

// Create tweets
const tweet1 = twitter.createTweet(
  sara.id,
  "Hello everyone!"
);

const tweet2 = twitter.createTweet(
  ahmed.id,
  "Learning JavaScript OOP"
);

const tweet3 = twitter.createTweet(
  ali.id,
  "Building my own Twitter!"
);

// Like a tweet
twitter.likeTweet(ali.id, tweet1.id);
twitter.likeTweet(ali.id, tweet1.id); // No duplicate because of Set

// // Check counts
// console.log("Ali's tweets:", ali.getTweetCount());
// // 1

// console.log("Ali's following:", ali.getFollowingCount());
// // 2

// console.log("Sara's followers:", sara.getFollowersCount());
// // 1

// console.log("Tweet likes:", tweet1.getLikeCount());
// // 1

// Get news feed
console.log(
  twitter.getNewsFeed(ali.id).map(tweet => tweet.text)
);

