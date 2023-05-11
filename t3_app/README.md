# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## Info for running

docker run --name postgres-db --rm -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 -it postgres:14.1-alpine   

add .env

https://github.com/WebDevSimplified/twitter-clone/tree/main

https://www.youtube.com/watch?v=jqVm5_G1ZEE

## Next Steps 
- figure out why fast reload does not work
- build out recipe view - add ingredient components
- ''' cuisine creation
- ''' cuisine dropdown for recipe create
- ''' profile page - view posted recipes
- ''' favorite recipe functionality
- TBD: recipe search by favorite, course or cuisine ... more? (tags)
- add additional auth - google, just username/pass? - can wait until fully functional
- figure out dockerization - how to containerize on AWS?
