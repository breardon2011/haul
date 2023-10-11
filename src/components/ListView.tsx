import { useEffect, useState, useMemo } from "react"
import { Link } from "react-router-dom";
import { useSortableData } from "../hooks/UseSortableData";

export default function ListView(){

    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [filteredInspections, setFilteredInspections] = useState(data);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

    const startIndex = (currentPage - 1) * itemsPerPage // 15 - 1 
    const endIndex = currentPage * itemsPerPage  // 15 * 10: 150
   
    const { items, requestSort, sortConfig } = useSortableData(filteredInspections)
    const currentPageData = items.slice(startIndex, endIndex)



    const loadData = async () => {
        try {
            const response = await fetch("http://localhost:3001/inspections")
            const data = await response.json() 

            
          
            setData(data)
            setFilteredInspections(data)
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

    const allBASICValues = data.flatMap(inspection => inspection.BASIC.split(",").map(value => value.trim()))
    const uniqueBASICValues = Array.from(new Set(allBASICValues))
 
    const handleBASICChange = (event) => {
        const selectedValue = event.target.value;
        
        if (selectedValue === "all") {
            setFilteredInspections(data);
        } else {
            const filtered = data.filter(inspection => 
                inspection.BASIC.split(',').map(value => value.trim()).includes(selectedValue)
            );
            setFilteredInspections(filtered);
        }
    };
    if(isLoading){
        return <div>Loading...</div>
    }

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
          return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
      };
    

    return (
        <div className="m-5">
        <h1 className="text-xl py-5">DOT Inspections</h1>
        <div className="container bg-slate-300 rounded">
        <select onChange={handleBASICChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
    <option value="all" disabled selected>Select a BASIC value</option>
    <option value="all">All BASIC Values</option>
    {uniqueBASICValues.map(value => (
        <option key={value} value={value}>{value}</option>
    ))}
</select>
        <table className="table-fixed w-full text-sm text-left border-collapse border-spacing-2">
            <thead>
                <tr className="px-6 py-4">
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("inspection_date")} className={getClassNamesFor('inspection_date')}>Date{sortConfig && sortConfig.key === "inspection_date" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("status")} className={getClassNamesFor('status')}>Status {sortConfig && sortConfig.key === "status" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("report_number")} className={getClassNamesFor('report_number')}>Inspection Number {sortConfig && sortConfig.key === "report_number" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("license_number")} className={getClassNamesFor('license_number')}>Vehicle Plate {sortConfig && sortConfig.key === "license_number" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("BASIC")} className={getClassNamesFor('BASIC')}>BASIC {sortConfig && sortConfig.key === "BASIC" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4"><button type="button" onClick={() => requestSort("time_weight")} className={getClassNamesFor('time_weight')}>Weight {sortConfig && sortConfig.key === "time_weight" && 
            (sortConfig.direction === "ascending" 
                ? " \u2191" 
                : " \u2193")
        }</button></th>
                    <th className="px-6 py-4">Links</th>
                </tr>
            </thead>
            <tbody className="">
                {currentPageData.map((item) =>(
                    <tr className="px-6 py-4 border-b-2" key={item.id}>
                        <td className="px-6 py-4" >{item.inspection_date}</td>
                        <td className="px-6 py-4" >{item.status}</td>
                        <td className="px-6 py-4" >{item.report_number}</td>
                        <td className="px-6 py-4" >{item.license_number}</td>
                        <td className="px-6 py-4" >{item.BASIC}</td>
                        <td className="px-6 py-4" >{item.time_weight}</td>
                        <td className="px-6 py-4" ><Link className="text-blue-500 hover:text-blue-700 underline" to={`inspections/${item.id}`}>Inspect</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
         <div className="pagination p-2">
            <button
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded ml-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
                Previous
            </button>
            <span className="p-2">{currentPage}</span>
            <button
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded ml-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled= {endIndex >= data.length}
            >Next
            </button>
         </div>

         
        </div>
        </div>
        )
}