<a href="https://sine.at">
  <img alt="Sine, a platform for generating art with AI." src="https://www.sine.at/sine-og.png">
  <h1 align="center">Sine</h1>
</a>

<p align="center">
Generate high-quality art with AI
</p>

<p align="center">
  <a href="https://twitter.com/tsui_nova">
    <img src="https://img.shields.io/twitter/follow/tsui_nova?style=flat&label=tsui_nova&logo=twitter&color=0bf&logoColor=fff" alt="Twitter" />
  </a>
  <a href="https://github.com/davidtparks/sine/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/davidtparks/sine?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

## Introduction

Sine is an open-source application that uses AI to generate stunning pixel art
images for your creative projects. Your limit is your imagination. Built with
[Next 13 app dir](http://beta.nextjs.org), and
[Planetscale MySQL](https://planetscale.com/).

## Tech Stack

- [Next.js](https://nextjs.org/) – framework
- [Shacdn/ui](https://ui.shadcn.com/) – component templates
- [Typescript](https://www.typescriptlang.org/) – language
- [cva](https://github.com/joe-bell/cva) - component variants
- [Tailwind](https://tailwindcss.com/) – CSS
- [PlanetScale](https://planetscale.com/) – database
- [NextAuth.js](https://next-auth.js.org/) – auth
- [Vercel](https://vercel.com/) – hosting
- [Stripe](https://stripe.com/) – payments
- [Postmark](https://postmarkapp.com/) - email delivery
- [Upstash](https://upstash.com/) - rate limiting
- [Supabase](https://supabase.com/) - Image storage

## Acknowledgments

This project would not have been possible without the amazing work from:

- [Shadcdn](https://twitter.com/shadcn) for his Next 13 app dir project
  [Taxonomy](https://github.com/shadcn/taxonomy), which much of Sines's code is
  based on. This project is a direct fork of his repository.
- [Steven Tey](https://twitter.com/steventey) for his work on
  [Dub](https://www.dub.sh) which provided some great insight into structuring a
  SaaS application using Next 13.
- [Hassan El Mghari](https://twitter.com/nutlope) for his work on
  [RoomGPT](https://www.roomgpt.io/) which was really helpful in learning how to
  query ChatGPT + AI models in Next 13!
- [Scenario](https://www.scenario.com/) Scenario is a platform that provides
  some great public generators, as well as the ability to create new generators
  using AI for images. Sines APIs interact directly with Scenario and this
  project would not be possible without them!

## Contributing

We love our contributors! Here's how you can contribute:

- [Open an issue](https://github.com/davidtparks/sine/issues) if you believe
  you've encountered a bug.
- Make a [pull request](https://github.com/davidtparks/sine/pull) to add new
  features/make quality-of-life improvements/fix bugs.

<a href="https://github.com/davidtparks/sine/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=davidtparks/sine" />
</a>

## Author

- David Parks([@dparksdev](https://twitter.com/dparksdev))

## License

Inspired by [Plausible](https://plausible.io/), and [Dub](https://dub.sh/), Sine
is open-source under the GNU Affero General Public License Version 3 (AGPLv3) or
any later version. You can
[find it here](https://github.com/davidtparks/sine/blob/main/LICENSE.md).
