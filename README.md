## Overlapping\nwriting

To reuse this platform for your own publication, 

1. `git clone` this repository
2. `yarn` in base folder
3. See instructions [here](https://github.com/cedricdelpoux/gatsby-source-google-docs) for setting up the connection to your Google drive folder.
4. For deployment on [Vercel](https://vercel.com), `vercel` should work out of the box.
5. To enable periodic rebuild of the site (carrying any changes), create a cron job that visits the deployment webhook provided by Vercel.