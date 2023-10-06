import { useEffect, useState } from "react"

const getBasicFromViolations = (violations) => {
    const uniqueBasic = new Set();
  
    for (const violation of violations) {
       uniqueBasic.add(violation.BASIC)
    }
  
    return Array.from(uniqueBasic).join(', ')
}

const transformDateFormat = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
  
    return formattedDate;
  };

export default function ListView(){

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 
    
    const startIndex = (currentPage - 1) * itemsPerPage // 15 - 1 
    const endIndex = currentPage * itemsPerPage  // 15 * 10: 150
    const currentPageData = data.slice(startIndex, endIndex)
    console.log(`Length ${currentPageData.length}`)
    console.log(`start ${startIndex}`)
    console.log(`end ${endIndex}`)
    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3001/inspections")
            const data = await response.json() 

            
            console.log(`Data: ${JSON.stringify(data)}`)
            setData(data)
            setIsLoading(false)
            
        } catch(error){ 
            console.error("Error loading data:", error);
            setData([])
            setIsLoading(false)
        }


    }

    useEffect(() =>{
        loadData();
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="m-5">
        <h1 className="text-xl py-5">DOT Inspections</h1>
        <div className="container bg-orange-300 rounded">
        <button className="px-6 py-4">Basic - select basic</button>
        <table className="table-fixed w-full text-sm text-left border-collapse border-spacing-2">
            <thead>
                <tr className="px-6 py-4">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Inspection Number</th>
                    <th className="px-6 py-4">Vehicle Plate</th>
                    <th className="px-6 py-4">BASIC</th>
                    <th className="px-6 py-4">Weight</th>
                    <th className="px-6 py-4">Links</th>
                </tr>
            </thead>
            <tbody className="">
                {data.map((item) =>(
                    <tr className="px-6 py-4 border-b-2" key={item.id}>
                        <td className="px-6 py-4" >{transformDateFormat(item.inspection_date)}</td>
                        <td className="px-6 py-4" >{item.status}</td>
                        <td className="px-6 py-4" >{item.report_number}</td>
                        <td className="px-6 py-4" >{item.Vehicles[0].license_number}</td>
                        <td className="px-6 py-4" >{getBasicFromViolations(item.Violations)}</td>
                        <td className="px-6 py-4" >{item.time_weight}</td>
                        <td className="px-6 py-4" >links</td>
                    </tr>
                ))}
            </tbody>
        </table>
         <div className="pagination">
            <button
            className="px-6 py-4"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
                Previous
            </button>
            <span>{currentPage}</span>
            <button
            className="px-6 py-4"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled= {endIndex >= data.length}
            >Next
            </button>
         </div>

         
        </div>
        </div>
        )
}