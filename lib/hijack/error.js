TrackUncaughtExceptions = function () {
  process.on('uncaughtException', function (err) {
    // skip errors with `_skipKadira` flag
    if(err._skipKadira) {
      return;
    }

    // let the server crash normally if error tracking is disabled
    if(!Kadira.options.enableErrorTracking) {
      printErrorAndKill(err);
    }

    // looking for already tracked errors and throw them immediately
    // throw error immediately if kadira is not ready
    if(err._tracked || !Kadira.connected) {
      printErrorAndKill(err);
    }

    var trace = getTrace(err, 'server-crash', 'uncaughtException');
    Kadira.models.error.trackError(err, trace);
    Kadira._sendPayload(function () {
      clearTimeout(timer);
      throwError(err);
    });

    var timer = setTimeout(function () {
      throwError(err);
    }, 1000*10);

    function throwError(err) {
      // sometimes error came back from a fiber.
      // But we don't fibers to track that error for us
      // That's why we throw the error on the nextTick
      process.nextTick(function() {
        // we need to mark this error where we really need to throw
        err._tracked = true;
        printErrorAndKill(err);
      });
    }
  });

  function printErrorAndKill(err) {
    // since we are capturing error, we are also on the error message.
    // so developers think we are also reponsible for the error.
    // But we are not. This will fix that.
    console.error(err.stack);
    process.exit(7);
  }
}

TrackUnhandledRejections = function () {
  process.on('unhandledRejection', function (reason) {
    // skip errors with `_skipKadira` flag
    if(
      reason._skipKadira ||
      !Kadira.options.enableErrorTracking
    ) {
      return;
    }

    var trace = getTrace(reason, 'server-internal', 'unhandledRejection');
    Kadira.models.error.trackError(reason, trace);
  });
}

TrackMeteorDebug = function () {
  var originalMeteorDebug = Meteor._debug;
  Meteor._debug = function (message, stack) {
    // We've changed `stack` into an object at method and sub handlers so we can
    // ignore them here. These errors are already tracked so don't track them again.
    var alreadyTracked = stack && stack.stack;

    if (alreadyTracked) {
      // Restore so origionalMeteorDebug shows the stack as a string instead as an object
      arguments[1] = stack.stack.stack;
    }

    if (
      Kadira.options.enableErrorTracking &&
      !alreadyTracked &&
      Kadira.connected
    ) {
      // only send to the server if connected to kadira
      var error = new Error(message);
      error.stack = stack;
      var trace = getTrace(error, 'server-internal', 'Meteor._debug');
      Kadira.models.error.trackError(error, trace);
    }

    return originalMeteorDebug.apply(this, arguments);
  }
}

function getTrace(err, type, subType) {
  return {
    type: type,
    subType: subType,
    name: err.message,
    errored: true,
    at: Kadira.syncedDate.getTime(),
    events: [
      ['start', 0, {}],
      ['error', 0, {error: {message: err.message, stack: err.stack}}]
    ],
    metrics: {
      total: 0
    }
  };
}
