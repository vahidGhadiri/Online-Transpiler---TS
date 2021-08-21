import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onResolve({filter: /.*/}, async (args: any) => {
                console.log("VahidResolve", args)
                return {path: args.path, namespace: 'a'};
            });

            build.onLoad({filter: /.*/}, async (args: any) => {
                console.log("VahidOnLoad", args)
                console.log("VahidOnLoad", args)
                console.log("VahidOnLoad", args)
                console.log("VahidOnLoad", args)
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: ""
                    };
                }
            });
        },
    };
};
