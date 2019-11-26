# README

Yeast notes is a home brew tracking tool. Brews can be created and notes added to them as the yeast get the job done, like changes in specific gravity and notable observations. Once you log in with a Google account, you can create as many brews as you want.

This is a little learning experiment with using React hooks for another larger project. It's also a way for me to track my own personal brewing projects.

At this stage it's running on the spark tier of firebase. If there's enough interest to hit the usage limits I'll bump it up to a paid tier and then maybe think about how I'm going to pay for it.

## Planned Features

At this stage every brew will need to be created by an authenticated user. Every user will have the option to mark a brew as "public" or not. If a brew is marked as public, then anyone can view it, even without an account.

I'm planning to add the following features:

 * Deleting brews.
 * Copying brews.
 * Exporting data into Excel & JSON.
 * Fix the rendering for Mobile.
 * Gravity Calculations for ABV.
 * Tasting Notes (Clarity, Aroma, Taste).
 * Temperature Log (& adjusting Gravity accordingly?).
 * Nutrient Additions.
 * Beer support - I don't brew beer, but I know it's got a whole heap of extra data that may be useful to capture, like water hardness and acidity.
 * Comments on public brews.
 * Sharing brews (i.e. permalinks).
 * Filtering and Sorting the Brews Table.
 * Other IdPs - I chose Google because I use it. Also firebase trusts the email verification state for Google accounts automatically, so I don't have to do any post log in crud for verifying emails.

## Semantic UI

I like [Semantic UI](https://semantic-ui.com/), but because it has some issues with installation and updates I'm using the community fork [Fomantic UI](https://fomantic-ui.com/) instead.

Building the CSS is a matter of running the following:

``` shell script
# npm i -g gulp # install gulp if you don't have it already
cd semantic/
gulp build
```

Because Semantic UI has post install hooks with npm, you can't use `yarn` with this project.

## Running a Dev Instance

`npm run start`

## Deploying to Firebase

This should take care of everything, as long as you're logged into firebase with an account that can hit the prod service:

`npm run deploy`

## Contributing

I'll be surprised if anyone submits a pull request for this project, but if that ever happens I'll create some sort of contribution guide.
