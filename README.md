# angular-wakanda

![ angular-wakanda ](https://wakanda.github.io/angular-wakanda/images/angular-wakanda.png)

Welcome to the **source repository** of the **angular-wakanda connector**. You'll find here the whole environment to develop the connector.

**If you only wish to retrieve the connector itself**, just get it from bower `bower install angular-wakanda`, npm `npm install angular-wakanda` or from the publish repo [Wakanda/angular-wakanda](https://github.com/Wakanda/angular-wakanda).

Please file your issues on this repo : [Wakanda/wakanda-issues](https://github.com/Wakanda/wakanda-issues/labels/Angular-Wakanda).

## Included

* angular-wakanda source code
* An example angular application
* A Wakanda solution
* Test suites

## Setup

Install development dependencies through npm and bower.

```bash
npm install && bower install
```

### Run

1. Launch the Wakanda Solution contained on `wakanda-solution` directory with Wakanda Studio, or directly
with `wakanda-server` executable (available on Wakanda installation directory).
2. `npm run serve`

It will serve an example application on `http://localhost:9092` with a watcher
that rebuilds the connector on every modification on source code.

All requests to `/rest` are automatically proxied to Wakanda Server on port 8081.

### Build

If you only want to build the connector, launch:

```bash
npm run build
```

Files will be generated on `dist/` directory.

### Test

Launch the Wakanda solution stored on `wakanda-solution` directory and start the server. Then launch
the Karma unit test suite, it will automatically proxy requests on REST API
to Wakanda Server (on port 8081).

```bash
npm run karma
```

## Prepare a new release

- Change version number on `package.json` and `bower.json`
- Complete `RELEASESNOTES.md` with the new version changelog
- If needed, edit template files on `publish-templates` directory

Then:

```bash
gulp publish
```

It will build the connector, clone the actual `Wakanda/angular-wakanda` repo into `publish`
directory, then copy all needed files into it.

Then, move into the repo, prepare your commit, then push (you may have to push into a fork and make a pull request).

```bash
cd publish
git status


# You might need to do somme git add

git commit -m "Bump to v1.2.3"

# You might add another remote (like a fork) with git remote add

git push [remote] master
```

## Resources

* [Home page, documentation and tutorial](https://wakanda.github.io/angular-wakanda/)
* [Publish repo](https://github.com/Wakanda/angular-wakanda)
* [Github issues](https://github.com/Wakanda/wakanda-issues/labels/Angular-Wakanda)

## License

*The MIT License*

Copyright (c) 2016 Wakanda S.A.S.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
