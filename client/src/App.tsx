import {useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import axios from 'axios'
import './App.css'
import Properties from "./components/Properties"
import Pagination from "./components/Pagination"

function App() {

    const [properties, setproperties] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [propertiesPerPage, setPropertiesPerPage] = useState(9)

    useEffect(() => {

        const fetchProperties = async () => {
            setLoading(true)
            const res = await axios.get('/api')
            setproperties(res.data)
            setLoading(false)
        }

        fetchProperties().catch(error => {
            console.log(error)
        })

    }, [])

    const [count, setCount] = useState(0)

    let indexOfLastPost = currentPage * propertiesPerPage
    let indexOfFirstPost = indexOfLastPost - propertiesPerPage
    let currentProperties = properties.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = async (pageNumber: number) => {
        await setCurrentPage(pageNumber)
        console.log("PageNumber", currentPage)
        console.log("IndexOfFirstPost", indexOfFirstPost)
        console.log("IndexOfLastPost", indexOfLastPost)
        console.log("CurrentPosts", currentProperties)
    }

    return (
        <div className="App container">
            <div className="row">
                <div className="col">
                    <a href="https://vitejs.dev" target="_blank">
                        <img src="/vite.svg" className="logo" alt="Vite logo"/>
                    </a>
                </div>
                <div className="col">
                    <a href="https://reactjs.org" target="_blank">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
            </div>
            <div className="row mb-4">
                <button className="m-auto w-auto" onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
            <div className="row">
                <Pagination propertiesPerPage={propertiesPerPage} totalProperties={properties.length}
                            currentPage={currentPage}
                            paginate={paginate}/>
            </div>
            <Properties properties={currentProperties} loading={loading}/>
            <div className="row">
                <Pagination propertiesPerPage={propertiesPerPage} totalProperties={properties.length}
                            currentPage={currentPage}
                            paginate={paginate}/>
            </div>
        </div>
    )
}

export default App