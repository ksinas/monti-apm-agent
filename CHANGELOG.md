# Changelog

## v2.37
August 14, 2019

* Fix many errors in IE not being recorded due to having the wrong time from ntp requests being cached
* Fix crash when event added to trace after it was processed
* Limit method and subscription start params to 2,000 characters
* Limit traces to 1,000 events. This will not affect the method or subscription metrics.
* Replace meteorhacks:kadira-profiler with montiapm:profiler in console message (@Brouilles)

## v2.36.1
June 14, 2018

* Fix the stack trace for some client errors showing as `[object Object]`

## v2.36.0
May 22, 2019

* Tracer records one level of nested events
* Custom events can be added to a trace with `Monti.startEvent` and `Monti.endEvent`. These methods are only available on the server
* Optionally record a stack trace of where event started
* Added db _nextObject event, recorded during `cursor.forEach` and `cursor.map`
* Events that were ended due to the trace ending have a `forceEnd` property
* Some events uploaded to the engine have a fourth item in their array with the data needed for the above features. This is backwards compatible with the open source Kadira, but Kadira would have to be modified to use the additional data.


## v2.35.0
March 25, 2019

* Fix pubsub and system metrics that were broken in Meteor 1.8.1
* Add `recordIPAddress` option which can be used to tell Monti APM to anonymize IP addresses or to not record them. This option has no effect on the open sourced Kadira.
* Add section to readme to document options

## v2.34.3
December 26, 2018

* Fix session count in Meteor 1.8.1

## v2.34.2
December 5, 2018

* Replace meteorhacks:meteorx with lamhieu:meteorx to add support for Meteor 1.8.1

## v2.34.1
November 16, 2018

* Fix error when initializing client
* Fix errors in zone utils

## v2.34.0
November 15, 2018

* Remove underscore from client (@sebakerckhof)
* Remove `endevent forced complete` warning

## v2.33.0
September 29, 2018

* Add `uploadSourceMaps` option. It is enabled by default in production when using a minifier that creates source maps. When enabled, source maps that Monti APM does not cached are uploaded when needed by a new client error
* Track unhandled promise rejections in the server and in browsers that support it
* Client architecture and version is sent with client errors

## v2.32.2
July 13, 2018

* Fix error stack trace from method and subscription errors showing as an object when error tracking is disabled
* Fix using environment variables that were not prefixed with `MONTI_` or `KADIRA_`. See [#5](https://github.com/monti-apm/monti-apm-agent/issues/5)
* Fix crashing app when unable to get cpu or memory usage on Windows. Instead, a message will be shown in the logs, and the memory and cpu usage will show as 0 in the Monti APM UI. See [#4](https://github.com/monti-apm/monti-apm-agent/issues/4)

## v2.32.1
June 18, 2018

* Fix error stack trace from method and subscription errors showing as an object 

## v2.32.0
May 27, 2018

* Remove jquery dependency
* Export a `Monti` object as an alias to the `Kadira` object
* A `monti` object can be used in the settings.json instead of the `kadira` object
* Environment variables can be prefixed with `MONTI_` instead of `KADIRA_`
* `Kadira` has been replaced with `Monti APM` in all console.log messages
* Fix tracking subscription message sizes on Meteor 1.5 and newer

## v2.31.1

* Show better error message when unable to connect

## v2.31.0

* Rename to montiapm:agent

### v2.30.4

* Use `Object.create(null)` rather than object initializer notation when initializing objects to store metric data.

### v2.30.3

* Ensure error strings are encapsulated in an `Error`-like object for transmission to the APM server.

### v2.30.2

* Fix [#144](https://github.com/meteorhacks/kadira/issues/144).

### v2.30.0

* Stop sending hostname to the client side. See [#245](https://github.com/meteorhacks/kadira/issues/245).

### v2.29.1

* Remove MongoDB labeling. See: [PR239](https://github.com/meteorhacks/kadira/pull/239)

### v2.29.0

* DocSzCache size is now configurable. See [PR238](https://github.com/meteorhacks/kadira/pull/238)

### v2.28.7
20-05-2016

* Use kadira-core@1.3.2

### v2.28.6
12-05-2016

* Fix an issue of potentially, killing the due to CPU labeling of the MongoDB module.

### v2.28.5
09-03-2016

* Fix coding style issues
* Track polledDocSize on polling observers as well

### v2.28.4
04-03-2016

* Fix regression of not tracking size data correctly. See: [#219](https://github.com/meteorhacks/kadira/pull/219)

### v2.28.3
04-03-2016

* Fix re-opened bug [#83](https://github.com/meteorhacks/kadira/issues/83) which tries to use update options when it's undefined or null. This came with the recent addition of size tracking.

### v2.28.2
01-03-2016

* Fix issue of not tracking null publications properly in data size tracking.

### v2.28.1

* Remove cache handlers tracking from observers. This leads to better CPU usage.

### v2.28.0

* Tracking different data size meterics (all in and out data sizes from the app). This is done is very efficient manner. So, this doesn't impact to the app's CPU usage.

### v2.27.3

* Update pidusage to v1.0.1

### v2.27.2

* Fix potential issue of not sending data to engine. Earlier we stopped sending when we see an error. Actually, we need to reschedule to send data to engine even if there is an error.

### v2.27.1

* Fix an issue on server crashing due to a bug on kadira-core. Fixed by adding kadira-core v1.3.1, which has a fix for that.

### v2.27.0

* Now, transport layer is handled by the `kadira-core` NPM module.

### v2.26.3
* Add potential fix for #200

### v2.26.2
* Add initiallyAddedDocuments to track initial adds

### v2.26.1
* Change the metrics we track for LiveQuery tracking.

### v2.26.0
* Add more metrics which tracks the Live Query usage. This will be helpful for our upcoming LiveQuery tracking feature.

### v2.25.0
* Allow to filter by method/sub name when striping trace data. See this [PR](https://github.com/meteorhacks/kadira/pull/195).

### v2.24.1
* Add better error reporting. Actually fixed this issue: https://github.com/meteorhacks/kadira/issues/193
* How we fix is little unconventional but it worked.

### v2.24.0
* Start instrumenting Kadira rightway. So, we can get the CPU profile labeling.

### v2.23.6

* Using MeteorX for the server only.

### v2.23.5

* Using the latest MeteorX version, which has some fixes for startup related issues

### v2.23.4
* Fix for a weird bug we found from the customer support. Without this fix, his app won't bind to the port.

### v2.23.3
* Fix a potential issue where the possiblity to mutate authHeaders.

### v2.23.2
* Change console.error in connect code to console.log.

### v2.23.1

* Add support for Meteor 1.2. Fixes: [#181](https://github.com/meteorhacks/kadira/issues/181). It was an issue with how we are tracking `Fiber.yield`.

### v2.23.0
* Add first steps on decoupling kadira's tracing into a seperate package.
* With this version, we allow an way to expose Kadira traces and some other metrics without connecting to Kadira.
* See example: https://gist.github.com/arunoda/8a3dec21924f08ed83b3

### v2.22.1
* Prevnt string errors crashing the app. Potential fix for: [#175](https://github.com/meteorhacks/kadira/issues/175)

### v2.22.0
* We've seen some users getting older version when installed via `meteor add meteorhacks:kadira`. We've no idea when it's happening. May be because we still support Meteor `0.9`.
* So, this version drops Meteor `0.9` support and only support Meteor `1.0` or higher.

### v2.21.0

* Fix an issue with the time-sync logic
* Do not retry if kadira engine return a status code of range 400-500 (except 401. It throws an error.)
* Add the protocol version as 1.0.0
