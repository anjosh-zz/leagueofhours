## League of Hours 

League of Hours lets you know how many hours you played in the last week or
ten games (if you've played more than ten games this week it will tell you
the numbers of hours played only in the last ten games). Just open up
`index.html` in your browser and input your region and summoner name.

The app uses the riot api to first get the summoner id using the region and
summoner name given by the user. Then the app looks at the summoner's recent
games and adds up the total time of each game played within the last seven
days. Bootstrap is used for styling.

To test the League of Hours mashup made for part 2 I tested putting different
summoner names of my friends and compared the hours returned in League of Hours
to their stats on lolking.com. Five different players' stats were tested. I
also tested how the application responses to inproper entries such as special
characters or summoners that exist in other regions but not in the region
selected.
