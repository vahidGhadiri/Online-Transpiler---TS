import React, {useState, useEffect, useRef} from "react"
import * as esbuild from "esbuild-wasm"
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugin";


const App: React.FC = () => {

    const [input, setInput] = useState("")
    const [code, setCode] = useState(" ")
    const ref = useRef<any>()

    useEffect(() => {
        startService()
    }, [])

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: "esbuild.wasm"
        })
    }

    const handleOnClick = async () => {
        if (!ref.current) return

        const result = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        })
        setCode(result.outputFiles[0].text)
    }

    return (
        <div>
            <textarea onChange={e => setInput(e.target.value)} value={input}/>
            <div>
                <button onClick={handleOnClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    )
}

export default App
