"use client";
import axios from "axios";

const Pagination = ({ lastDealId, setAllDeals,setLastDealId}: any) => {

  const handleNext = async () => {
    try {
      const response = await axios.post(
        `/api/hubspot/getAllDeals`,
        {
          lastDealId : lastDealId
        }
      );
      const data = response.data;
      setAllDeals(data.dealsData)
      setLastDealId(data?.link)
    } catch (error) {
      console.error("Error al manejar la paginación hacia atrás:", error);
    }
  };

  const handlePrev = async () => {
    try {
      const response = await axios.post(
        `/api/hubspot/getAllDeals`,{
           lastDealId: 0,
        }
      );

      const data = response.data;
      setAllDeals(data)
      if (data?.link !== lastDealId) {
        setAllDeals(data);
        setLastDealId(data?.link);
      }
   
    } catch (error) {
      console.error("Error al manejar la paginación hacia adelante:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        <button onClick={handlePrev}>Página Anterior</button>
        <button onClick={handleNext}>Página Siguiente</button>
      </div>
    </div>
  );
};

export default Pagination;
