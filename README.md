# Planner app styled with Tokenami

This project is a playground app that I've built and styled with both [Tokenami](https://github.com/tokenami/tokenami) and [TailwindCSS](https://github.com/tailwindlabs/tailwindcss). The former one is using unconventional approach with substring styles selectors to allow direct styling with inline styles. In opposite to e.g. [CSSHooks](https://css-hooks.com) it implements theming system in its core. I highly recommend giving a read about all of these libraries, especially in terms of trade-offs and design decisions. However, substring selectors are (in)famously known for a worse performance than other, especially when compared to class selectors which are one of the most performant one.

Hence, I wanted to measure it, how much the performance tanks fro musing the substring selectors. Moreover, I've just wanted to play a bit with Tokenami to get a grasp whether it's something for me. A lot of thanks to Tokenami author [jjenzz](https://twitter.com/jjenzz) that helped a lot during my journey with Tokenami and was ultra fast with fixing bugs or applying improvements!

[![Planner screenshot](./readme-assets/app-screenshot.png)](https://planner-tokenami.vercel.app)

## Links

- [Tokenami version](https://planner-tokenami.vercel.app)
- [TailwindCSS version](https://planner-tailwind.vercel.app)

## Thoughts about Tokenami

Tokenami is super nice in terms of DX. Styles are co-located with elements and don't need to be named, similarly to TailwindCSS - these are the characteristics that I'm looking for mostly. Moreover, those can be easily extracted to variables, because they're plain objects. It works better than with TailwindCSS, because of few reasons, including intellisense, merging possibilities, and composition.

Thanks to the fact these're plain objects I can do stuff that I can with objects e.g. destructure to remove few properties. Also it makes TypeScript story a lot better, I can make my components accept some style overrides (but not all) in a completely type-safe manner. Moreover, consistent merging doesn't need utilities like `tw-merge`, you can use the built-in `css` utility that handle e.g. aliases though.

Extraction of styles also works a bit differently, the selectors are mostly the part that needs to be extracted so I can be pretty dynamic with values. In TailwindCSS I can't do something like `text-${color}-500` - I can do this in Tokenami. I need to only be cautious about not ding something like `--hover_${selector}`, which isn't supported by TailwindCSS too. I can even save selectors to some variable and reuse them, because similarly to TailwindCSS they're extracted with a simple regex, no JS parsing occurs. Also arbitrary variants mechanism is super nice and well-thought.

It doesn't need a special bundler integration, you just use a CLI to watch your input files and output a CSS file with atomic rules at built-time. You can make it work with Vite, with Next.js, you name it.

Theming and configuration is ultra powerful. You can create your own theme categories and assign them to CSS properties. You can also create aliases, nested selectors, whatever you like.

Moreover, Tokenami has a slight advantage (which should grow overtime and with jjenzz future improvements that I'm aware of) in terms of stylesheet size. Tailwind generates classes for every property-value combination. Tokenami needs rules only for selectors.

Most of rough edges are quickly iterated on by the author. One of the biggest currently is the Intellisense performance, thanks to usage of custom TypeScript plugin there's a lot achievable but it comes with a little slowdown. Also there're some things that aren't possible currently because of this - e.g. nesting custom selectors `hover:focus:some-class` TailwindCSS equivalent. You need to create special selector for such cases.

Overall, my experience was really pleasant with it. It's readable, it's nice to author, it has a lot of benefits due to just being plain objects, it's fun.

## Various measurements

Okay, let's go to the part that's probably more spicey 😄 I'm not taking conclusions, anyone can decide for themselves. Few notes before presenting rough numbers:

- I'm using different CSS resets with both libraries. TailwindCSS comes with a one builtin. Both seems to be similar in terms of selectors performance but the TailwindCSS is slightly bigger.
- The measurements aren't super ultra exact and precise, I didn't want to automate it and make them, because these are mostly for me. So it involves measuring user interactions timings performed by human. This thing shouldn't really matter because even if I moved my mouse faster or something I always measured only a single change on the screen, e.g. changing date. Also I didn't make any warmup runs or took many attempts and took an average. I've only checked whether these vary a lot and it seemed to be pretty consistent.
- There's small variance between both calendars content, I've used `faker.js` to generate mock events so stuff like event spread and longer/shorter names could impact some stuff in theory. You can take a look in `src/lib/mock-data.ts` to check how I generated it.
- I'm using an experimental setting with TailwindCSS `optimizeUniversalDefaults`. This one makes the resulting stylesheet smaller and remove few less performant selectors. I have this always on when I'm using TailwindCSS and these measurements are for me so I included it here.

### Size

|                 | Tokenami | Tokenami gzip | TailwindCSS | TailwindCSS gzip |
| --------------- | -------- | ------------- | ----------- | ---------------- |
| Stylesheet size | 9.99 kB  | 2.49 kB       | 8.58 kB     | 2.73 kB          |

As you can see, even though Tokenami is slightly bigger it compresses better so I'd call it even. Moreover, as mentioned before - in theory Tokenami should be smaller with more property-value combinations and there're few additional improvements coming.

|            | Tokenami  | Tokenami gzip | TailwindCSS | TailwindCSS gzip |
| ---------- | --------- | ------------- | ----------- | ---------------- |
| JS(X) size | 540.33 kB | 169,85 kB     | 542,96      | 171,79           |

This app is an SPA so HTML size is basically included in this one as JSX. This is influenced by styling library in two ways - firstly, how terse are styles declarations, secondly - companion libraries. I can't imagine using TailwindCSS without CVA and tw-merge, Tokenami comes with a one built-in, so these are included here. Generally even if it looks like Tokenami is in the lead - it's important to note that that size is spread out differently. CVA + tw-merge for TailwindCSS is much bigger than Tokenami `css` utility. On the other hand, the styles declarations with Tokenami are bigger.

### Timings (paint + rendering)

|                            | Tokenami | TailwindCSS |
| -------------------------- | -------- | ----------- |
| Interaction                | 12ms     | 16ms        |
| Interaction, 4x slowdown   | 86ms     | 86ms        |
| Initial Paint              | 59ms     | 32ms        |
| Initial Paint, 4x slowdown | 221ms    | 90ms        |

As you can see, interactions timing are pretty similar, even slightly favouring Tokenami in my measurements. However, Initial Paint timings hit a bit. "Interaction" is basically changing date in calendar to other day, on a page with 25 events.

### Selectors

Microsoft Edge has this nice selector tab that lets you see how much time exact selectors took. Here I'm putting example screenshots from the "Interaction, 4x slowdown" test.

### Timings (merging classes)

|                    | Tokenami | TailwindCSS |
| ------------------ | -------- | ----------- |
| Small, 6x slowdown | 0.7ms    | 8ms         |
| Big, 6x slowdown   | 3ms      | 22ms        |

As mentioned before, I've setup both libraries with utilities for merging styles and managing variants. I'm aware the Tailwind one isn't as performant, because it uses regexes to parse classes for merging purposes. So I've decided to create example scenarios and test them. You can see specific cases in `src/lib/benchmark.ts`. As you can see, the difference is quite noticeable and can scale especially with many components on a given page. However, this mostly impacts initial paints or navigations, because both libraries utilize caching for already encountered combinations.

### Timings (tsc)

|                    | Tokenami | TailwindCSS |
| ------------------ | -------- | ----------- |
| Small, 6x slowdown | 17.2s    | 2.35s       |

As mentioned before, the TypeScript performance takes a hit while using Tokenami. It's not really noticeable during normal usage (except of Tokenami properties intellisense), because of smart magic with TS plugin. However, it's really prominent while running the `tsc` e.g. during CI.

#### TailwindCSS

![TailwindCSS selectors statistics](/readme-assets/selectors-tailwind.png)

#### Tokenami

![Tokenami selectors statistics](/readme-assets/selectors-tokenami.png)

As you can see there's a lot of selectors in Tokenami that ends with `:var` that aren't matched anyway. This's for the pattern that allow you to use "grid" and then use the base value multiplications for various selectors.

## Summary about Tokenami

- Type-safe way of applying styles through inline attributes, with theming support that compiles to atomic CSS
- No bundler integration, CLI usage
- Super powerful styles composition
- Theming and configuration is 🔥, it strikes good balance between configurability and ease of use out-of-the box. The API is quite minimal but powerful
- TypeScript integration is powerful, but performance (Intellisense, `tsc`) takes a small hit
- Just ultra interesting project on how CSS variables can be used to the extreme
