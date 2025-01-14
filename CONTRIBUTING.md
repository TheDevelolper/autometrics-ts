# Contributing

## Development workflow

The project uses `yarn` as the package manager.

```shell
git clone git@github.com:autometrics-dev/autometrics-ts.git
cd autometrics-ts
yarn
```

### Overview

#### `@autometrics/autometrics`

Houses code that wraps and instruments the functions or class methods and
exposes them on an endpoint via an exporter.

#### `@autometrics/typescript-plugin`

Houses code that writes the queries in your IDE on hover. Its main function is
to intercept the `quick info` (that's the tooltip doc comments) requests from
the language server client, determine whether it should show the generated
queries for the hovered item, and, if yes, grab the identifier and insert it
into the generated query templates.

### Getting the wrapper library and plugin running

#### Wrapper library

```shell
# in project root
yarn dev:lib
```

##### TypeScript plugin

```shell
# in project root
yarn dev:plugin
```

#### Debugging TypeScript plugin

0. Run `Launch VSCode` and `Attach VSCode` in debugger

The repo includes two launch configurations, one to launch a VSCode instance for
debugging (with no extensions running to prevent conflicts), and another to
attach the "host" VSCode debugger. They are both separated as you might need to
reattach the host debugger multiple times during the workflow.

To run either of the commands simply select any of the launch configurations in
the debugger section of your main VSCode window. The "Launch VSCode" command
will prompt you to select an example project that you'd want to use for testing
(make sure your local development version TypeScript plugin is installed there).

1. Console.log

You can use `console.log` to debug like in any application. To see the logs in
VSCode run "TypeScript: Open TS Server Logs". It might prompt you to enable
logging and restart the TypeScript server.

However, with the somewhat complex AST-parsing logic of the TypeScript plugin
logs might quickly get noisy and difficult to navigate so an easier way would be
to use a debugger.

2. Using debugger

Add `debugger` in the TypeScript plugin code where you want to insert the
breakpoint.

Open the example repo in VSCode with a prepended environment variable to await
TypeScript server on breakpoint:

```shell
TSS_DEBUG_BRK=9229 code examples/express/
```

In your main editor (if VSCode) or in Chrome Debugging tools attach to the
process on port `9229`. The process will initially break on `tsserver`
initialization which you can resume until it breaks again on your breakpoint.

You can now step through the code of the TypeScript plugin and inspect the
values.

> Note: after each update of your plugin source code you will need to restart
> the TypeScript server to see the changes

Read this [blog post](https://blog.andrewbran.ch/debugging-the-type-script-codebase/) for more information on debugging TypeScript plugins

3. Use TypeScript AST viewer

If you're working with the AST in the TypeScript plugin it can be daunting to
navigate the syntax tree. [This playground](https://ts-ast-viewer.com) renders
any pasted TypeScript code in a more usable preview.

## Publishing workflow

Each packages in the monorepo are published using a separate GitHub workflow,
that triggers when a specific tag is pushed. This means that for each package
you want to publish you will need to create a separate release.

### Creating a release

1. Ensure that the version number in respective `package.json` is up to date
2. Make sure that all tests have successfully passed in the latest commit on
   `main` (the CI will run one more time before publishing it to NPM)
3. Create a release on GitHub along with a respective tag for each package:
   - `lib/` (main autometrics library) → tag: `lib-*` (e.g.: `lib-v0.7`)
   - `typescript-plugin/` → tag: `typescript-plugin-*`
   - `parcel-transformer-autometrics/` → tag: `parcel-transformer-*`
4. When the release is published, the relevant GitHub workflow will kick off.
