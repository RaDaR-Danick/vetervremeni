import { useRef, useEffect } from "react"

const ClickOutside = ({children, onClick}) => {
    const ref = useRef()

    const clickEvent = (e) => {
        const el = ref.current
        const withinBoundaries = e.composedPath().includes(el)
 
        if( !withinBoundaries ) {
            onClick()
        }
    }

    useEffect(() => {
        document.addEventListener( 'click', clickEvent)
        
        return () => {
            document.removeEventListener( 'click', clickEvent)
        }
    }, [])

    return (
        <div ref={ref}>{children}</div>
    )
}

export default ClickOutside