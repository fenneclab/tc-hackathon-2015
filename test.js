import watoson from './lambda/util/watoson';

const text = `
please stay safe, my loves. you're in my heart

what a scary, chaotic day on earth. my heart is with everyone in Paris and Japan

what's mine is yours. all of you. always. *shows up at your classroom door in disguise with a green tea soy latte* 

love... patience... rest.... music..... green tea.... creativity... nature....Pixar movies.... bed...... Gloria Steinem books.... you get it

my babies, 
a random but necessary thank you for your love, patience, dedication, support, humor, and kindness. 
you are everything to me.
♡

The #ARI fragrance short film premieres on YouTube this Sunday starring Toulouse (casual)

try try try.... to follow the rules..... I break every one of em with boys like you 💗

how incredibly exciting ♡ beyond grateful for the support and even more excited for what's to come 🙊 thank you !!! 
`;

watoson.personalityInsights(text).then(j => {
  console.log(JSON.stringify(j));
}).catch(e => console.error(e));
