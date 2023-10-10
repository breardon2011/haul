import { useState, useMemo } from "react";


export const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

  
    const sortedItems = useMemo(() => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
            if (sortConfig.key === "inspection_date") {
                // If the key is "inspection_date", then parse the date strings and compare
                const dateA = new Date(a[sortConfig.key].replace("Date('", '').replace("')", ''));
                const dateB = new Date(b[sortConfig.key].replace("Date('", '').replace("')", ''));
                const diff = dateA.getTime() - dateB.getTime();  // Explicitly get time in milliseconds
                return sortConfig.direction === 'ascending' ? diff : -diff;
            } else {
                // If the key is not "inspection_date", use the original logic
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            }
        });
      }
      return sortableItems;
    }, [items, sortConfig]);
  
    const requestSort = (key) => {

        
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        } else if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'descending'
        ) {
            direction = 'ascending';
        }
        
        setSortConfig({ key, direction });
    };
  
    return { items: sortedItems, requestSort, sortConfig };
};