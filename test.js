import watoson from './lambda/util/watoson';

const text = `
Again precursor? !



It seemingly it is in so frequently? !


It was there yesterday over,


The ~'ll not be fooled (Roh _ ·,)



Tomorrow is a little get up early,


Ikunda the stage only to keep the nephew has come out ~


Tomorrow is because like a final day,


We must go to see as my Tamotsu LOVE! !


But there are many goofy place also,

Personality

Extremely good child from childhood! ! !


We always strive to have,

Ganbare! It's a child that do, such as seem me.


And because it's the first time see Tamotsu you are acting,

I look forward to (v ^ - °) ♪

By the way,

This child I Tamotsu (*'∀ \`) Bruno

Hip, I have Bikibiki,


I wonder if is down Bebi-chan? ?

When,

While expected,


In the light rain,

About 1 hour,

Yukkuri walk ♪





In the middle of a walk,

7-year-old? To the position of the boy


Is Goto Maki? ? (· ∇ ·)? ?


It is multiplied by the voice I (v ^ - °)


Mom's After that boy also came,

Handshake (*'∀ \`) people (· ∇ ·)


Mom's


It's soon? ! ♡


Please luck ☆☆☆


When,


♪ to Could be said with a smile


It was gratitude yer ♥♥♥ ★!




Phew.


Let Yo was hungry.


I want to eat fried shrimp!


When,


I thought to,


Why do not you except shops,


Youth because? Of men is ...


And I opened the shop door,


And as it closed Innovation Saw



I was home ('· ω · \`)


Anyway, so now I want to eat sweets,

Choco 2 cloves rip-off.


The Na or eat in such chromatography (¯ ▽ ¯)

↓



(Guy that was placed Te blindfolded blog before ☆)
`;

watoson.personalityInsights(text).then(j => {
  console.log(JSON.stringify(j));
}).catch(e => console.error(e));
