import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const DetailView = () => {
  const { id } = useParams();



  return (
    <div>
      Detail view for inspection ID: {id}

    </div>
  );
}

export default DetailView;
