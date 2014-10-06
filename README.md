# GOG


## Todo

- percent-circle module animated graph bar
- slider form speech box final shape
- slider breakpoints labels position for special overlapping cases
- icon styles for svg icons
- bundle price form validation
- cross-browser testing and fallbacks
- mass sales popuplating function for demo purposes
- animations
- mobile styles


## Issues and notes

Issues:

- in the `.psd` mockup there was over 15 shades of gray used, I tried to bring this number down (ended up with 9), but you are in need of a more precise color palette in your identity
- in the `.psd` mockup every text has `crisp` font-aliasing method, which renders far from the standard browser/os rendering (`Mac LCD` or `Mac` on OS X is far better choice) -- changing this helped a bit with tracinkg down "useless" grays

Notes:

- the site is run on AngularJS with content and settings defined in `.json` data files
- there are 9999 randomly generated sales, to show the change in slideshow unlockables, so to see the change in slider breakpoints checkout with some edgy values
- checkout button updates the sales array
- some misc plugins:
    - [angular-timer](https://github.com/siddii/angular-timer) by Siddique Hameed
    - [angular-flipsnap](https://github.com/ninjatronic/angular-flipsnap) by Pete Martin
    - [flipsnap](http://pxgrid.github.io/js-flipsnap/) by Kazuhito Hokamura
- I decided to use the experimental [Attribute Modules CSS technique](http://amcss.github.io/), which turned out awesome

[Generator](http://www.json-generator.com/) input:

```
[
    '{{repeat(9999)}}',
    {
        user: {
            name: "faker"
        },
        games: [],
        value: '{{floating(0.99, 30.99, 2)}}',
    }
]
```
