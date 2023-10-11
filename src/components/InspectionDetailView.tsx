import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { InspectionDetail } from '../types/InspectionDetail';
import { Violation } from '../types/Violation';
import { Vehicle } from '../types/Vehicle';
import { formatDate } from '../utils/functions';
import NavBar from './NavBar';

export const InspectionDetailView = () => {
  const { id } = useParams();
  const [data, setData] = useState<InspectionDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadData = async () => { 
        try{
            const response = await fetch(`http://localhost:3001/inspections/${id}`)
            const data = await response.json()
            
            setData(data)
            setIsLoading(false) 
            console.log(data)

        }catch(error){
            console.error("Error loading data: ", error)
            setData(null)
            setIsLoading(false)
        }
    }
  useEffect(()=>{
    loadData();
  },[])

  const violations : Violation[] = data?.Violations 
  const vehicles : Vehicle[] = data?.Vehicles;

if(isLoading){
    return <h1>Loading...</h1>
}


  return (
        <div className='bg-slate-100'>
          <NavBar />
            <h1 className='pt-10 px-4 text-3xl font-bold '>{data.report_number}</h1>

        <div className="flex flex-wrap p-4 shadow-lg rounded-lg">
            
        <div className='w-full p-3'>
                <h1 className='text-2xl font-bold mb-4'>Inspection Overview</h1>
            </div> 

        <div className="flex-1 pr-6 space-y-6">

        
            <div className="p-3 rounded">
            
            <h2 className="text-lg">Status</h2>
            <input 
                type="text" 
                disabled 
                className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                value={data.status}
            />
        
            </div>
            
    
            <div className="p-3 rounded">
            <h2 className="text-lg">Date</h2>
            <input 
                    type="text" 
                    disabled 
                    className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                    value={formatDate(data.inspection_date)}
                />
            </div>
            

            <div className="p-3 rounded">
            <h2 className="text-lg">Level</h2>
            <input 
                    type="text" 
                    disabled 
                    className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                    value={data.level} 
                />
            </div>

        </div>


        <div className="w-1/2 space-y-6">


    <div className="p-3 rounded">
    <h2 className="text-lg">Report Number</h2>
    <input 
            type="text" 
            disabled 
            className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
            value={data.report_number}
        />
    </div>

    <div className="p-3 rounded">
    <h2 className="text-lg">Report State</h2>
    <input 
                type="text" 
                disabled 
                className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                value={data.report_state}
            />
    
    </div>



    <div className="p-3 rounded">
    <h2 className="text-lg">Hazmat Placard Required</h2>
    <input 
                type="text" 
                disabled 
                className="w-full px-4 py-2 bg-gray-200 rounded border border-gray-300 cursor-not-allowed" 
                value={data.Placarable_HM_Veh_Insp}
            />
    </div>

    </div>
    
    <div className="w-full p-6 shadow-lg border rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Vehicle Information</h2>

  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="border-b-2 py-3 text-left">Unit</th>
        <th className="border-b-2 py-3 text-left">Type</th>
        <th className="border-b-2 py-3 text-left">Plate State</th>
        <th className="border-b-2 py-3 text-left">Plate Number</th>
        <th className="border-b-2 py-3 text-left">VIN</th>
        <th className="border-b-2 py-3 text-left">Link</th>
      </tr>
    </thead>
    <tbody>
      {vehicles.map((vehicle)=> (
              <tr>
              <td className="border-b py-2">{vehicle.unit}</td>
              <td className="border-b py-2">{vehicle.unit_type}</td>
              <td className="border-b py-2">{vehicle.license_state}</td>
              <td className="border-b py-2">{vehicle.license_number}</td>
              <td className="border-b py-2">{vehicle.vehicle_id_number}</td>
              <td className="border-b py-2"><Link className="text-blue-500 hover:text-blue-700 underline" to={`/vehicles/${vehicle.id}`}>Inspect</Link></td>
            </tr>
     ))}
    </tbody>
  </table>
</div>
{violations.length > 0 && 
<div className="w-full mt-4 p-6 shadow-lg rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Violations</h2>

  <table className="w-full border-collapse">
    <thead>
      <tr>
        <th className="border-b-2 py-3 text-left">Code</th>
        <th className="border-b-2 py-3 text-left">Unit</th>
        <th className="border-b-2 py-3 text-left">OOS</th>
        <th className="border-b-2 py-3 text-left">Description</th>
        <th className="border-b-2 py-3 text-left">BASIC</th>
      </tr>
    </thead>
    <tbody>
        {violations && violations.map((violation) => (

    <tr>   
        <td className="border-b py-2">{violation.code}</td>
        <td className="border-b py-2">{violation.unit}</td>
        <td className="border-b py-2">{violation.oos}</td>
        <td className="border-b py-2">{violation.description}</td>
        <td className="border-b py-2">{violation.BASIC}</td>
    </tr>

        ))}
        
    </tbody>
  </table>
</div>
}

        
        </div>

    </div>
  );
}

export default InspectionDetailView;
