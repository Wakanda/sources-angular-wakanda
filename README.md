#angular-wakanda

![ angular-wakanda ](http://www.wakanda.org/sites/default/files/medias/128.png)

Welcome to the **source repository** of the **angular-wakanda connector**. You'll find here the whole environment that lets us develop the connector.

**If you only wish to retrieve the connector itself**, just get it from bower `bower install angular-wakanda` or from the publish repo [Wakanda/angular-wakanda](https://github.com/Wakanda/angular-wakanda).

Please file your issues on this repo : [Wakanda/wakanda-issues](https://github.com/Wakanda/wakanda-issues/labels/Angular-Wakanda).

##Included

* An angular application
* A wakanda solution

[Read more on wiki ...](https://github.com/Wakanda/sources-angular-wakanda/wiki/included)

##Setup

###Prerequisites

* [Wakanda Server](http://www.wakanda.org/downloads)
* [NodeJS](https://nodejs.org/download/)
* Java (only for e2e testing)
* Following global node modules :
	* bower : `npm install bower -g`
	* grunt (cli) : `npm install grunt-cli -g`
	* protractor : `npm install protractor -g` (see [protractor doc](http://angular.github.io/protractor/#/) for more install infos)

###Install

Once you've installed global dependencies (or if you already have them), execute the following steps to init your working environment (from the root of the repo) :

```shell
$ npm install
$ bower install
$ grunt initConfig
$ cd ./app/scripts/services/angular-wakanda
$ npm install
```

[Full version on wiki ...](https://github.com/Wakanda/sources-angular-wakanda/wiki/project-setup#setup)

###Run

Open two Terminal tabs :

1. Launch the Wakanda Solution with your Wakanda Server : `/Users/path/to/your/wakanda/server/Wakanda\ Enterprise\ Server.app/Contents/MacOS/Wakanda\ Enterprise\ Server WakandaBaseSolution/Contacts/Contacts\ Solution/Contacts.waSolution`
2. Launch the dev server : `grunt serve`

[Full version on wiki](https://github.com/Wakanda/sources-angular-wakanda/wiki/project-setup#run)

###Test

[Read Test section on wiki](https://github.com/Wakanda/sources-angular-wakanda/wiki/test)

##Contributing

[Read Contributing section on wiki](https://github.com/Wakanda/sources-angular-wakanda/wiki/contributing)

##FAQ

[Read FAQ section on wiki](https://github.com/Wakanda/sources-angular-wakanda/wiki/faq)

##Resources

* [Home page](http://www.wakanda.org/angular-wakanda/)
* [Bower publish repo](https://github.com/Wakanda/angular-wakanda)
* [Connector tutorial](https://wakanda.github.io/NG-Wakanda-Pack)
* [Connector Documentation](http://doc.wakanda.org/Wakanda/help/Title/en/page4419.html)
* [Yeoman generator](https://www.npmjs.org/package/generator-angular-wakanda)

## License 

*The MIT License*

Copyright (c) 2015 Wakanda S.A.S.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
