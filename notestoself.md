_Sample commands after each update of the prisma schema_
npx prisma migrate dev --name add-user-model
npx prisma generate
!add-user-model is dynamic and should be changed similar to a commit message!

Idea:
Above the Recent activities thing do rotating sentences with the activities the user has, for example:

1. How about doing some {activityA} today?
2. You haven't done {activityB} in a long time...
   ETC
