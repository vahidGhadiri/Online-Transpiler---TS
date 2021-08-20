import React, {useState, useEffect, useRef} from "react"
import * as esbuild from "esbuild-wasm"


const App: React.FC = () => {

    const [input, setInput] = useState("")
    const [code, setCode] = useState(" ")
    const esRef = useRef<any>()

    useEffect(() => {
        startService()
    }, [])

    const startService = async () => {
        esRef.current = await esbuild.startService({
            worker: true,
            wasmURL: "esbuild.wasm"
        })
    }

    const handleOnClick = async () => {
        if (!esRef.current) return

        const result = await esRef.current.transform(input, {
            loader: "jsx",
            target: "es2015"
        })
        setCode(result.code)
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
