import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { VehicleDetail } from "../types/VehicleDetail";
import { ApiResponse } from "../types/ApiResponse";
import { formatDate } from "../utils/functions";
import NavBar from "./NavBar";



export const VehicleDetailView = () => { 
    const { id } = useParams(); 
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<VehicleDetail | null>(null)
    const [vinData, setVinData] = useState<ApiResponse | null>(null)

    const loadVinData = async(vin) => { 
        try{
            const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`)
            const vinData = await response.json()
            setVinData(vinData)
            setIsLoading(false)

        } catch(error){
            console.error("Error loading API: ", error)
            setVinData(null)
        }


    }

    const loadData = async() => {
        try{
            const response = await fetch(`http://localhost:3001/vehicles/${id}`)
            const data = await response.json()

            setData(data)
            console.log(data) 
            loadVinData(data.vehicle_id_number)
        }
        catch(error){
            console.error("Error loading data: ", error)
            setData(null)
            setIsLoading(false) 
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    if(isLoading){
        return <h1>Loading...</h1>
    }

    const make = vinData?.Results?.find(result => result.Variable === "Make");
    const manufacturer = vinData?.Results?.find(result => result.Variable === "Manufacturer Name");
    const modelYear = vinData?.Results?.find(result => result.Variable === "Model Year");
    
    const inspections = data?.Inspections


    return( 
        <div className='bg-slate-100'>
          <NavBar />
        <h1 className='pt-10 px-4 text-3xl font-bold '>{data.vehicle_id_number}</h1>

    <div className="flex flex-wrap p-4 shadow-lg rounded-lg">
        
    <div className='w-full p-3'>
            <h1 className='text-2xl font-bold mb-4'>Vehicle Overview</h1>
        </div> 

    <div className="flex-1 pr-6 space-y-6">

    
        <div className="p-3 rounded">
        
        <h2 className="text-lg">Unit Type</h2>
        <input 
            type="text" 
            disabled 
            className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
            value={data.unit_type}
        />
    
        </div>
        

        <div className="p-3 rounded">
        <h2 className="text-lg">License State</h2>
        <input 
                type="text" 
                disabled 
                className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                value={data.license_state}
            />
        </div>
        

        <div className="p-3 rounded">
        <h2 className="text-lg">License Number</h2>
        <input 
                type="text" 
                disabled 
                className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                value={data.license_number} 
            />
        </div>

    </div>


    <div className="w-1/2 space-y-6">


<div className="p-3 rounded">
<h2 className="text-lg">Vehicle Make</h2>
<input 
        type="text" 
        disabled 
        className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
        value={make.Value}
    />
</div>

<div className="p-3 rounded">
<h2 className="text-lg">Manufacturer</h2>
<input 
            type="text" 
            disabled 
            className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
            value={manufacturer.Value}
        />

</div>



<div className="p-3 rounded">
<h2 className="text-lg">Model Year</h2>
<input 
            type="text" 
            disabled 
            className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
            value={modelYear.Value}
        />
</div>

</div>


{data && inspections.length > 0 && 
<div className="w-full mt-4 p-6 shadow-lg rounded-lg">
<h2 className="text-2xl font-bold mb-4">Inspections</h2>

<table className="w-full border-collapse">
<thead>
  <tr>
    <th className="border-b-2 py-3 text-left">Date</th>
    <th className="border-b-2 py-3 text-left">Report State</th>
    <th className="border-b-2 py-3 text-left">Report Number</th>
    <th className="border-b-2 py-3 text-left">Hazmat Placard Required</th>
    <th className="border-b-2 py-3 text-left">Inspection Status</th>
    <th className="border-b-2 py-3 text-left">Link</th>
    
  </tr>
</thead>
<tbody>
    {inspections && inspections.map((inspection) => (

<tr>   
    <td className="border-b py-2">{formatDate(inspection.inspection_date)}</td>
    <td className="border-b py-2">{inspection.report_state}</td>
    <td className="border-b py-2">{inspection.report_number}</td>
    <td className="border-b py-2">{inspection.Placarable_HM_Veh_Insp}</td>
    <td className="border-b py-2">{inspection.status}</td>
    <td className="border-b py-2"><Link className="text-blue-500 hover:text-blue-700 underline" to={`/inspections/${inspection.id}`}>View Inspection</Link></td>
</tr>

    ))}
    
</tbody>
</table>
</div>
}

    
    </div>

</div>
    )

}